import express from "express";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";
import { createHotel } from "../controllers/hotel.js";
const router = express.Router();
//create
router.post("/", createHotel);
//update
router.put("/:id", async (req, res) => {
catch (err) {
    res.status(500).json(err);
  }
});
//delete
router.delete("/:id", async (req, res) => {
   catch (err) {
    res.status(500).json(err);
  }
});
//get
router.get("/:id", async (req, res) => {
  catch (err) {
    res.status(500).json(err);
  }
});
//getall
router.get("/", async (req, res, next) => {
  catch (err) {
    next(err);
  }
});
export default router;
