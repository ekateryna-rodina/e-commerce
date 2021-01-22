import express from "express";
import {
  createOrder,
  getOrderById,
  updateOrder,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc Create an order object
// @route POST/api/orders
// @access Private
router.route("/").post(protect, createOrder);

// @desc Get order by id
// @route GET/api/orders/:id
// @access Private
router.route("/:id").get(protect, getOrderById);

// @desc Update order to payed (paypal)
// @route PUTH/api/orders/:id
// @access Private
router.route("/:id/pay").put(protect, updateOrder);

export default router;
