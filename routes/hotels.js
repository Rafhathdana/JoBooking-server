import express from "express";
import Hotel from "../models/Hotel";
const router = express.Router();
//create
router.post(" ", async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200)
  } catch (err) { 
    res.status(500).json(err);
  }
});
//update
//delete
//get
//getall
module.exports = router;
