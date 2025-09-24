import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about__container">
      {/* Hero Section with Background Image */}
      <div className="about__hero-section">
        <div className="about__overlay"></div>
        <h1 className="about__hero-title">About Us</h1>
      </div>

      {/* Content Section */}
      <div className="about__content">
        <div className="about__text-container">
          <div className="about__decorative-top"></div>

          <p className="about__paragraph about__first-paragraph">
            Welcome to{" "}
            <strong className="about__highlight">Hotel Royal Blue Star</strong>,
            the rising guest house and banquet hall of North Bihar. Conveniently
            located in Muzaffarpur, near Bariya Golambar (842001), our hotel
            offers comfort and elegance at the heart of the city.
          </p>

          <div className="about__divider">
            <div className="about__divider-inner"></div>
          </div>

          <p className="about__paragraph about__second-paragraph">
            We provide a wide range of facilities including well-furnished
            rooms, spacious banquet halls, multi-cuisine restaurants, party
            halls, and a secure parking area. At Hotel Royal Blue Star, we are
            committed to making your stay memorable — whether you are here for
            leisure, celebrations, or business.
          </p>

          <div className="about__decorative-bottom"></div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="about__floral-element about__floral-1"></div>
      <div className="about__floral-element about__floral-2"></div>
    </div>
  );
}

export default About;
