const crypto = require("crypto");
const Razorpay = require("razorpay");
const Payment = require("../models/PaymentModel");
const Booking = require("../models/Booking");
const { sendMail, formatBookingHtml } = require("../utils/mailer");

function getRazorpayInstance() {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay keys are not configured in environment");
  }
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

// POST /api/payment/create-order
// body: { bookingId } OR { quote }
const createOrder = async (req, res) => {
  try {
    const { bookingId, quote } = req.body;
    let booking = null;
    let amountPaise = null;
    let notes = {};

    if (bookingId) {
      booking = await Booking.findById(bookingId);
      if (!booking) {
        return res
          .status(404)
          .json({ success: false, message: "Booking not found" });
      }
      if (booking.paymentStatus === "paid") {
        return res
          .status(400)
          .json({ success: false, message: "Booking already paid" });
      }
      amountPaise = Math.round(Number(booking.totalAmount) * 100);
      notes = {
        bookingId: booking._id.toString(),
        userEmail: booking.userEmail,
      };
    } else if (quote) {
      let computed = quote.totalAmount;
      if (
        (computed === undefined || computed === null) &&
        quote.checkInDate &&
        quote.checkOutDate &&
        Array.isArray(quote.bookingInfo)
      ) {
        const ci = new Date(quote.checkInDate);
        const co = new Date(quote.checkOutDate);
        const diffMs = Math.abs(co - ci);
        const nights = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
        computed = quote.bookingInfo.reduce((sum, info) => {
          return sum + Number(info.roomAmount || 0) * nights;
        }, 0);
      }
      amountPaise = Math.round(Number(computed) * 100);
      notes = { quote: "true", userEmail: quote.userEmail || quote.email };
    } else {
      return res
        .status(400)
        .json({ success: false, message: "bookingId or quote is required" });
    }

    if (!Number.isFinite(amountPaise) || amountPaise <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid booking amount" });
    }

    const razorpay = getRazorpayInstance();
    const options = {
      amount: amountPaise,
      currency: "INR",
      receipt: `rcpt_${
        booking
          ? booking._id.toString()
          : Math.random().toString(36).substr(2, 8)
      }`,
      notes,
    };
    const order = await razorpay.orders.create(options);

    const payment = await Payment.create({
      bookingId: booking ? booking._id : null,
      userId: booking ? booking.userId || null : null,
      amount: amountPaise,
      currency: order.currency,
      razorpayOrderId: order.id,
      status: "created",
      notes: options.notes,
      quote: quote || {},
    });

    if (booking) {
      await Booking.findByIdAndUpdate(booking._id, {
        paymentStatus: "pending",
      });
    }

    return res.status(201).json({
      success: true,
      data: {
        order,
        payment,
        keyId: process.env.RAZORPAY_KEY_ID,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/payment/verify
// body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    if (!process.env.RAZORPAY_KEY_SECRET) {
      console.error("Razorpay secret missing in env");
      return res.status(500).json({
        success: false,
        message: "Payment configuration error. Contact support.",
      });
    }
    if (process.env.NODE_ENV !== "production") {
      console.log("[VERIFY] body:", {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature_present: Boolean(razorpay_signature),
      });
    }
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing payment verification fields",
      });
    }

    let payment = null;
    try {
      payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id });
      if (process.env.NODE_ENV !== "production") {
        console.log("[VERIFY] paymentLookup:", {
          found: Boolean(payment),
          paymentId: payment?._id,
          bookingId: payment?.bookingId,
          status: payment?.status,
        });
      }
    } catch (e) {
      console.error("[VERIFY] Payment lookup error:", e.message);
      return res.status(500).json({
        success: false,
        message: "Payment lookup failed",
        debug:
          process.env.NODE_ENV !== "production" ? { error: e.message } : undefined,
      });
    }
    if (!payment) {
      return res
        .status(404)
        .json({ success: false, message: "Payment not found" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    let expectedSignature = "";
    try {
      expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");
    } catch (e) {
      console.error("[VERIFY] HMAC compute error:", e.message);
      return res.status(500).json({
        success: false,
        message: "Signature computation failed",
        debug:
          process.env.NODE_ENV !== "production"
            ? { error: e.message, body }
            : undefined,
      });
    }

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      console.warn("[VERIFY] Signature mismatch", {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        expectedSignature: process.env.NODE_ENV !== "production" ? expectedSignature : undefined,
        providedSignature: process.env.NODE_ENV !== "production" ? razorpay_signature : undefined,
        secretPreview:
          process.env.NODE_ENV !== "production"
            ? String(process.env.RAZORPAY_KEY_SECRET).slice(0, 8) + "***"
            : undefined,
      });
      await Payment.findByIdAndUpdate(payment._id, {
        status: "failed",
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      });
      if (payment.bookingId) {
        await Booking.findByIdAndUpdate(payment.bookingId, {
          paymentStatus: "failed",
        });
      }
      return res.status(400).json({
        success: false,
        message: "Invalid signature",
        debug:
          process.env.NODE_ENV !== "production"
            ? {
                orderId: razorpay_order_id,
                paymentId: razorpay_payment_id,
                expectedSignature,
                providedSignature: razorpay_signature,
              }
            : undefined,
      });
    }

    let updatedPayment = await Payment.findByIdAndUpdate(
      payment._id,
      {
        status: "paid",
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },
      { new: true }
    );
    let updatedBooking = null;
    if (payment.bookingId) {
      updatedBooking = await Booking.findByIdAndUpdate(
        payment.bookingId,
        {
          paymentStatus: "paid",
          paymentId: razorpay_payment_id,
        },
        { new: true }
      )
        .populate("userId")
        .populate("bookingInfo.roomId");
    } else {
      // Create booking from quote
      const q = payment.quote || {};
      if (
        !q ||
        !q.userEmail ||
        !q.checkInDate ||
        !q.checkOutDate ||
        !Array.isArray(q.bookingInfo)
      ) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid quote to create booking" });
      }
      const payload = { ...q };
      // Map frontend fields to schema requirements
      if (!payload.userPhone && payload.phone) payload.userPhone = payload.phone;
      if (!payload.userEmail && payload.email) payload.userEmail = payload.email;
      payload.paymentStatus = "paid";
      payload.paymentId = razorpay_payment_id;
      try {
        const created = await new Booking(payload).save();
        updatedBooking = await Booking.findById(created._id)
          .populate("userId")
          .populate("bookingInfo.roomId");
        // Link payment to booking
        updatedPayment = await Payment.findByIdAndUpdate(
          payment._id,
          { bookingId: created._id },
          { new: true }
        );
      } catch (e) {
        console.error("[VERIFY] Create booking from quote failed:", e.message);
        return res.status(500).json({
          success: false,
          message: "Failed to create booking from quote",
          debug:
            process.env.NODE_ENV !== "production"
              ? { error: e.message, payloadKeys: Object.keys(payload || {}) }
              : undefined,
        });
      }
    }

    // Send payment success emails (best-effort)
    try {
      if (updatedBooking) {
        const adminEmail = process.env.ADMIN_EMAIL;
        const html = formatBookingHtml(updatedBooking, "Payment Successful");
        const subjUser = `Payment received for booking ${
          updatedBooking.bookCode || updatedBooking._id
        }`;
        const subjAdmin = `Payment received - ${
          updatedBooking.bookCode || updatedBooking._id
        }`;
        if (updatedBooking.userEmail) {
          await sendMail({
            to: updatedBooking.userEmail,
            subject: subjUser,
            html,
          });
        }
        if (adminEmail) {
          await sendMail({ to: adminEmail, subject: subjAdmin, html });
        }
      }
    } catch (e) {
      console.warn("Email send (verifyPayment) failed:", e.message);
    }

    return res.status(200).json({
      success: true,
      message: "Payment verified",
      data: {
        booking: updatedBooking,
        payment: updatedPayment,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/payment/cod
// Handle Cash on Delivery payments
const handleCODPayment = async (req, res) => {
  try {
    const { bookingId, paymentMethod, paymentStatus } = req.body;

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "Booking ID is required for COD payment",
      });
    }

    // Find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Update booking with COD payment status
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        paymentStatus: "pending",
        paymentMethod: "cod",
      },
      { new: true }
    )
      .populate("userId")
      .populate("bookingInfo.roomId");

    // Create a payment record for COD
    const payment = await Payment.create({
      bookingId: booking._id,
      userId: booking.userId || null,
      amount: Math.round(Number(booking.totalAmount) * 100), // Convert to paise
      currency: "INR",
      status: "pending",
      paymentMethod: "cod",
      notes: {
        bookingId: booking._id.toString(),
        userEmail: booking.userEmail,
        paymentMethod: "cod",
      },
    });

    // Send COD confirmation emails (best-effort)
    try {
      const adminEmail = process.env.ADMIN_EMAIL;
      const html = formatBookingHtml(updatedBooking, "COD Booking Confirmed");
      const subjUser = `COD booking confirmed ${
        updatedBooking.bookCode || updatedBooking._id
      }`;
      const subjAdmin = `COD booking created - ${
        updatedBooking.bookCode || updatedBooking._id
      }`;
      if (updatedBooking.userEmail) {
        await sendMail({
          to: updatedBooking.userEmail,
          subject: subjUser,
          html,
        });
      }
      if (adminEmail) {
        await sendMail({ to: adminEmail, subject: subjAdmin, html });
      }
    } catch (e) {
      console.warn("Email send (handleCODPayment) failed:", e.message);
    }

    return res.status(200).json({
      success: true,
      message: "COD booking confirmed successfully",
      data: {
        booking: updatedBooking,
        payment: payment,
        bookingId: updatedBooking._id,
      },
    });
  } catch (error) {
    console.error("COD Payment Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to process COD payment",
    });
  }
};

module.exports = { createOrder, verifyPayment, handleCODPayment };
