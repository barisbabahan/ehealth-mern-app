import React, { useState, useContext, useEffect } from "react";

import {
  AuthenticationContext,
  UserRoleContext,
} from "../../../context/UserContext";
import getWindowDimensions from "../../../util/getWindowSize";
import { logout } from "../../../api/register";
import Logo from "../../../images/header/logo.png";
import Wave from "../../../images/header/wave.svg";
import BurgerMenu from "../../../images/header/burger-menu.png";
import { Link } from "react-scroll";
import "./Header.css";

const adminItems = [
  "add doctor",
  "view doctors",
  "view patients",
  "view feedbacks",
];
const authItems = ["profile", "view doctors", "chat"];
const doctorItems = ["profile", "view patients", "chat"];

const Header = () => {
  const { isAuthenticate } = useContext(AuthenticationContext);
  const [showMobileNavbar, setShowMobileNavbar] = useState(false);
  const { userRole } = useContext(UserRoleContext);
  const [navbarItems, setNavbarItems] = useState([
    "home",
    "aboutus",
    "services",
    "contactus",
  ]);
  const { width } = getWindowDimensions();

  useEffect(() => {
    if (isAuthenticate && userRole) {
      switch (userRole) {
        case "admin":
          setNavbarItems(adminItems);
          break;
        case "patient":
          setNavbarItems(authItems);
          break;
        case "doctor":
          setNavbarItems(doctorItems);
          break;
        default:
          return;
      }
    }
  }, [isAuthenticate, userRole]);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    localStorage.removeItem("token");
    window.location.reload();
    if (userRole === "doctor") {
      await logout({ token: token });
    }
  };

  const renderDekstop = () => {
    return (
      <React.Fragment>
        <div className="navbor-logo-container">
          <a href="/">
            <img src={Logo} alt="Ehealth Logo" className="header-logo-image" />
          </a>
        </div>
        <div className="navbar-section-links-container">
          {navbarItems.map((element, i) => {
            return !isAuthenticate ? (
              <Link
                activeClass="active"
                key={element}
                to={element}
                spy={true}
                smooth={true}
              >
                {element}
              </Link>
            ) : (
              <a href={`/${element.replace(/\s/g, "")}`} key={i}>
                {element}
              </a>
            );
          })}
          {!isAuthenticate && (
            <React.Fragment>
              <a href="/register" style={{ cursor: "pointer" }}>
                Register
              </a>
              <a href="/login" style={{ cursor: "pointer" }}>
                Login
              </a>
            </React.Fragment>
          )}
          {isAuthenticate && (
            <a
              href="/"
              style={{ cursor: "pointer" }}
              onClick={() => handleLogout()}
            >
              Logout
            </a>
          )}
        </div>
      </React.Fragment>
    );
  };

  const renderMobile = () => {
    return (
      <div className="mobile-navbar-container">
        <div
          onClick={() => setShowMobileNavbar(!showMobileNavbar)}
          className="burger-menu-container"
        >
          <img
            className="burger-menu-mobile"
            src={BurgerMenu}
            alt="navbar burger"
          />
        </div>
        <div className="navbor-logo-container mobile">
          <a href="/">
            <img src={Logo} alt="Ehealth Logo" className="header-logo-image" />
          </a>
        </div>
        {showMobileNavbar ? (
          <div className="navbar-section-links-container mobile">
            {navbarItems.map((element, i) => {
              return !isAuthenticate ? (
                <Link
                  activeClass="active"
                  key={element}
                  to={element}
                  spy={true}
                  smooth={true}
                >
                  {element}
                </Link>
              ) : (
                <a href={`/${element.replace(/\s/g, "")}`} key={i}>
                  {element}
                </a>
              );
            })}
            {!isAuthenticate && (
              <React.Fragment>
                <a href="/register" style={{ cursor: "pointer" }}>
                  Register
                </a>
                <a href="/login" style={{ cursor: "pointer" }}>
                  Login
                </a>
              </React.Fragment>
            )}
            {isAuthenticate && (
              <a
                href="/"
                style={{ cursor: "pointer" }}
                onClick={() => handleLogout()}
              >
                Logout
              </a>
            )}
          </div>
        ) : null}
      </div>
    );
  };
  return (
    <div className="navbar-container">
      {!isAuthenticate && width > 800 && (
        <img className="header-bg-image" src={Wave} alt="header items bg" />
      )}
      <div className="navbar-items-container">
        {width > 760 ? renderDekstop() : renderMobile()}
      </div>
    </div>
  );
};

export default Header;
