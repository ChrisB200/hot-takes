CREATE TABLE "users" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nickname TEXT,
  username TEXT UNIQUE,
  auth_user_id UUID NOT NULL,

  FOREIGN KEY ("auth_user_id") REFERENCES auth.users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)
