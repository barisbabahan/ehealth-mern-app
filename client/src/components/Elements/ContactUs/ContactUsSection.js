import React from "react";
import { TextField, TextareaAutosize } from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import "../HeroSection/HomeSection.css";
import "./ContactUsSection.css";
const ContactUsSection = () => {
  return (
    <div className="contactus-root-container">
      <h1 className="contactus-title section-title">Get In Touch</h1>
      <div className="form-container">
        <form className="form-items">
          <TextField label="Fullname" type="text" />
          <TextField label="Email" type="email" />
          <TextareaAutosize
            aria-label="minimum height"
            rowsMin={4}
            placeholder="Write your note"
          />
          <button style={{ width: 200 }} className="hero-register-button">
            Send
          </button>
        </form>
      </div>
      <h2 className="social-media-title">Fallow us on social media!</h2>
      <div className="social-media-icons-cotnainer">
        <FacebookIcon className="social-media-icon" />
        <InstagramIcon className="social-media-icon" />
        <LinkedInIcon className="social-media-icon" />
      </div>
    </div>
  );
};

export default ContactUsSection;
