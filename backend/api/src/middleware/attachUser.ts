import { RequestHandler } from "express";
import { validateToken } from "../utils/jwt";
import AppError from "../utils/AppError";
import { db } from "../config/database";
import { SupabaseJWT } from "../types/supabase";
import { supabase } from "../config/supabase";

const attachUser: RequestHandler = async (req, res, next) => {
  let accessToken = req.session.accessToken;
  let refreshToken = req.session.refreshToken;

  if (!accessToken) {
    if (!refreshToken) return next();

    const { data, error } = await supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (error) {
      console.error(error);
      return next();
    }

    if (!data || !data.session) return next();

    req.session.accessToken = data.session.access_token;
    req.session.accessToken = data.session.refresh_token;

    accessToken = req.session.accessToken;
    refreshToken = req.session.refreshToken;
  }

  const data = validateToken<SupabaseJWT>(accessToken);

  if (!data) {
    req.session.user = undefined;
    return next();
  }

  const user = await db
    .selectFrom("users")
    .selectAll()
    .where("auth_user_id", "=", data.sub)
    .executeTakeFirst();

  if (user) {
    req.session.user = user;
  } else {
    req.session.user = undefined;
  }

  return next();
};

export default attachUser;
