import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { actionTypes } from "../../context/reducer";
import "./Navbar.css";
import PropTypes from "prop-types";

function Navbar(props) {
  const [state, dispatch] = useStateValue();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("home");

  const mobileMenu = useRef();
  const navbar = useRef();
  const burger = useRef();
  const backdrop = useRef();

  function toggleNav() {
    const newToggleState = !state.navToggled;
    console.log("ToggleNav called - newToggleState:", newToggleState);
    setIsMenuOpen(newToggleState);

    dispatch({
      type: actionTypes.TOGGLE_NAV,
      navToggled: newToggleState,
    });

    // Toggle body scroll and backdrop
    if (newToggleState) {
      document.body.classList.add("body-no-scroll");
      if (backdrop.current) {
        backdrop.current.classList.add("active");
      }
      // Ensure mobile menu is visible when opened
      if (mobileMenu.current) {
        mobileMenu.current.classList.add("active");
      }
    } else {
      document.body.classList.remove("body-no-scroll");
      if (backdrop.current) {
        backdrop.current.classList.remove("active");
      }
      // Hide mobile menu when closed
      if (mobileMenu.current) {
        mobileMenu.current.classList.remove("active");
      }
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log("Navbar useEffect - navToggled:", state.navToggled);
    if (state.navToggled === true) {
      if (mobileMenu.current) {
        mobileMenu.current.classList.add("active");
        console.log("Added active class to mobile menu");
      }
      if (burger.current) {
        burger.current.classList.add("active");
      }
    } else if (state.navToggled === false) {
      if (mobileMenu.current) {
        mobileMenu.current.classList.remove("active");
        console.log("Removed active class from mobile menu");
      }
      if (burger.current) {
        burger.current.classList.remove("active");
      }
    }
  }, [state.navToggled]);

  const handleNavClick = (scrollFunction, itemName) => {
    if (state.navToggled) {
      toggleNav();
      document.body.classList.remove("body-no-scroll");
      if (backdrop.current) {
        backdrop.current.classList.remove("active");
      }
    }
    if (scrollFunction) {
      scrollFunction();
    }
    if (itemName) {
      setActiveItem(itemName);
    }
  };

  // Close menu when clicking on backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleNav();
    }
  };

  // Navigation items data - REARRANGED ORDER
  const navItems = [
    { name: "home", label: "Home", scroll: props.scrollToHome },
    { name: "about", label: "About Us", scroll: props.scrollToAbout },
    { name: "gallery", label: "Gallery", scroll: props.scrollToGallery },
    { name: "contact", label: "Contact Us", scroll: props.scrollToContact },
    { name: "rooms", label: "Rooms", scroll: props.scrollToRooms },
    {
      name: "accommodations",
      label: "Accommodations",
      scroll: props.scrollToAccommodations,
    },
  ];
  Navbar.propTypes = {
    scrollToHome: PropTypes.func,
    scrollToAbout: PropTypes.func,
    scrollToGallery: PropTypes.func,
    scrollToContact: PropTypes.func,
    scrollToRooms: PropTypes.func,
    scrollToAccommodations: PropTypes.func,
    scrollToBookNow: PropTypes.func,
  };

  return (
    <div>
      <div className="navbar-backdrop"></div>

      {/* Mobile Menu Backdrop */}
      <div
        className="mobile-menu-backdrop"
        ref={backdrop}
        onClick={handleBackdropClick}
      ></div>

      {/* COMPLETELY SEPARATE MOBILE MENU - GUARANTEED TO WORK */}
      {state.navToggled && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.8)",
            zIndex: 99999,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
          onClick={toggleNav}
        >
          <div
            style={{
              width: "300px",
              height: "100%",
              background: "rgba(10, 10, 10, 0.98)",
              borderLeft: "1px solid rgba(212, 175, 55, 0.3)",
              padding: "2rem 1rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "1.5rem",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.name === "home" ? "/" : ""}
                onClick={() => handleNavClick(item.scroll, item.name)}
                style={{
                  display: "block",
                  padding: "16px 24px",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontSize: "18px",
                  fontWeight: "600",
                  textAlign: "center",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "2px solid rgba(212, 175, 55, 0.3)",
                  borderRadius: "12px",
                  width: "100%",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(212, 175, 55, 0.2)";
                  e.target.style.borderColor = "rgba(212, 175, 55, 0.6)";
                  e.target.style.color = "#ffd700";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.1)";
                  e.target.style.borderColor = "rgba(212, 175, 55, 0.3)";
                  e.target.style.color = "#ffffff";
                }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to=""
              onClick={() => handleNavClick(props.scrollToBookNow, "book")}
              style={{
                display: "block",
                padding: "16px 32px",
                color: "#000",
                textDecoration: "none",
                fontSize: "18px",
                fontWeight: "700",
                textAlign: "center",
                background: "linear-gradient(135deg, #ff9900 0%, #ffcc00 100%)",
                border: "none",
                borderRadius: "50px",
                width: "100%",
                transition: "all 0.3s ease",
                boxShadow: "0 0 20px rgba(255, 153, 0, 0.7)",
                marginTop: "1rem",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px) scale(1.05)";
                e.target.style.boxShadow = "0 10px 25px rgba(255, 153, 0, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0) scale(1)";
                e.target.style.boxShadow = "0 0 20px rgba(255, 153, 0, 0.7)";
              }}
            >
              Book Now
            </Link>
          </div>
        </div>
      )}

      <div
        className={`header__navbar ${scrolled ? "scrolled" : ""}`}
        ref={navbar}
      >
        <div className="navbar-inner-glow"></div>
        <div className="container d-flex align-items-center justify-content-between">
          <Link
            to="/"
            onClick={() => handleNavClick(props.scrollToHome, "home")}
            className="navbar-brand"
          >
            <div className="logo-container">
              <img
                src="https://img.freepik.com/premium-vector/hotel-logo-design_423075-16.jpg"
                alt="Website Logo"
                className="header__navbar__logo"
              />
              <div className="logo-glow"></div>
            </div>
            <span className="brand-text"> </span>
          </Link>

          <div className="d-flex align-items-center">
            {/* Desktop Menu - Visible only on large screens */}
            <ul className="header__navbar__links desktop-menu">
              {navItems.map((item) => (
                <li
                  key={item.name}
                  className="list-unstyled d-flex align-items-center justify-content-center"
                >
                  <Link
                    to={item.name === "home" ? "/" : ""}
                    className={`nav-link ${
                      activeItem === item.name ? "active" : ""
                    }`}
                    onClick={() => handleNavClick(item.scroll, item.name)}
                  >
                    <span className="nav-text">{item.label}</span>
                    <div className="nav-underline"></div>
                  </Link>
                </li>
              ))}
              {/* Book Now Button - Placed last as requested */}
              <li className="list-unstyled d-flex align-items-center justify-content-center">
                <Link
                  to=""
                  className="nav-link button btn-book"
                  onClick={() => handleNavClick(props.scrollToBookNow, "book")}
                >
                  <span className="btn-text">Book Now</span>
                  <div className="btn-shine"></div>
                  <div className="pulse-effect"></div>
                  <div className="sparkle">✨</div>
                  <div className="sparkle sparkle-2">✨</div>
                </Link>
              </li>
            </ul>

            {/* DEBUG: Force show mobile menu for testing */}
            {/* <div style={{ position: 'fixed', top: '10px', left: '10px', zIndex: 99999, background: 'red', color: 'white', padding: '10px' }}>
              Nav State: {state.navToggled ? 'OPEN' : 'CLOSED'}
              <button 
                onClick={() => {
                  console.log("Force toggle clicked");
                  dispatch({
                    type: actionTypes.TOGGLE_NAV,
                    navToggled: !state.navToggled,
                  });
                }}
                style={{ marginLeft: '10px', padding: '5px', background: 'white', color: 'black' }}
              >
                Force Toggle
              </button>
            </div> */}

            {/* Mobile Menu Backdrop */}
            {state.navToggled && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0, 0, 0, 0.8)",
                  zIndex: 9999,
                }}
                onClick={toggleNav}
              />
            )}

            {/* Mobile Menu - Simplified Version */}
            {state.navToggled && (
              <div
                className="mobile-menu-container"
                ref={mobileMenu}
                style={{
                  position: "fixed",
                  top: 0,
                  right: 0,
                  width: "300px",
                  height: "100vh",
                  background: "rgba(10, 10, 10, 0.98)",
                  zIndex: 10000,
                  display: "flex !important",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "2rem 1rem",
                  borderLeft: "1px solid rgba(212, 175, 55, 0.3)",
                  backdropFilter: "blur(30px)",
                  WebkitBackdropFilter: "blur(30px)",
                  visibility: "visible !important",
                  opacity: "1 !important",
                }}
              >
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                    width: "100%",
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {navItems.map((item) => (
                    <li key={item.name} style={{ width: "100%" }}>
                      <Link
                        to={item.name === "home" ? "/" : ""}
                        onClick={() => handleNavClick(item.scroll, item.name)}
                        style={{
                          display: "block",
                          padding: "16px 24px",
                          color: "#ffffff",
                          textDecoration: "none",
                          fontSize: "18px",
                          fontWeight: "600",
                          textAlign: "center",
                          background: "rgba(255, 255, 255, 0.1)",
                          border: "2px solid rgba(212, 175, 55, 0.3)",
                          borderRadius: "12px",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = "rgba(212, 175, 55, 0.2)";
                          e.target.style.borderColor =
                            "rgba(212, 175, 55, 0.6)";
                          e.target.style.color = "#ffd700";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background =
                            "rgba(255, 255, 255, 0.1)";
                          e.target.style.borderColor =
                            "rgba(212, 175, 55, 0.3)";
                          e.target.style.color = "#ffffff";
                        }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  {/* Book Now Button for Mobile */}
                  <li style={{ width: "100%", marginTop: "1rem" }}>
                    <Link
                      to=""
                      onClick={() =>
                        handleNavClick(props.scrollToBookNow, "book")
                      }
                      style={{
                        display: "block",
                        padding: "16px 32px",
                        color: "#000",
                        textDecoration: "none",
                        fontSize: "18px",
                        fontWeight: "700",
                        textAlign: "center",
                        background:
                          "linear-gradient(135deg, #ff9900 0%, #ffcc00 100%)",
                        border: "none",
                        borderRadius: "50px",
                        transition: "all 0.3s ease",
                        boxShadow: "0 0 20px rgba(255, 153, 0, 0.7)",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform =
                          "translateY(-3px) scale(1.05)";
                        e.target.style.boxShadow =
                          "0 10px 25px rgba(255, 153, 0, 0.6)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "translateY(0) scale(1)";
                        e.target.style.boxShadow =
                          "0 0 20px rgba(255, 153, 0, 0.7)";
                      }}
                    >
                      Book Now
                    </Link>
                  </li>
                </ul>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="burger"
              onClick={toggleNav}
              ref={burger}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              aria-controls="navigation-menu"
            >
              <div></div>
              <div></div>
              <div></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
