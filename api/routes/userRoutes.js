import express from "express";
import {
  authUser,
  getUserProfile,
  register,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc Get user
// @route GET/api/users/login
// @access Public
router.get("/login", authUser);

// @desc Auth user
// @route POST/api/users/login
// @access Public
router.post("/login", authUser);

// @desc Gets user profile
// @route POST/api/users/profile
// @access Private
router.route("/profile").get(protect, getUserProfile);

// @desc Updates user profile
// @route PUT/api/users/profile
// @access Private
router.route("/profile").put(protect, updateUserProfile);

// @desc Register
// @route POST/api/users/register
// @access Public
router.post("/register", register);

export default router;
