import { RedisStore } from "connect-redis";
import config from "./constants";
import session from "express-session";
import { redisClient } from "./redis";

function initSession() {
  const client = redisClient;
  const redisStore = new RedisStore({ client });

  return session({
    store: redisStore,
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  });
}

export default initSession;
