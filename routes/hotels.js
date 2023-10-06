import express from "express";
import {
  countByCity,
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updatedHotel,
} from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();
//create
router.post("/", verifyAdmin, createHotel);
//update
router.put("/:id", verifyAdmin, updatedHotel);
//delete
router.delete("/find/:id", verifyAdmin, deleteHotel);
//get
router.get("/:id", getHotel);
//getall
router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", getHotels);
export default router;
