import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { actionTypes } from "../../context/reducer";

import "./Navbar.css";

function Navbar(props) {
  const [state, dispatch] = useStateValue();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const handleNavClick = (scrollFunction) => {
    if (state.navToggled) {
      toggleNav();
    }
    if (scrollFunction) {
      scrollFunction();
    }
  };

  return (
    <div>
      <div
        className={`header__navbar shadow-sm d-flex align-items-center justify-content-center ${
          scrolled ? "scrolled" : ""
        }`}
        ref={navbar}
      >
        <div className="container d-flex align-items-center justify-content-between">
          <Link to="/" onClick={() => handleNavClick(props.scrollToHome)}>
            <img
              src="http://hruyan.com/assets/images/logo.png"
              alt="Hotel Logo"
              className="header__navbar__logo"
            />
          </Link>
          <div className="d-flex align-items-center justify-content-between">
            <ul className="header__navbar__links d-flex m-0" ref={mobileMenu}>
              <li className="list-unstyled d-flex align-items-center justify-content-center">
                <Link
                  to="/"
                  className="nav-link"
                  onClick={() => handleNavClick(props.scrollToHome)}
                >
                  Home
                </Link>
              </li>
              <li className="list-unstyled d-flex align-items-center justify-content-center">
                <Link
                  to=""
                  onClick={() => handleNavClick(props.scrollToGallery)}
                  className="nav-link"
                >
                  Gallery
                </Link>
              </li>
              <li className="list-unstyled d-flex align-items-center justify-content-center">
                <Link
                  to=""
                  onClick={() => handleNavClick(props.scrollToRooms)}
                  className="nav-link"
                >
                  Rooms
                </Link>
              </li>
              <li className="list-unstyled d-flex align-items-center justify-content-center">
                <Link
                  to=""
                  onClick={() => handleNavClick(props.scrollToAccommodations)}
                  className="nav-link"
                >
                  Accommodations
                </Link>
              </li>
              <li className="list-unstyled d-flex align-items-center justify-content-center">
                <Link
                  to=""
                  onClick={() => handleNavClick(props.scrollToAbout)}
                  className="nav-link"
                >
                  About Us
                </Link>
              </li>
              <li className="list-unstyled d-flex align-items-center justify-content-center">
                <Link
                  to=""
                  onClick={() => handleNavClick(props.scrollToContact)}
                  className="nav-link"
                >
                  Contact Us
                </Link>
              </li>
              <li className="list-unstyled d-flex align-items-center justify-content-center">
                <Link
                  to=""
                  onClick={() => handleNavClick(props.scrollToBookNow)}
                  className="nav-link button btn btn-primary"
                  style={{ color: "#fff" }}
                >
                  Book Now
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
