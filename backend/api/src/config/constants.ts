// config.ts
import dotenv from "dotenv";
dotenv.config();

function getEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable "${key}" is not defined`);
  }
  return value;
}

const config = {
  PORT: Number(process.env.PORT) || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DB_HOST: getEnvVar("DB_HOST"),
  DB_PASSWORD: getEnvVar("DB_PASSWORD"),
  DB_NAME: getEnvVar("DB_NAME"),
  DB_USERNAME: getEnvVar("DB_USERNAME"),
  DB_PORT: Number(getEnvVar("DB_PORT")),
  SUPABASE_URL: getEnvVar("SUPABASE_URL"),
  SUPABASE_ANON_KEY: getEnvVar("SUPABASE_ANON_KEY"),
  SUPABASE_SERVICE_KEY: getEnvVar("SUPABASE_SERVICE_KEY"),
  SECRET_KEY: getEnvVar("SECRET_KEY"),
  SESSION_SECRET: getEnvVar("SESSION_SECRET"),
  JWT_SECRET_KEY: getEnvVar("JWT_SECRET_KEY"),
  FRONTEND_URL: getEnvVar("FRONTEND_URL"),
};

export default config;
