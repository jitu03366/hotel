import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { actionTypes } from "../../context/reducer";
import "./Navbar.css";

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
    } else {
      document.body.classList.remove("body-no-scroll");
      if (backdrop.current) {
        backdrop.current.classList.remove("active");
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
    if (state.navToggled === true) {
      mobileMenu.current.classList.add("active");
      burger.current.classList.add("active");
    } else if (state.navToggled === false) {
      mobileMenu.current.classList.remove("active");
      burger.current.classList.remove("active");
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

  return (
    <div>
      <div className="navbar-backdrop"></div>

      {/* Mobile Menu Backdrop */}
      <div
        className="mobile-menu-backdrop"
        ref={backdrop}
        onClick={handleBackdropClick}
      ></div>

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
                src="http://hruyan.com/assets/images/logo.png"
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

            {/* Mobile Menu - Hidden by default, shown when toggled */}
            <div className="mobile-menu-container" ref={mobileMenu}>
              <ul className="mobile-menu-links">
                {navItems.map((item) => (
                  <li key={item.name} className="mobile-menu-item">
                    <Link
                      to={item.name === "home" ? "/" : ""}
                      className={`mobile-nav-link ${
                        activeItem === item.name ? "active" : ""
                      }`}
                      onClick={() => handleNavClick(item.scroll, item.name)}
                    >
                      <span className="mobile-nav-text">{item.label}</span>
                      <div className="mobile-nav-underline"></div>
                    </Link>
                  </li>
                ))}
                {/* Book Now Button for Mobile */}
                <li className="mobile-menu-item">
                  <Link
                    to=""
                    className="mobile-nav-link button mobile-btn-book"
                    onClick={() =>
                      handleNavClick(props.scrollToBookNow, "book")
                    }
                  >
                    <span className="mobile-btn-text">Book Now</span>
                    <div className="btn-shine"></div>
                    <div className="pulse-effect"></div>
                  </Link>
                </li>
              </ul>
            </div>

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
