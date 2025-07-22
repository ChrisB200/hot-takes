import type { ApiResponse, DefaultPromise, ResponsePromise } from "@/types/api";
import type { User } from "@/types/user";
import request from "./lib/request";
import type { GoogleURLResponse, SignupResponse } from "./types";

export const authenticatedRequest = async (): Promise<ApiResponse<User>> => {
  return await request<User>("get", "auth/authenticated");
};

export const emailExistsRequest = async (email: string) => {
  return await request<DefaultPromise>("get", "auth/email/exists", { email });
};

export const signupRequest = async (email: string, password: string) => {
  return await request<SignupResponse>("post", "auth/signup", {
    email,
    password,
  });
};

export const verifyCodeRequest = async (code: string, token: string) => {
  return await request<DefaultPromise>(
    "post",
    "auth/code/verify",
    { code },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const resendCodeRequest = async (token: string) => {
  return await request<DefaultPromise>("post", "auth/code/resend", "", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const emailLoginRequest = async (email: string, password: string) => {
  return await request<DefaultPromise>("post", "auth/login", {
    email,
    password,
  });
};

export const getGoogleURLRequest = async () => {
  return await request<GoogleURLResponse>("get", "auth/google/url");
};

export const completeSignupRequest = async (
  username: string,
  nickname: string,
) => {
  return await request<DefaultPromise>("post", "auth/signup/complete", {
    username,
    nickname,
  });
};
