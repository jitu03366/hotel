const express = require("express");
const router = express.Router();

const {
  createOrder,
  verifyPayment,
  handleCODPayment,
} = require("../controllers/PaymentController");

// Create Razorpay order for a booking
router.post("/create-order", createOrder);

// Verify Razorpay payment signature and mark booking paid
router.post("/verify", verifyPayment);

// Handle Cash on Delivery payments
router.post("/cod", handleCODPayment);

module.exports = router;
