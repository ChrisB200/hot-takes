CREATE TABLE "room_users" (
  room_id UUID NOT NULL,
  user_id UUID NOT NULL,
  role role NOT NULL,

  PRIMARY KEY (room_id, user_id),

  FOREIGN KEY ("room_id") REFERENCES public.rooms(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY ("user_id") REFERENCES public.users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)
