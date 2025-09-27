const nodemailer = require("nodemailer");

let cachedTransporter = null;

function getTransporter() {
  if (cachedTransporter) return cachedTransporter;

  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = port === 465; // true for 465, false for other ports
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    console.warn("SMTP credentials not configured. Emails will be skipped.");
    return null;
  }

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  return cachedTransporter;
}

async function sendMail({ to, subject, text, html }) {
  const transporter = getTransporter();
  if (!transporter) {
    return { skipped: true };
  }

  const from = process.env.FROM_EMAIL || process.env.SMTP_USER;

  const info = await transporter.sendMail({ from, to, subject, text, html });
  return info;
}

function formatBookingHtml(booking, title = "Booking Confirmation") {
  const ci = booking.checkInDate
    ? new Date(booking.checkInDate).toDateString()
    : "";
  const co = booking.checkOutDate
    ? new Date(booking.checkOutDate).toDateString()
    : "";
  const lines = (booking.bookingInfo || []).map((bi, idx) => {
    const paxNames = (bi.pax || []).map((p) => p.name).join(", ");
    return `<li>
      <strong>Room ${idx + 1}</strong>: ${bi.roomType} — ₹${bi.roomAmount}
      ${paxNames ? `<div>Pax: ${paxNames}</div>` : ""}
    </li>`;
  });

  return `
  <div style="font-family:Arial,Helvetica,sans-serif; line-height:1.6"> 
    <h2>${title}</h2>
    <p>Thank you for your booking${
      booking.userEmail ? `, ${booking.userEmail}` : ""
    }.</p>
    <p>
      <strong>Booking Code:</strong> ${booking.bookCode || booking._id}<br/>
      <strong>Status:</strong> ${booking.paymentStatus}<br/>
      <strong>Amount:</strong> ₹${booking.totalAmount}
    </p>
    <p>
      <strong>Check-in:</strong> ${ci}<br/>
      <strong>Check-out:</strong> ${co}
    </p>
    <ul>${lines.join("")}</ul>
    <p>If you have any questions, reply to this email.</p>
  </div>
  `;
}

module.exports = { sendMail, formatBookingHtml };
