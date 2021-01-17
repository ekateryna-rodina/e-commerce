import express from "express";
import {
  authUser,
  getUserProfile,
  register,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc Auth user
// @route POST/api/users/login
// @access Public
router.post("/login", authUser);

// @desc Gets user profile
// @route POST/api/users/profile
// @access Private
router.route("/profile").get(protect, getUserProfile);

// @desc Register
// @route POST/api/users/register
// @access Public
router.post("/register", register);

export default router;
