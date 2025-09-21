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

  var mobileMenu = useRef();
  var navbar = useRef();
  var burger = useRef();

  function toggleNav() {
    const newToggleState = !state.navToggled;
    setIsMenuOpen(newToggleState);

    dispatch({
      type: actionTypes.TOGGLE_NAV,
      navToggled: newToggleState,
    });
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
      mobileMenu.current.classList.add("toggle-nav");
      burger.current.classList.add("active");
      document.body.style.overflow = "hidden";
    } else if (state.navToggled === false) {
      mobileMenu.current.classList.remove("toggle-nav");
      burger.current.classList.remove("active");
      document.body.style.overflow = "unset";
    }
  }, [state.navToggled]);

  const handleNavClick = (scrollFunction, itemName) => {
    if (state.navToggled) {
      toggleNav();
    }
    if (scrollFunction) {
      scrollFunction();
    }
    if (itemName) {
      setActiveItem(itemName);
    }
  };

  return (
    <div>
      <div className="navbar-backdrop"></div>
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
                alt=""
                className="header__navbar__logo"
              />
              <div className="logo-glow"></div>
            </div>
            <span className="brand-text"> </span>
          </Link>
          <div className="d-flex align-items-center justify-content-between">
            <ul className="header__navbar__links d-flex m-0" ref={mobileMenu}>
              <li className="list-unstyled d-flex align-items-center justify-content-center">
                <Link
                  to="/"
                  className={`nav-link ${
                    activeItem === "home" ? "active" : ""
                  }`}
                  onClick={() => handleNavClick(props.scrollToHome, "home")}
                >
                  <span className="nav-text">Home</span>
                  <div className="nav-underline"></div>
                </Link>
              </li>
              <li className="list-unstyled d-flex align-items-center justify-content-center">
                <Link
                  to=""
                  className={`nav-link ${
                    activeItem === "gallery" ? "active" : ""
                  }`}
                  onClick={() =>
                    handleNavClick(props.scrollToGallery, "gallery")
                  }
                >
                  <span className="nav-text">Gallery</span>
                  <div className="nav-underline"></div>
                </Link>
              </li>
              <li className="list-unstyled d-flex align-items-center justify-content-center">
                <Link
                  to=""
                  className={`nav-link ${
                    activeItem === "rooms" ? "active" : ""
                  }`}
                  onClick={() => handleNavClick(props.scrollToRooms, "rooms")}
                >
                  <span className="nav-text">Rooms</span>
                  <div className="nav-underline"></div>
                </Link>
              </li>
              <li className="list-unstyled d-flex align-items-center justify-content-center">
                <Link
                  to=""
                  className={`nav-link ${
                    activeItem === "accommodations" ? "active" : ""
                  }`}
                  onClick={() =>
                    handleNavClick(
                      props.scrollToAccommodations,
                      "accommodations"
                    )
                  }
                >
                  <span className="nav-text">Accommodations</span>
                  <div className="nav-underline"></div>
                </Link>
              </li>
              <li className="list-unstyled d-flex align-items-center justify-content-center">
                <Link
                  to=""
                  className={`nav-link ${
                    activeItem === "about" ? "active" : ""
                  }`}
                  onClick={() => handleNavClick(props.scrollToAbout, "about")}
                >
                  <span className="nav-text">About Us</span>
                  <div className="nav-underline"></div>
                </Link>
              </li>
              <li className="list-unstyled d-flex align-items-center justify-content-center">
                <Link
                  to=""
                  className={`nav-link ${
                    activeItem === "contact" ? "active" : ""
                  }`}
                  onClick={() =>
                    handleNavClick(props.scrollToContact, "contact")
                  }
                >
                  <span className="nav-text">Contact Us</span>
                  <div className="nav-underline"></div>
                </Link>
              </li>
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
            <button
              className="burger"
              onClick={toggleNav}
              ref={burger}
              aria-label="Toggle menu"
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
