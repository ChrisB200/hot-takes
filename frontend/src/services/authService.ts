import type { User } from "@/types/user";
import type { ServiceResult, ServiceSuccess } from "./types";
import {
  authenticatedRequest,
  completeSignupRequest,
  emailExistsRequest,
  emailLoginRequest,
  getGoogleURLRequest,
  resendCodeRequest,
  signupRequest,
  verifyCodeRequest,
} from "@/api/authRequests";

export const authenticated = async (): ServiceResult<User> => {
  const { data, ok } = await authenticatedRequest();
  if (!ok) return data;

  return data;
};

export const emailExists = async (email: string): ServiceSuccess => {
  const { data, ok } = await emailExistsRequest(email);
  if (!ok) return data;

  return "success";
};

export const signup = async (
  email: string,
  password: string,
): ServiceSuccess => {
  const { data, ok } = await signupRequest(email, password);
  if (!ok) return data;

  localStorage.setItem("verifyToken", data.verifyToken);

  return "success";
};

export const resendCode = async () => {
  const token = localStorage.getItem("verifyToken");

  if (!token) return { error: "No token in storage", code: "NO_TOKEN" };

  const { data, ok } = await resendCodeRequest(token);
  if (!ok) return data;

  return "success";
};

export const verifyCode = async (code: string) => {
  const token = localStorage.getItem("verifyToken");

  if (!token) return { error: "No token in storage", code: "NO_TOKEN" };

  const { data, ok } = await verifyCodeRequest(code, token);
  if (!ok) return data;

  return "success";
};

export const emailLogin = async (email: string, password: string) => {
  const { data, ok } = await emailLoginRequest(email, password);
  if (!ok) return data;

  return "success";
};

export const initiateGoogleOAuth = async () => {
  const { data, ok } = await getGoogleURLRequest();
  if (!ok) return data;

  window.open(data.url, "_self");
};

export const completeSignup = async (username: string, nickname: string) => {
  const { data, ok } = await completeSignupRequest(username, nickname);
  if (!ok) return data;

  return "success";
};
