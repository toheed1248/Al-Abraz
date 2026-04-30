import express from "express";
import { loginAdmin, createAdmin } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginAdmin);   // 🔥 MUST
router.post("/create", createAdmin); // (temporary)

export default router;