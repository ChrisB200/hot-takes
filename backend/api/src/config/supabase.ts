import { createClient } from "@supabase/supabase-js";
import config from "./constants";
import { Request, RequestHandler, Response } from "express";

const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY!, {
  auth: {
    flowType: "pkce",
    detectSessionInUrl: true,
    storage: {
      getItem: () => Promise.resolve(null),
      setItem: () => { },
      removeItem: () => { },
    },
  },
});

const createSupabaseSession = (req: Request, res: Response) => {
  return createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY!, {
    auth: {
      flowType: "pkce",
      detectSessionInUrl: true,
      storage: {
        getItem: (key) => req.session[key],
        setItem: (key, value) => {
          req.session[key] = value;
        },
        removeItem: (key) => {
          delete req.session[key];
        },
      },
    },
  });
};

export const supabaseDev = createClient(
  config.SUPABASE_URL,
  config.SUPABASE_SERVICE_KEY,
);

export { supabase, createSupabaseSession };
