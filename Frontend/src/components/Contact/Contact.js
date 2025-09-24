import React, { useState } from "react";
import "./Contact.css";

import location from "../../style/img/location.png";

function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      firstName: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="contact-container">
      <div className="contact-hero">
        <h1 className="contact-title">Get In Touch</h1>
        <div className="contact-divider"></div>
        <p className="contact-subtitle">
          We'd love to hear from you. Reach out to us for bookings, inquiries,
          or any assistance you may need.
        </p>
      </div>

      <div className="contact-content">
        <div className="contact-form-container">
          <div className="form-wrapper">
            <h2 className="form-title">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name..."
                  className="form-control"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email..."
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  name="message"
                  rows="5"
                  placeholder="Message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-button">
                Send Message
                <span className="button-icon">→</span>
              </button>
            </form>
          </div>
        </div>

        <div className="contact-info-container">
          <div className="info-card">
            <h3 className="info-title">Hotel Royal Blue Star</h3>
            <div className="info-item">
              <div className="info-icon">📍</div>
              <div className="info-text">
                Near Bariya Golambar ,
                <br />
                Muzaffarpur, Bihar 842001
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">📞</div>
              <div className="info-text">
                +91 9031370046
                <br />
                +91 620 225 5555
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">✉️</div>
              <div className="info-text">
                hotelroyalbluestar@gmail.com
                <br />
                bookings@hotelroyalbluestar.com
              </div>
            </div>

            <div className="operation-hours">
              <h4>Operation Hours</h4>
              <p>Front Desk: 24/7</p>
              <p>Reservations: 8:00 AM - 10:00 PM</p>
            </div>
          </div>

          <div className="map-container">
            <img
              src={location}
              alt="Hotel Location"
              className="contact-location"
            />
            <div className="map-overlay">View Larger Map</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
