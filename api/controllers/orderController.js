import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc Create an order object
// @route POST/api/orders
// @access Private
const createOrder = asyncHandler(async (req, res) => {
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    total,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("Order is empty");
  }

  const order = new Order({
    user: req.user._id,
    orderItems: orderItems,
    shippingAddress: shippingAddress,
    paymentMethod: paymentMethod,
    itemsPrice: itemsPrice,
    taxPrice: taxPrice,
    shippingPrice: shippingPrice,
    totalPrice: total,
  });

  const newOrder = await order.save();
  res.status(201).json(newOrder);
});

// @desc Get order by id
// @route GET/api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw Error("Order not found");
  }
});

// @desc Update order
// @route PUT/api/orders/:id/pay
// @access Private
const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const payedOrder = await order.save();
    res.status(200).json(payedOrder);
  } else {
    res.status(404);
    throw Error("Order not found");
  }
});

// @desc Get orders
// @route GET/api/orders/
// @access Private
const getOrders = asyncHandler(async (req, res) => {});

export { createOrder, getOrderById, getOrders, updateOrder };
