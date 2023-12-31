import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updatedRoom,
  updatedRoomAvailability,
} from "../controllers/room.js";
const router = express.Router();
//create
router.post("/:hotelid", verifyAdmin, createRoom);
//update
router.put("/:id", verifyAdmin, updatedRoom);
router.put("availability/:id", updatedRoomAvailability);
//delete
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
//get
router.get("/:id", getRoom);
//getall
router.get("/", getRooms);
export default router;
