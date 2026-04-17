import express from "express";
import { create_user, getCurrentUser, login } from "../controllers/AuthController.js";
import { verifyUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", create_user);
router.post("/login", login);
router.get("/me",verifyUser, getCurrentUser);

export default router;