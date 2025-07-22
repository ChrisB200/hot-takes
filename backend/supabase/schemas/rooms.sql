CREATE TABLE "rooms" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic TEXT NOT NULL,
  active BOOLEAN NOT NULL,
  user_id UUID NOT NULL,

  FOREIGN KEY ("user_id") REFERENCES public.users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)
