import React from "react";
import "./Showcase.css";

function Showcase(props) {
  const handleCallReception = () => {
    // Using tel: protocol to initiate a phone call
    window.location.href = "tel:+919031370046";
  };

  return (
    <div className="showcase d-flex align-items-center">
      {/* Enhanced floating elements with luxury styling */}
      <div className="showcase__floating-elements">
        <div className="showcase__floating-element showcase__floating-element--1"></div>
        <div className="showcase__floating-element showcase__floating-element--2"></div>
        <div className="showcase__floating-element showcase__floating-element--3"></div>
        <div className="showcase__floating-element showcase__floating-element--4"></div>
        <div className="showcase__floating-element showcase__floating-element--5"></div>
      </div>

      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-8 col-md-10 showcase__content">
            <div className="text-center">
              {/* Premium badge */}
              <div className="showcase__premium-badge">
                <span className="showcase__badge-text">
                  World Luxury Hotel Award 2023
                </span>
              </div>

              <h1 className="showcase__hero">HOTE ROYAL BLUE STAR</h1>
              <p className="showcase__subtitle">
                Indulge in unparalleled elegance with our exclusive
                accommodations. For instant reservations and personalized
                service, connect directly with our concierge.
              </p>

              {/* Stats counter */}
              <div className="showcase__stats">
                <div className="showcase__stat-item">
                  <span className="showcase__stat-number">24/7</span>
                  <span className="showcase__stat-label">Extra Service</span>
                </div>
                <div className="showcase__stat-item">
                  <span className="showcase__stat-number">5★</span>
                  <span className="showcase__stat-label">Luxury Rating</span>
                </div>
                <div className="showcase__stat-item">
                  <span className="showcase__stat-number">0m</span>
                  <span className="showcase__stat-label">Wait Time</span>
                </div>
              </div>

              <div className="showcase__cta">
                <button
                  className="btn btn-primary btn-lg mr-3 mb-2 showcase__cta-button showcase__cta-button--primary"
                  onClick={props.scrollToBookNow}
                >
                  <i className="fas fa-calendar-check mr-2"></i>
                  Book Now
                </button>
                <button
                  className="btn btn-outline-light btn-lg mb-2 showcase__cta-button showcase__cta-button--secondary"
                  onClick={handleCallReception}
                >
                  <i className="fas fa-phone-alt mr-2"></i>
                  Instant Booking: Call +91 9031370046
                </button>
              </div>

              <div className="showcase__assurance">
                <i className="fas fa-shield-alt mr-2"></i>
                <span>Guaranteed best rates when booking directly</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Showcase;
