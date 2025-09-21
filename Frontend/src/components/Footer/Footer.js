import React from "react";
import "./Footer.css";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCrown,
  FaUmbrellaBeach,
  FaConciergeBell,
  FaUtensils,
  FaParking,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      {/* Decorative top border */}
      <div className="footer-top-border"></div>

      {/* Main footer content */}
      <div className="footer-content">
        {/* Premium badge */}
        <div className="premium-badge">
          <div className="badge-inner">
            <FaCrown className="badge-crown" />
            <span>Luxury Hospitality</span>
          </div>
        </div>

        {/* Footer main sections */}
        <div className="footer-sections">
          {/* Brand section */}
          <div className="footer-brand">
            <div className="hotel-logo">
              <FaCrown className="logo-crown" />
              <h3 className="hotel-name">Hotel Royal Blue Star</h3>
            </div>
            <p className="hotel-tagline">
              Excellence in Hospitality Since 2023
            </p>
            <p className="hotel-description">
              Experience unparalleled luxury and impeccable service at North
              Bihar's premier destination for discerning travelers.
            </p>
            <div className="awards">
              <div className="award-item">★★★★★ Luxury Hotel</div>
              <div className="award-item">2023 Hospitality Excellence</div>
            </div>
          </div>

          {/* Contact section */}
          <div className="footer-contact">
            <h4 className="section-title">Contact Us</h4>
            <div className="contact-info">
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <span>Near Bariya Golambar Muzaffarpur, Bihar - 842001</span>
              </div>
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <a href="tel:9031370046">+91 9031370046</a>
              </div>
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <a href="mailto:hotelroyalbluestar@gmail.com">
                  hotelroyalbluestar@gmail.com
                </a>
              </div>
              <div className="contact-item">
                <strong>Owner:</strong> Jitendar Jii
              </div>
            </div>
          </div>

          {/* Facilities section */}
          <div className="footer-facilities">
            <h4 className="section-title">Our Facilities</h4>
            <ul className="facilities-list">
              <li>
                <FaUmbrellaBeach /> <span>Luxury Accommodations</span>
              </li>
              <li>
                <FaUtensils /> <span>Multi-Cuisine Restaurant</span>
              </li>
              <li>
                <FaConciergeBell /> <span>Banquet & Event Spaces</span>
              </li>
              <li>
                <FaParking /> <span>Secure Parking</span>
              </li>
            </ul>
          </div>

          {/* Social section */}
          <div className="footer-social">
            <h4 className="section-title">Connect With Us</h4>
            <p className="social-text">
              Follow our journey for exclusive offers
            </p>
            <div className="social-links">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="social-link facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="social-link instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="social-link twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="social-link linkedin"
              >
                <FaLinkedin />
              </a>
            </div>

            <div className="newsletter">
              <h5>Subscribe to Our Newsletter</h5>
              <div className="newsletter-form">
                <input type="email" placeholder="Your email address" />
                <button>Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="footer-bottom">
          <div className="footer-divider">
            <div className="divider-ornament"></div>
          </div>

          <div className="footer-credits">
            <p className="credit-text">
              Developed by <strong>Promotion India</strong>
              <span className="separator"> | </span>
              &copy; {new Date().getFullYear()} All rights reserved by Promotion
              India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
