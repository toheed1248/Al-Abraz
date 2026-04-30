import express from "express";
import { loginAdmin, createAdmin } from "../controllers/authController.js";

const router = express.Router();

router.post("/create", createAdmin);

export default router;