import React from "react";
import Doctor from "../../../images/hero/doctor.png";
import "./HomeSection.css";
const HomeSection = () => {
  return (
    <div className="home-section-container">
      <div className="home-section-content-container">
        <h2 className="hero-main-title">High level 7/24 service</h2>
        <h3 className="hero-sub-title">Experienced Specialists</h3>
        <a href="/register">
          <button className="hero-register-button">Register</button>
        </a>
      </div>
      <div className="home-section-hero-img-container">
        <img className="hero-image" src={Doctor} alt="doctor" />
      </div>
    </div>
  );
};

export default HomeSection;
