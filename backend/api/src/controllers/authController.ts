import { RequestHandler } from "express";
import { supabase, createSupabaseSession } from "../config/supabase";
import AppError from "../utils/AppError";
import config from "../config/constants";
import { db } from "../config/database";
import {
  generateToken,
  getAuthorizationToken,
  validateToken,
} from "../utils/jwt";
import { User } from "@supabase/supabase-js";

const emailSignup: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("Missing fields", 400, "MISSING_FIELDS");
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error && error.message === "User already registered") {
    throw new AppError(error.message, 409, "USER_EXISTS");
  } else if (error) {
    throw new AppError(error.message, 500, "SUPABASE_ERROR");
  }

  if (!data?.user?.id) {
    throw new AppError("Error signing up", 500, "SUPABASE_ERROR");
  }

  const result = await db
    .insertInto("users")
    .values({ auth_user_id: data.user.id })
    .returning("id")
    .executeTakeFirst();

  if (!result) throw new AppError("Error signing up", 500, "SUPABASE_ERROR");

  const verifyToken = generateToken({ email: data.user.email, id: result.id });

  res.status(200).json({ verifyToken });
};

const completeSignup: RequestHandler = async (req, res) => {
  const { username, nickname } = req.body;

  if (!req.session?.user)
    throw new AppError("Unauthorised access", 401, "UNAUTHORISED");

  if (!username || !nickname)
    throw new AppError("Missing fields", 400, "MISSING_FIELDS");

  const user = await db
    .selectFrom("users")
    .where("username", "=", username)
    .executeTakeFirst();

  if (user)
    throw new AppError("Username is already in use", 409, "USERNAME_EXISTS");

  await db
    .updateTable("users")
    .set({ username, nickname })
    .where("id", "=", req.session.user.id)
    .executeTakeFirst();

  res.status(200).json({ message: "success" });
};

const verifyCode: RequestHandler = async (req, res) => {
  const { code } = req.body;

  if (!code) throw new AppError("No code was provided", 400, "INVALID_CODE");

  if (code.length !== 6)
    throw new AppError("Code must be 6 characters", 400, "INVALID_CODE");

  const token = getAuthorizationToken(req);
  if (!token) throw new AppError("No token was provided", 401, "TOKEN_INVALID");

  const userData = validateToken<{ email: string; id: string }>(token);
  if (!userData || typeof userData === "string")
    throw new AppError("invalid verify token", 401, "TOKEN_INVALID");

  const { data, error } = await supabase.auth.verifyOtp({
    token: String(code),
    type: "email",
    email: userData.email,
  });

  if (error || !data || !data?.session)
    throw new AppError("An error has occured", 500, "SUPABASE_ERROR");

  const accessToken = data.session.access_token;
  const refreshToken = data.session.refresh_token;

  req.session.accessToken = accessToken;
  req.session.refreshToken = refreshToken;

  res.status(200).json({ message: "success" });
};

const resendCode: RequestHandler = async (req, res) => {
  const token = getAuthorizationToken(req);

  if (!token) throw new AppError("No token provided", 401, "TOKEN_INVALID");

  const data = validateToken<{ email: string; id: string }>(token);

  if (!data?.email) throw new AppError("Token invalid", 401, "TOKEN_INVALID");

  const { error } = await supabase.auth.resend({
    type: "signup",
    email: data.email,
  });

  if (error) throw new AppError(error.message, error.status, "SUPABASE_ERROR");

  res.status(200).json({ message: "success" });
};

const emailLogin: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new AppError("Invalid fields", 400, "INVALID_FIELDS");

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new AppError(error.message, error.status, "SUPABASE_ERROR");

  req.session.accessToken = data.session.access_token;
  req.session.refreshToken = data.session.refresh_token;

  res.status(200).json({ message: "success" });
};

const isAuthenticated: RequestHandler = async (req, res) => {
  res.status(200).json(req.session.user);
};

const emailExists: RequestHandler = async (req, res) => {
  const { email } = req.body;

  const user = await db
    .selectFrom("auth.users")
    .where("email", "=", email)
    .executeTakeFirst();

  if (user) throw new AppError("could not sign in", 400, "ERROR");

  res.status(200).json({ message: "success" });
};

const getGoogleURL: RequestHandler = async (req, res) => {
  const s = createSupabaseSession(req, res);
  const { data, error } = await s.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:8000/auth/callback",
    },
  });

  if (error) throw new AppError(error.message, error.status, error.code);
  console.log(data);

  res.status(200).json({ url: data.url });
};

const oauthCallback: RequestHandler = async (req, res) => {
  const s = createSupabaseSession(req, res);

  const code = req.query.code as string;
  if (!code)
    return res.redirect("http://localhost:5173/login?error=SERVER_ERROR");

  const { data, error } = await s.auth.exchangeCodeForSession(code);
  if (error)
    return res.redirect("http://localhost:5173/login?error=SERVER_ERROR");

  req.session.accessToken = data.session.access_token;
  req.session.refreshToken = data.session.refresh_token;

  const user = await db
    .selectFrom("users")
    .selectAll()
    .where("auth_user_id", "=", data.user.id)
    .executeTakeFirst();

  if (!user) {
    const response = await db
      .insertInto("users")
      .values({ auth_user_id: data.user.id })
      .returningAll()
      .executeTakeFirst();

    if (!response)
      return res.redirect("http://localhost:5173/login?error=SERVER_ERROR");

    req.session.user = response;
    res.redirect("http://localhost:5173/complete-signup");
  }

  req.session.user = user;
  res.redirect("http://localhost:5173/");
};

export {
  emailSignup,
  verifyCode,
  resendCode,
  emailLogin,
  isAuthenticated,
  emailExists,
  completeSignup,
  getGoogleURL,
  oauthCallback,
};
