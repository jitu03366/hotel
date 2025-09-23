import React, { useEffect, useRef, useState } from "react";
import { useStateValue } from "../../context/StateProvider";
import { actionTypes } from "../../context/reducer";
import { useHistory } from "react-router-dom";
import "./BookNow.css";
import countryList from "../../data/country_list.json";
import axios from "../../axios";

function BookNow() {
  const [, dispatch] = useStateValue();
  const history = useHistory();

  const [allRooms, setAllRooms] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);
  const [guest, setGuest] = useState(1);
  const [room, setRoom] = useState(1);
  const [roomType, setRoomType] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [bookMsg, setBookMsg] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [roomsLoading, setRoomsLoading] = useState(true);

  const firstStage = useRef();
  const secondStage = useRef();
  const thirdStage = useRef();
  const fourthStage = useRef();
  const progressBar = useRef();
  const checkInRef = useRef();
  const checkOutRef = useRef();

  // Load available rooms when component mounts
  useEffect(() => {
    const loadRooms = async () => {
      try {
        setRoomsLoading(true);
        const response = await axios.get("/api/rooms/available");
        if (response.data && response.data.success) {
          setAllRooms(response.data.data);
        } else {
          setBookMsg(
            "Failed to load available rooms. Please refresh the page."
          );
        }
      } catch (error) {
        setBookMsg(
          "Error loading rooms. Please check your connection and try again."
        );
      } finally {
        setRoomsLoading(false);
      }
    };

    loadRooms();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
  }

  function clearFormFields() {
    setCheckIn("");
    setCheckOut("");
    setAdult(1);
    setChild(0);
    setGuest(1);
    setRoom(1);
    setRoomType("");
    setSelectedRoomId("");
    setName("");
    setEmail("");
    setPhone("");
    setCountry("");
    setAddress("");
    setAddress2("");
    setZip("");
    setCity("");
    setState("");
  }

  useEffect(() => {
    if (progressBar.current) {
      progressBar.current.style = "width: 25%";
      progressBar.current.innerText = "25%";
    }

    async function getRooms() {
      try {
        const res = await axios.get("/api/rooms/available");
        if (res.data && res.data.success) {
          setAllRooms(res.data.data || []);
        }
      } catch (e) {
        // ignore load errors here; selection will be optional
      }
    }

    getRooms();
  }, []);

  async function bookRoom() {
    try {
      if (!selectedRoomId) {
        return alert("Please select a room");
      }
      const selected = allRooms.find((r) => r._id === selectedRoomId);
      if (!selected) {
        return alert("Selected room not found. Please reselect.");
      }

      // Enhanced validations for user details
      if (!name || !email) {
        return alert("Please enter your name and email to continue");
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return alert("Please enter a valid email address");
      }

      // Validate phone number format if provided
      if (!phone || !/^\d{10}$/.test(phone)) {
        return alert("Please enter a valid 10-digit phone number");
      }

      // compute nights
      const ci = new Date(checkIn);
      const co = new Date(checkOut);
      const diffMs = Math.abs(co - ci);
      const nights = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

      setBookingLoading(true);
      setBookMsg("");

      // First, create or get user
      let userId = null;
      try {
        const userPayload = {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone ? phone.trim() : "0900000000",
          address: {
            street: address ? address.trim() : "",
            street2: address2 ? address2.trim() : "",
            city: city ? city.trim() : "",
            state: state ? state.trim() : "",
            zip: zip ? zip.trim() : "",
            country: country ? country.trim() : "",
          },
        };

        console.log("Creating user with payload:", userPayload);
        const userRes = await axios.post(
          "/api/users/add_reservation",
          userPayload
        );
        if (userRes.data && userRes.data.success) {
          userId = userRes.data.data._id;
          console.log("User created/updated successfully with ID:", userId);
        }
      } catch (userError) {
        console.error("User creation error:", userError);
      }

      const payload = {
        userId: userId,
        userEmail: email,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        paymentId: null,
        paymentStatus: "not-paid",
        isPast: false,
        bookingInfo: [
          {
            pax: [
              {
                name: name,
                adultStatus: adult > 0 ? "adult" : "child",
                gender: "other",
                age: 0,
              },
            ],
            roomType: selected.type,
            roomId: selected._id,
            roomAmount: selected.rentPerDay,
          },
        ],
        totalAmount: selected.rentPerDay * nights,
      };

      const res = await axios.post("/api/booking/add_reservation", payload);
      if (res.data && res.data.success) {
        const bookingId = res.data.reservation?._id;
        if (bookingId) {
          try {
            localStorage.setItem("pendingBookingId", bookingId);
          } catch {}
          history.push({ pathname: "/payment", state: { bookingId } });
        } else {
          alert(
            "Reservation created but booking id missing. Redirecting to resume payment."
          );
          history.push("/pending-payment");
        }
      } else {
        alert(res.data?.message || "Could not create reservation");
        history.push("/pending-payment");
      }
    } catch (e) {
      console.error(e);
      alert("Something went wrong while creating the reservation");
    } finally {
      setBookingLoading(false);
    }
  }

  function changeStage(from, to) {
    if (from === 1 && to > from) {
      if (!checkIn) {
        return alert("Check In is Required");
      } else if (!checkOut) {
        return alert("Check Out is Required");
      }
      if (new Date(checkOut) <= new Date(checkIn)) {
        return alert("Check Out must be after Check In");
      }
    }
    if (from === 2 && to > from) {
      if (guest === undefined || guest < 1) {
        return alert("Adult In is Required");
      } else if (room === undefined || room < 1) {
        return alert("Room is Required");
      }
      if (!selectedRoomId) {
        return alert("Please select a room type");
      }
    }

    if (to === 1) {
      firstStage.current.classList.remove("d-none");
      secondStage.current.classList.add("d-none");
      thirdStage.current.classList.add("d-none");
      fourthStage.current.classList.add("d-none");

      if (progressBar.current) {
        progressBar.current.style = "width: 25%";
        progressBar.current.innerText = "25%";
      }
    }

    if (to === 2) {
      firstStage.current.classList.add("d-none");
      secondStage.current.classList.remove("d-none");
      thirdStage.current.classList.add("d-none");
      fourthStage.current.classList.add("d-none");

      if (progressBar.current) {
        progressBar.current.style = "width: 50%";
        progressBar.current.innerText = "50%";
      }
    }

    if (to === 3) {
      firstStage.current.classList.add("d-none");
      secondStage.current.classList.add("d-none");
      thirdStage.current.classList.remove("d-none");
      fourthStage.current.classList.add("d-none");

      if (progressBar.current) {
        progressBar.current.style = "width: 75%";
        progressBar.current.innerText = "75%";
      }
    }

    if (to === 4) {
      firstStage.current.classList.add("d-none");
      secondStage.current.classList.add("d-none");
      thirdStage.current.classList.add("d-none");
      fourthStage.current.classList.remove("d-none");
      history.push("/user-details");
    }
  }

  function checkRoomsAndRates() {
    if (!checkIn || !checkOut) {
      return alert("Please select valid dates");
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      return alert("Check Out must be after Check In");
    }
    dispatch({
      type: actionTypes.BOOKING,
      booking: {
        checkIn: checkIn,
        checkOut: checkOut,
        guest: guest,
        room: room,
      },
    });

    history.push("/check-rooms-and-rates");
  }

  useEffect(() => {
    var today = new Date().toISOString().split("T")[0];
    if (checkInRef.current) {
      checkInRef.current.setAttribute("min", today);
    }

    if (checkIn === undefined || checkIn === "") {
      if (checkOutRef.current) {
        checkOutRef.current.disabled = true;
      }
    } else {
      if (checkOutRef.current) {
        checkOutRef.current.disabled = false;
        checkOutRef.current.setAttribute("min", checkIn);
      }
    }
  }, [checkIn]);

  return (
    <div className="bookNow">
      <div className="bookNow__background"></div>
      <div className="container bookNow__content">
        <div className="bookNow__header">
          <h1 className="bookNow__title">Reserve Your Stay</h1>
          <p className="bookNow__subtitle">
            Experience luxury at Hotel Royal Blue Star
          </p>
        </div>

        <div className="bookNow__progress">
          <div className="bookNow__progress-track">
            <div className="bookNow__progress-bar" ref={progressBar}>
              <span className="bookNow__progress-text">25%</span>
            </div>
          </div>
          <div className="bookNow__progress-steps">
            <div className="bookNow__progress-step active">
              <div className="bookNow__step-icon">1</div>
              <span>Dates</span>
            </div>
            <div className="bookNow__progress-step">
              <div className="bookNow__step-icon">2</div>
              <span>Guests & Rooms</span>
            </div>
            <div className="bookNow__progress-step">
              <div className="bookNow__step-icon">3</div>
              <span>Details</span>
            </div>
            <div className="bookNow__progress-step">
              <div className="bookNow__step-icon">4</div>
              <span>Confirmation</span>
            </div>
          </div>
        </div>

        <form className="bookNow__form" onSubmit={(e) => handleSubmit(e)}>
          {/* First Stage - Dates */}
          <div className="bookNow__stage" ref={firstStage}>
            <div className="bookNow__stage-header">
              <h2>Select Your Dates</h2>
              <p>Choose your check-in and check-out dates</p>
            </div>

            <div className="bookNow__form-grid">
              <div className="bookNow__input-group">
                <label htmlFor="check_in" className="bookNow__label">
                  <span className="bookNow__label-icon">📅</span>
                  Check In
                </label>
                <div className="bookNow__input-wrapper">
                  <input
                    ref={checkInRef}
                    type="date"
                    id="check_in"
                    className="bookNow__input"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  <div className="bookNow__input-decoration"></div>
                </div>
              </div>

              <div className="bookNow__input-group">
                <label htmlFor="check_out" className="bookNow__label">
                  <span className="bookNow__label-icon">📅</span>
                  Check Out
                </label>
                <div className="bookNow__input-wrapper">
                  <input
                    ref={checkOutRef}
                    type="date"
                    id="check_out"
                    className="bookNow__input"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn || new Date().toISOString().split("T")[0]}
                    disabled={!checkIn}
                  />
                  <div className="bookNow__input-decoration"></div>
                </div>
              </div>
            </div>

            <div className="bookNow__stage-actions">
              <button
                type="button"
                className="bookNow__button bookNow__button--primary"
                onClick={() => changeStage(1, 2)}
              >
                Continue to Guests & Rooms
                <span className="bookNow__button-arrow">→</span>
              </button>
            </div>
          </div>

          {/* Second Stage - Guests & Rooms */}
          <div className="bookNow__stage d-none" ref={secondStage}>
            <div className="bookNow__stage-header">
              <h2>Guests & Room Selection</h2>
              {/* <p>Tell us about your party and room preferences</p> */}
            </div>

            {/* <div className="bookNow__form-grid">
              <div className="bookNow__input-group">
                <label htmlFor="adult" className="bookNow__label">
                  <span className="bookNow__label-icon">👨‍👩‍👧‍👦</span>
                  Adults (12+ years)
                </label>
                <div className="bookNow__input-wrapper">
                  <input
                    type="number"
                    id="adult"
                    className="bookNow__input"
                    value={adult}
                    onChange={(e) => setAdult(e.target.value)}
                    min="1"
                  />
                  <div className="bookNow__input-decoration"></div>
                </div>
              </div>

              <div className="bookNow__input-group">
                <label htmlFor="child" className="bookNow__label">
                  <span className="bookNow__label-icon">🧒</span>
                  Children (4-11 years)
                </label>
                <div className="bookNow__input-wrapper">
                  <input
                    type="number"
                    id="child"
                    className="bookNow__input"
                    value={child}
                    onChange={(e) => setChild(e.target.value)}
                    min="0"
                  />
                  <div className="bookNow__input-decoration"></div>
                </div>
              </div>

              <div className="bookNow__input-group">
                <label htmlFor="guest" className="bookNow__label">
                  <span className="bookNow__label-icon">👥</span>
                  Total Guests
                </label>
                <div className="bookNow__input-wrapper">
                  <input
                    type="number"
                    id="guest"
                    className="bookNow__input"
                    value={guest}
                    onChange={(e) => setGuest(e.target.value)}
                    min="1"
                  />
                  <div className="bookNow__input-decoration"></div>
                </div>
              </div>

              <div className="bookNow__input-group">
                <label htmlFor="rooms" className="bookNow__label">
                  <span className="bookNow__label-icon">🛏️</span>
                  Rooms Needed
                </label>
                <div className="bookNow__input-wrapper">
                  <input
                    type="number"
                    id="rooms"
                    className="bookNow__input"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    min="1"
                  />
                  <div className="bookNow__input-decoration"></div>
                </div>
              </div>

              <div className="bookNow__input-group bookNow__input-group--full">
                <label htmlFor="room_type" className="bookNow__label">
                  <span className="bookNow__label-icon">⭐</span>
                  Room Type
                </label>
                <div className="bookNow__select-wrapper">
                  <select
                    className="bookNow__select"
                    id="room_type"
                    value={selectedRoomId}
                    onChange={(e) => {
                      setSelectedRoomId(e.target.value);
                      const found = allRooms.find(
                        (r) => r._id === e.target.value
                      );
                      setRoomType(found ? found.type : "");
                    }}
                    disabled={roomsLoading}
                  >
                    <option value="">
                      {roomsLoading ? "Loading rooms..." : "Select a room type"}
                    </option>
                    {!roomsLoading && allRooms.length === 0 && (
                      <option value="" disabled>
                        No rooms available
                      </option>
                    )}
                    {allRooms.map((room) => (
                      <option value={room._id} key={room._id}>
                        {room.name} ({room.type}) - ₹{room.rentPerDay}/night
                      </option>
                    ))}
                  </select>
                  <div className="bookNow__select-arrow">▼</div>
                </div>
              </div>
            </div> */}

            <div className="bookNow__stage-actions">
              <button
                type="button"
                className="bookNow__button bookNow__button--secondary"
                onClick={() => changeStage(2, 1)}
              >
                ← Back to Dates
              </button>
              {/* <button
                type="button"
                className="bookNow__button bookNow__button--primary"
                onClick={() => changeStage(2, 3)}
              >
                Continue to Details
                <span className="bookNow__button-arrow">→</span>
              </button> */}
              <button
                type="button"
                className="bookNow__button bookNow__button--outline"
                onClick={checkRoomsAndRates}
              >
                Check Rooms & Rates
              </button>
            </div>
          </div>

          {/* Third Stage - Details */}
          <div className="bookNow__stage d-none" ref={thirdStage}>
            <div className="bookNow__stage-header">
              <h2>Your Information</h2>
              <p>We'll use this to confirm your reservation</p>
            </div>

            {/* <div className="bookNow__form-grid">
              <div className="bookNow__input-group">
                <label htmlFor="full_name" className="bookNow__label">
                  <span className="bookNow__label-icon">👤</span>
                  Full Name
                </label>
                <div className="bookNow__input-wrapper">
                  <input
                    type="text"
                    id="full_name"
                    className="bookNow__input"
                    value={name || ""}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                  />
                  <div className="bookNow__input-decoration"></div>
                </div>
              </div>

              <div className="bookNow__input-group">
                <label htmlFor="email" className="bookNow__label">
                  <span className="bookNow__label-icon">📧</span>
                  Email Address
                </label>
                <div className="bookNow__input-wrapper">
                  <input
                    type="email"
                    id="email"
                    className="bookNow__input"
                    value={email || ""}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                  />
                  <div className="bookNow__input-decoration"></div>
                </div>
              </div>

              <div className="bookNow__input-group">
                <label htmlFor="phone" className="bookNow__label">
                  <span className="bookNow__label-icon">📱</span>
                  Phone Number
                </label>
                <div className="bookNow__input-wrapper">
                  <input
                    type="tel"
                    id="phone"
                    className="bookNow__input"
                    value={phone || ""}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit phone number"
                  />
                  <div className="bookNow__input-decoration"></div>
                </div>
              </div>

              <div className="bookNow__input-group">
                <label htmlFor="country" className="bookNow__label">
                  <span className="bookNow__label-icon">🌎</span>
                  Country
                </label>
                <div className="bookNow__select-wrapper">
                  <select
                    className="bookNow__select"
                    id="country"
                    value={country || ""}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="">Select your country</option>
                    {countryList.map((country) => (
                      <option value={country.code} key={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  <div className="bookNow__select-arrow">▼</div>
                </div>
              </div>

              <div className="bookNow__input-group bookNow__input-group--full">
                <label htmlFor="address" className="bookNow__label">
                  <span className="bookNow__label-icon">🏠</span>
                  Street Address
                </label>
                <div className="bookNow__input-wrapper">
                  <input
                    type="text"
                    id="address"
                    className="bookNow__input"
                    value={address || ""}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Your street address"
                  />
                  <div className="bookNow__input-decoration"></div>
                </div>
              </div>

              <div className="bookNow__input-group">
                <label htmlFor="address2" className="bookNow__label">
                  <span className="bookNow__label-icon">🏢</span>
                  Address Line 2
                </label>
                <div className="bookNow__input-wrapper">
                  <input
                    type="text"
                    id="address2"
                    className="bookNow__input"
                    value={address2 || ""}
                    onChange={(e) => setAddress2(e.target.value)}
                    placeholder="Apartment, suite, etc."
                  />
                  <div className="bookNow__input-decoration"></div>
                </div>
              </div>

              <div className="bookNow__input-group">
                <label htmlFor="city" className="bookNow__label">
                  <span className="bookNow__label-icon">🏙️</span>
                  City
                </label>
                <div className="bookNow__input-wrapper">
                  <input
                    type="text"
                    id="city"
                    className="bookNow__input"
                    value={city || ""}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Your city"
                  />
                  <div className="bookNow__input-decoration"></div>
                </div>
              </div>

              <div className="bookNow__input-group">
                <label htmlFor="state" className="bookNow__label">
                  <span className="bookNow__label-icon">🗺️</span>
                  State
                </label>
                <div className="bookNow__input-wrapper">
                  <input
                    type="text"
                    id="state"
                    className="bookNow__input"
                    value={state || ""}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="Your state"
                  />
                  <div className="bookNow__input-decoration"></div>
                </div>
              </div>

              <div className="bookNow__input-group">
                <label htmlFor="zip" className="bookNow__label">
                  <span className="bookNow__label-icon">📮</span>
                  ZIP Code
                </label>
                <div className="bookNow__input-wrapper">
                  <input
                    type="text"
                    id="zip"
                    className="bookNow__input"
                    value={zip || ""}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="ZIP or postal code"
                  />
                  <div className="bookNow__input-decoration"></div>
                </div>
              </div>
            </div> */}

            {/* <div className="bookNow__stage-actions">
              <button
                type="button"
                className="bookNow__button bookNow__button--secondary"
                onClick={() => changeStage(3, 2)}
              >
                ← Back to Guests & Rooms
              </button>
              <button
                type="button"
                className="bookNow__button bookNow__button--primary"
                onClick={bookRoom}
                disabled={bookingLoading}
              >
                {bookingLoading ? (
                  <>
                    <span className="bookNow__button-spinner"></span>
                    Processing...
                  </>
                ) : (
                  "Complete Reservation"
                )}
              </button>
            </div> */}
          </div>

          {/* Fourth Stage - Confirmation */}
          {/* <div className="bookNow__stage d-none" ref={fourthStage}>
            <div className="bookNow__success">
              <div className="bookNow__success-icon">✓</div>
              <h2>Reservation Confirmed!</h2>
              <p>
                Your room has been successfully booked. You will receive a
                confirmation email shortly.
              </p>
              <button
                type="button"
                className="bookNow__button bookNow__button--primary"
                onClick={() => history.push("/")}
              >
                Return to Home
              </button>
            </div>
          </div> */}
        </form>
      </div>
    </div>
  );
}

export default BookNow;
