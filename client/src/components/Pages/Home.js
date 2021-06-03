import React from "react";
import AboutUsSection from "../Elements/AboutUsSection/AboutUsSection";
import HeroSection from "./HeroSection";
import OurServices from "./OurServices";
import FeedBack from "./FeedBack";
import BestDoctor from "./BestDoctor";
import ContactUs from "./ContactUs";
import { Element } from "react-scroll";

import "../../util/CommonCss/CommonRouteSection.css";
const Home = () => {
  return (
    <div className="sections-max-width">
      <Element name="home">
        <HeroSection />
      </Element>
      <Element name="aboutus">
        <AboutUsSection />
      </Element>
      <Element name="services">
        <OurServices />
      </Element>
      <Element name="feedbacks">
        <FeedBack />
      </Element>
      <Element name="doctors">
        <BestDoctor />
      </Element>
      <Element name="contactus">
        <ContactUs />
      </Element>
    </div>
  );
};

export default Home;
