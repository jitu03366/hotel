import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams, Link } from "react-router-dom";
import axios from "../../axios";

const BookingDetails = () => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const [booking, setBooking] = useState(location.state?.booking || null);
  const bookingId = location.state?.bookingId || params.id || null;

  useEffect(() => {
    async function fetchBooking() {
      if (!booking && bookingId) {
        try {
          const { data } = await axios.get(`/api/booking/${bookingId}`);
          if (data?.success) {
            setBooking(data.reservation || data.data || null);
          }
        } catch (e) {
          // ignore
        }
      }
    }
    fetchBooking();
  }, [booking, bookingId]);

  if (!booking && !bookingId) {
    return (
      <div className="container mt-5 mb-5">
        <h4 className="text-center">No booking selected</h4>
        <div className="text-center mt-3">
          <Link to="/">Go Home</Link>
        </div>
      </div>
    );
  }

  const checkIn = booking?.checkInDate
    ? new Date(booking.checkInDate).toDateString()
    : "";
  const checkOut = booking?.checkOutDate
    ? new Date(booking.checkOutDate).toDateString()
    : "";

  return (
    <div className="container mt-5 mb-5">
      <h3 className="text-center">Booking Details</h3>
      {booking ? (
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">
              Booking #{booking.bookCode || booking._id}
            </h5>
            <p className="card-text mb-1">
              <strong>Status:</strong> {booking.paymentStatus}
            </p>
            <p className="card-text mb-1">
              <strong>Amount:</strong> ₹{booking.totalAmount}
            </p>
            <p className="card-text mb-1">
              <strong>Email:</strong> {booking.userEmail}
            </p>
            <p className="card-text mb-1">
              <strong>Check-in:</strong> {checkIn}
            </p>
            <p className="card-text mb-1">
              <strong>Check-out:</strong> {checkOut}
            </p>
            <div className="mt-3">
              <h6>Rooms</h6>
              <ul>
                {(booking.bookingInfo || []).map((bi, idx) => (
                  <li key={idx}>
                    {bi.roomType} — ₹{bi.roomAmount}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-3 d-flex">
              <button className="btn btn-primary mr-2" onClick={() => window.print()}>
                Print
              </button>
              <Link className="btn btn-outline-primary" to="/">
                Go Home
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-4">Loading...</div>
      )}
    </div>
  );
};

export default BookingDetails;


