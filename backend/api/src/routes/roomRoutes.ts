import { Router } from "express";
import protectedRoute from "../middleware/protectedRoute";
import { createRoom, joinRoom } from "../controllers/roomController";

const router = Router();

router.post("/", protectedRoute, createRoom);
router.post("/join/:room_id", protectedRoute, joinRoom);

export default router;
