import React from "react";
import Doctor from "../../../images/aboutus/doctor-aboutus.svg";
import "./AboutUsSection.css";
const AboutUsSection = () => {
  return (
    <div className="about-us-section-container">
      <div className="aboutus-img-container">
        <img
          src={Doctor}
          alt="doctor illustrator"
          className="aboutus-doctor-illustrator"
        />
      </div>
      <div className="aboutus-content-container">
        <div>
          <h1 className="section-title">About Us</h1>
        </div>
        <div className="section-content">
          Mauris eget magna ligula. Fusce nec dictum arcu, et feugiat magna.
          Etiam augue elit, aliquam sit amet pharetra ac, pretium quis arcu. Sed
          dolor augue, luctus quis quam vel, lobortis auctor nisi. Nam nec
          sodales est, a eleifend justo. Curabitur dapibus porttitor tortor,
          consequat vehicula mi fermentum vel. Donec egestas elit nisi, quis
          molestie ante blandit sit amet. Integer at turpis at diam porttitor
          rutrum non a quam. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus. Suspendisse lacinia gravida
          eleifend. Vivamus a laoreet enim. Aenean in nunc odio. Quisque
          ultricies arcu tristique, aliquam ante consectetur, mattis mi.
          Maecenas rhoncus ullamcorper ipsum at eleifend. Suspendisse mattis
          dolor magna, sed vestibulum felis ultrices accumsan. Mauris quis dui
          dictum.
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;
