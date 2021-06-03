import React from "react";
import BestDoctorImg from "../../../images/bestdoctors/best-doctor.jpeg";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import "./BestDoctorSection.css";

const doctors = [
  "Metehan Ersoy",
  "Cemal Göymen",
  "Olcay Aykut",
  "Barış Babahan",
];

const BestDoctorCard = ({ name }) => {
  return (
    <div className="card-container">
      <div className="card-circle-image">
        <img
          className="best-doctor-image"
          src={BestDoctorImg}
          alt="best doctor"
        />
      </div>
      <h1 className="best-doctor-name">{name}</h1>
      <div className="best-doctor-rate">
        <p>5</p>
        <StarOutlineIcon />
      </div>
    </div>
  );
};

const BestDoctorSection = () => {
  return (
    <div className="best-doctor-root-container">
      <div className="best-doctor-title-container">
        <h1 className="section-title best-doctor-title">The Best Doctors</h1>
      </div>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div className="best-doctor-cards-container">
          {doctors.map((doctor, i) => (
            <BestDoctorCard key={i} name={doctor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestDoctorSection;
