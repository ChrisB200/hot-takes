import { RequestHandler } from "express";
import { db } from "../config/database";
import { User } from "@supabase/supabase-js";
import AppError from "../utils/AppError";

const createRoom: RequestHandler = async (req, res) => {
  const { topic } = req.body;
  const user = req.session.user!;

  if (!topic)
    throw new AppError("A topic needs to be provided", 400, "INVALID_FIELDS");

  const room = await db
    .insertInto("rooms")
    .values({ topic, active: true, user_id: user.id })
    .returningAll()
    .executeTakeFirst();

  if (!room)
    throw new AppError("Room could not be created", 400, "CREATION_FAILED");

  res.status(200).json(room);
};

const joinRoom: RequestHandler = async (req, res) => {
  const { room_id } = req.params;
  const { role } = req.body;
  const user = req.session.user!;

  if (!room_id)
    throw new AppError("A room_id needs to be provided", 400, "INVALID_FIELDS");

  if (!role)
    throw new AppError("A role needs to be provided", 400, "INVALID_FIELDS");

  const room = await db
    .selectFrom("rooms")
    .selectAll()
    .where("rooms.id", "=", room_id)
    .executeTakeFirst();

  if (!room) throw new AppError(`Room does not exist`, 400, "INVALID_FIELDS");

  const isInRoom = await db
    .selectFrom("room_users")
    .selectAll()
    .where("user_id", "=", user.id)
    .executeTakeFirst();

  if (isInRoom) throw new AppError("Already in room", 409, "ALREADY_JOINED");

  const response = await db
    .insertInto("room_users")
    .values({ room_id: room.id, user_id: user.id, role })
    .returningAll()
    .executeTakeFirst();

  if (!response) throw new AppError("An error occured", 500, "INTERNAL_SERVER");

  res.status(200).json(response);
};

export { createRoom, joinRoom };
