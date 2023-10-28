import express from "express";
import { handleLogout, login, register } from "../controllers/auth.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/logout", handleLogout);
export default router;
