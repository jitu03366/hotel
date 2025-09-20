import React from "react";
import { Link } from "react-router-dom";

import "./Showcase.css";

function Showcase(props) {
  return (
    <div className="showcase d-flex align-items-center">
      {/* Floating Elements for Visual Appeal */}
      <div className="showcase__floating-elements">
        <div className="showcase__floating-element"></div>
        <div className="showcase__floating-element"></div>
        <div className="showcase__floating-element"></div>
      </div>

      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-8 col-md-10 showcase__content">
            <div className="text-center text-md-left">
              <h1 className="showcase__hero">Welcome to Royal Hotel</h1>
              <p className="showcase__subtitle">
                Experience luxury and comfort like never before. Book your
                perfect getaway with world-class amenities and exceptional
                service.
              </p>
              <div className="showcase__cta">
                <button
                  className="btn btn-primary btn-lg mr-3 mb-2"
                  onClick={props.scrollToBookNow}
                >
                  <i className="fas fa-calendar-check mr-2"></i>
                  Book Now
                </button>
                <button
                  className="btn btn-outline-light btn-lg mb-2"
                  onClick={props.scrollToRooms}
                >
                  <i className="fas fa-bed mr-2"></i>
                  View Rooms
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Showcase;
