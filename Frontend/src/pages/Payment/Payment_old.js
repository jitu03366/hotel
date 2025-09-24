import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "../../axios";
import "./Payment.css";

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-sdk")) return resolve(true);
    const script = document.createElement("script");
    script.id = "razorpay-sdk";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const Payment = () => {
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [bookingData, setBookingData] = useState(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const bookingId =
    (location.state && location.state.bookingId) ||
    (() => {
      try {
        return localStorage.getItem("pendingBookingId");
      } catch {
        return null;
      }
    })();
  const quote =
    (location.state && location.state.quote) ||
    (() => {
      try {
        const raw = localStorage.getItem("pendingQuote");
        return raw ? JSON.parse(raw) : null;
      } catch {
        return null;
      }
    })();

  useEffect(() => {
    async function initializePayment() {
      try {
        if (!bookingId && !quote) {
          setError("No booking information found. Please start a new booking.");
          return;
        }

        // Fetch booking details if we have a bookingId
        if (bookingId) {
          setLoading(true);
          setStatus("Fetching booking details...");
          
          try {
            const response = await axios.get(`/api/booking/${bookingId}`);
            if (response.data && response.data.success) {
              setBookingData(response.data.data);
            }
          } catch (e) {
            console.warn("Could not fetch booking details:", e.message);
          }
        }

        setLoading(false);
        setShowPaymentOptions(true);
      } catch (e) {
        setError(e.message || "Failed to initialize payment");
        setLoading(false);
      }
    }

    initializePayment();
  }, [bookingId, quote]);

  const handlePaymentMethod = async (method) => {
    if (paymentProcessing) return;
    
    setSelectedPaymentMethod(method);
    setError(null);
    setLoading(true);
    setPaymentProcessing(true);

    try {
      switch (method) {
        case "razorpay":
        case "upi":
        case "card":
        case "netbanking":
        case "wallet":
          await handleRazorpayPayment();
          break;
        case "cod":
          await handleCODPayment();
          break;
        default:
          throw new Error("Unsupported payment method");
      }
    } catch (e) {
      setError(
        `Failed to process ${method} payment: ${e.message || "Unknown error"}`
      );
    } finally {
      setLoading(false);
      setPaymentProcessing(false);
    }
  };

  const handleRazorpayPayment = async () => {
    try {
      setStatus("Loading Razorpay SDK...");
      const ok = await loadRazorpayScript();
      if (!ok) {
        throw new Error("Failed to load Razorpay. Check your connection.");
      }

      setStatus("Creating payment order...");
      const payload = bookingId ? { bookingId } : { quote };
      console.log("Creating order with payload:", payload);

      const { data } = await axios.post("/api/payment/create-order", payload);
      console.log("Create order response:", data);

      if (!data?.success) {
        throw new Error(data?.message || "Could not initiate payment");
      }

      const { order, keyId } = data.data;
      console.log("Order created successfully:", order);

      setStatus("Opening payment gateway...");
      setLoading(false);

      const options = {
        key: keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Royal Hotel Booking",
        description: `Hotel Booking Payment - ${order.receipt}`,
        order_id: order.id,
        theme: {
          color: "#007bff"
        },
        handler: async function (response) {
          try {
            setLoading(true);
            setStatus("Verifying payment...");
            console.log("Payment successful, verifying...", response);
            
            const verifyRes = await axios.post("/api/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            
            if (verifyRes.data && verifyRes.data.success) {
              const booking = verifyRes.data.data?.booking;
              const payment = verifyRes.data.data?.payment;
              
              try {
                localStorage.removeItem("pendingBookingId");
                localStorage.removeItem("pendingQuote");
              } catch (e) {
                console.warn("Could not clear localStorage:", e);
              }
              
              setStatus("Payment successful! Redirecting...");
              setTimeout(() => {
                history.push("/receipt", {
                  bookingId: booking?._id,
                  paymentId: payment?._id,
                  success: true,
                });
              }, 2000);
            } else {
              throw new Error(verifyRes.data?.message || "Payment verification failed");
            }
          } catch (verifyError) {
            console.error("Payment verification failed:", verifyError);
            setError("Payment verification failed. Please contact support.");
            setLoading(false);
          }
        },
        prefill: {
          name: bookingData?.userName || quote?.userName || "",
          email: bookingData?.userEmail || quote?.userEmail || quote?.email || "",
          contact: bookingData?.userPhone || quote?.userPhone || "",
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
            setPaymentProcessing(false);
            setStatus("");
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (e) {
      console.error("Razorpay payment failed:", e);
      throw e;
    }
  };

  const handleCODPayment = async () => {
    setStatus("Processing Cash on Delivery...");
    try {
      const payload = {
        bookingId: bookingId,
        paymentMethod: "cod",
        paymentStatus: "pending",
      };

      const { data } = await axios.post("/api/payment/cod", payload);
      if (data?.success) {
        setStatus("Booking confirmed! You can pay cash on arrival.");
        setTimeout(() => {
          history.push("/receipt", {
            bookingId: data.data?.bookingId,
            paymentMethod: "cod",
            success: true,
          });
        }, 2000);
      } else {
        throw new Error(data?.message || "Could not process COD booking");
      }
    } catch (e) {
      throw e;
    }
  };

  const calculateTotal = () => {
    if (bookingData) {
      return bookingData.totalAmount;
    }
    if (quote && quote.totalAmount) {
      return quote.totalAmount;
    }
    if (quote && quote.checkInDate && quote.checkOutDate && Array.isArray(quote.bookingInfo)) {
      const ci = new Date(quote.checkInDate);
      const co = new Date(quote.checkOutDate);
      const diffMs = Math.abs(co - ci);
      const nights = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
      return quote.bookingInfo.reduce((sum, info) => {
        return sum + Number(info.roomAmount || 0) * nights;
      }, 0);
    }
    return 0;
  };

  const paymentMethods = [
    {
      id: "razorpay",
      name: "Online Payment",
      description: "Credit/Debit Cards, UPI, Net Banking, Wallets",
      icon: "fas fa-credit-card",
      color: "primary",
      recommended: true,
    },
    {
      id: "upi",
      name: "UPI Payment",
      description: "Google Pay, PhonePe, Paytm, BHIM",
      icon: "fas fa-mobile-alt",
      color: "success",
    },
    {
      id: "card",
      name: "Card Payment",
      description: "Credit & Debit Cards",
      icon: "fas fa-credit-card",
      color: "info",
    },
    {
      id: "wallet",
      name: "Digital Wallets",
      description: "Paytm, Mobikwik, Freecharge",
      icon: "fas fa-wallet",
      color: "warning",
    },
    {
      id: "cod",
      name: "Pay at Hotel",
      description: "Cash payment on arrival",
      icon: "fas fa-money-bill-wave",
      color: "secondary",
    },
  ];

  const total = calculateTotal();

  if (!bookingId && !quote) {
    return (
      <div className="payment-container">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="payment-card">
                <div className="payment-header">
                  <h2>Payment Error</h2>
                  <p>No booking information found</p>
                </div>
                <div className="payment-body text-center">
                  <div className="status-icon status-error">
                    <i className="fas fa-exclamation-triangle"></i>
                  </div>
                  <h4>No Booking Found</h4>
                  <p>Please start a new booking to proceed with payment.</p>
                  <button
                    className="btn btn-primary btn-payment"
                    onClick={() => history.push("/")}
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="payment-card">
              <div className="payment-header">
                <h2>
                  <i className="fas fa-credit-card mr-3"></i>
                  Payment Gateway
                </h2>
                <p>Secure payment for your hotel booking</p>
              </div>
              
              <div className="payment-body">
                {/* Booking Summary */}
                <div className="booking-summary">
                  <h4>
                    <i className="fas fa-receipt mr-2"></i>
                    Booking Summary
                  </h4>
                  {bookingData && (
                    <>
                      <div className="summary-item">
                        <span>Check-in Date:</span>
                        <span>{new Date(bookingData.checkInDate).toLocaleDateString()}</span>
                      </div>
                      <div className="summary-item">
                        <span>Check-out Date:</span>
                        <span>{new Date(bookingData.checkOutDate).toLocaleDateString()}</span>
                      </div>
                      <div className="summary-item">
                        <span>Guest Name:</span>
                        <span>{bookingData.userName}</span>
                      </div>
                    </>
                  )}
                  {quote && (
                    <>
                      <div className="summary-item">
                        <span>Check-in Date:</span>
                        <span>{new Date(quote.checkInDate).toLocaleDateString()}</span>
                      </div>
                      <div className="summary-item">
                        <span>Check-out Date:</span>
                        <span>{new Date(quote.checkOutDate).toLocaleDateString()}</span>
                      </div>
                      <div className="summary-item">
                        <span>Guest Name:</span>
                        <span>{quote.userName || quote.email}</span>
                      </div>
                    </>
                  )}
                  <div className="summary-item">
                    <span><strong>Total Amount:</strong></span>
                    <span><strong>₹{total}</strong></span>
                  </div>
                </div>

                {loading && (
                  <div className="payment-status">
                    <div className="status-icon status-processing">
                      <div className="loading-spinner"></div>
                    </div>
                    <h4>Processing...</h4>
                    <p>{status}</p>
                  </div>
                )}

                {error && (
                  <div className="error-message">
                    <i className="fas fa-exclamation-triangle mr-2"></i>
                    <strong>Payment Error:</strong> {error}
                    <button
                      className="btn btn-sm btn-outline-danger ml-2"
                      onClick={() => {
                        setError(null);
                        setLoading(false);
                        setPaymentProcessing(false);
                      }}
                    >
                      Try Again
                    </button>
                  </div>
                )}

                {showPaymentOptions && !loading && (
                  <>
                    <h4 className="mb-4">
                      <i className="fas fa-payment mr-2"></i>
                      Choose Payment Method
                    </h4>
                    
                    <div className="payment-methods-grid">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className={`payment-method-card ${
                            selectedPaymentMethod === method.id ? 'selected' : ''
                          }`}
                          onClick={() => !paymentProcessing && handlePaymentMethod(method.id)}
                        >
                          <div className="card-body">
                            {method.recommended && (
                              <div className="badge badge-success mb-2">Recommended</div>
                            )}
                            <div className="payment-method-icon">
                              <i className={method.icon}></i>
                            </div>
                            <h6 className="card-title">{method.name}</h6>
                            <p className="card-text">{method.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="payment-actions">
                      <button
                        className="btn btn-back btn-payment"
                        onClick={() => history.goBack()}
                        disabled={paymentProcessing}
                      >
                        <i className="fas fa-arrow-left mr-2"></i>
                        Back
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment; {
        console.log(
          "Payment component loaded. BookingId:",
          bookingId,
          "Quote:",
          quote
        );

        if (!bookingId && !quote) {
          setError("Payment session missing. Please start booking again.");
          setTimeout(() => history.push("/"), 3000);
          return;
        }

        // Show payment options immediately instead of trying Razorpay first
        setShowPaymentOptions(true);
        setStatus("Select your preferred payment method");
      } catch (e) {
        console.error("Payment initialization error:", e);
        setError(
          "Failed to initialize payment: " + (e.message || "Unknown error")
        );
      }
    }

    initializePayment();
  }, [bookingId, history]);

  const handlePaymentMethod = async (method) => {
    setSelectedPaymentMethod(method);
    setLoading(true);
    setError(null);

    try {
      if (method === "razorpay") {
        await handleRazorpayPayment();
      } else if (method === "upi") {
        await handleUPIPayment();
      } else if (method === "card") {
        await handleCardPayment();
      } else if (method === "netbanking") {
        await handleNetBankingPayment();
      } else if (method === "wallet") {
        await handleWalletPayment();
      } else if (method === "cod") {
        await handleCODPayment();
      }
    } catch (e) {
      console.error("Payment method error:", e);
      setError(
        `Failed to process ${method} payment: ${e.message || "Unknown error"}`
      );
      setLoading(false);
    }
  };

  const handleRazorpayPayment = async () => {
    try {
      setStatus("Loading Razorpay SDK...");
      const ok = await loadRazorpayScript();
      if (!ok) {
        throw new Error("Failed to load Razorpay. Check your connection.");
      }

      setStatus("Creating payment order...");
      const payload = bookingId ? { bookingId } : { quote };
      console.log("Creating order with payload:", payload);

      const { data } = await axios.post("/api/payment/create-order", payload);
      console.log("Create order response:", data);

      if (!data?.success) {
        throw new Error(data?.message || "Could not initiate payment");
      }

      const { order, keyId } = data.data;
      console.log("Order created successfully:", order);

      setStatus("Opening payment gateway...");
      setLoading(false);

      const options = {
        key: keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Royal Hotel",
        description: `Booking ${order.receipt}`,
        order_id: order.id,
        handler: async function (response) {
          try {
            console.log("Payment successful, verifying...", response);
            const verifyRes = await axios.post("/api/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            if (verifyRes.data && verifyRes.data.success) {
              const booking = verifyRes.data.data?.booking;
              const payment = verifyRes.data.data?.payment;
              try {
                localStorage.removeItem("pendingBookingId");
              } catch {}
              history.push({
                pathname: "/receipt",
                state: { booking, payment },
              });
            } else {
              alert(verifyRes.data?.message || "Payment verification failed");
              setShowPaymentOptions(true);
              setLoading(false);
            }
          } catch (e) {
            console.error("verify error", e);
            alert("Payment verification error");
            setShowPaymentOptions(true);
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            alert("Payment cancelled");
            setShowPaymentOptions(true);
            setLoading(false);
          },
        },
        theme: { color: "#28a745" },
      };

      const rzp = new window.Razorpay(options);
      try {
        if (bookingId) localStorage.setItem("pendingBookingId", bookingId);
        if (quote) localStorage.setItem("pendingQuote", JSON.stringify(quote));
      } catch {}
      rzp.open();
    } catch (e) {
      throw e;
    }
  };

  const handleUPIPayment = async () => {
    setStatus("Processing UPI payment...");
    // For now, redirect to Razorpay UPI options
    setTimeout(() => {
      handleRazorpayPayment();
    }, 1000);
  };

  const handleCardPayment = async () => {
    setStatus("Processing card payment...");
    // For now, redirect to Razorpay card options
    setTimeout(() => {
      handleRazorpayPayment();
    }, 1000);
  };

  const handleNetBankingPayment = async () => {
    setStatus("Processing net banking payment...");
    // For now, redirect to Razorpay net banking options
    setTimeout(() => {
      handleRazorpayPayment();
    }, 1000);
  };

  const handleWalletPayment = async () => {
    setStatus("Processing wallet payment...");
    // For now, redirect to Razorpay wallet options
    setTimeout(() => {
      handleRazorpayPayment();
    }, 1000);
  };

  const handleCODPayment = async () => {
    setStatus("Processing Cash on Delivery...");
    try {
      // Create booking with COD status
      const payload = {
        bookingId: bookingId,
        paymentMethod: "cod",
        paymentStatus: "pending",
      };

      const { data } = await axios.post("/api/payment/cod", payload);
      if (data?.success) {
        alert("Booking confirmed! You can pay cash on arrival.");
        history.push("/receipt");
      } else {
        throw new Error(data?.message || "Could not process COD booking");
      }
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const paymentMethods = [
    {
      id: "razorpay",
      name: "Razorpay Gateway",
      description: "Credit/Debit Cards, UPI, Net Banking, Wallets",
      icon: "fas fa-credit-card",
      color: "primary",
    },
    {
      id: "upi",
      name: "UPI Payment",
      description: "Paytm, Google Pay, PhonePe, BHIM",
      icon: "fas fa-mobile-alt",
      color: "success",
    },
    {
      id: "card",
      name: "Card Payment",
      description: "Credit & Debit Cards",
      icon: "fas fa-credit-card",
      color: "info",
    },
    {
      id: "netbanking",
      name: "Net Banking",
      description: "All major banks",
      icon: "fas fa-university",
      color: "warning",
    },
    {
      id: "wallet",
      name: "Digital Wallets",
      description: "Paytm, Mobikwik, Freecharge",
      icon: "fas fa-wallet",
      color: "secondary",
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      description: "Pay when you arrive",
      icon: "fas fa-money-bill-wave",
      color: "dark",
    },
  ];

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">
                <i className="fas fa-credit-card mr-2"></i>
                Choose Payment Method
              </h4>
            </div>
            <div className="card-body">
              {loading && (
                <div className="text-center mb-4">
                  <div
                    className="spinner-border text-primary mb-3"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                  <h5 className="text-primary">{status}</h5>
                  <p className="text-muted">Please wait...</p>
                </div>
              )}

              {error && (
                <div className="alert alert-danger mb-4">
                  <i className="fas fa-exclamation-triangle mr-2"></i>
                  <strong>Payment Error:</strong> {error}
                  <button
                    className="btn btn-sm btn-outline-danger ml-2"
                    onClick={() => {
                      setError(null);
                      setShowPaymentOptions(true);
                      setLoading(false);
                    }}
                  >
                    Try Again
                  </button>
                </div>
              )}

              {showPaymentOptions && !loading && (
                <>
                  <div className="row">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="col-md-6 mb-3">
                        <div
                          className={`card payment-method-card border-${method.color} h-100`}
                          style={{ cursor: "pointer" }}
                          onClick={() => handlePaymentMethod(method.id)}
                        >
                          <div className="card-body text-center">
                            <i
                              className={`${method.icon} fa-2x text-${method.color} mb-3`}
                            ></i>
                            <h6 className="card-title">{method.name}</h6>
                            <p className="card-text text-muted small">
                              {method.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center mt-4">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => history.push("/")}
                    >
                      <i className="fas fa-arrow-left mr-2"></i>
                      Back to Home
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
