import React from "react";
import CardIcon from "../../../../images/services/card-icon.png";
import "./ServiceCard.css";
const ServiceCard = () => {
  return (
    <div className="service-card-root">
      <div className="service-card-top-container">
        <div className="service-card-icon">
          <img src={CardIcon} alt="card icon laptop" />
        </div>
        <div className="service-card-title">
          <h3>Online Service</h3>
        </div>
      </div>
      <hr className="service-card-line" />
      <div className="service-card-content">
        Maecenas rhoncus ullamcorper ipsum at eleifend. Suspendisse mattis dolor
        magna, sed vestibulum felis ultrices accumsan. Mauris quis dui dictum.
      </div>
    </div>
  );
};

export default ServiceCard;
