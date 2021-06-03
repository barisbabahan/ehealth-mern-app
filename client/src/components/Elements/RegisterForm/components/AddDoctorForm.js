import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { addDoctor } from "../../../../api/doctor";
import "../../HeroSection/HomeSection.css";
import "./AddDoctorForm.css";
const AddDoctorForm = () => {
  const [doctorInformations, setDoctorInformations] = useState({
    username: "",
    email: "",
    password: "",
    role: "doctor",
    qualifications: "",
    expertise: "",
    mobileno: "",
  });
  const [isDoctorAdded, setIsDoctorAdded] = useState(false);

  const handleDoctorAddition = ({ target }) => {
    setDoctorInformations((prevVal) => {
      return { ...prevVal, [target.name]: target.value };
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDoctorAdded(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isDoctorAdded, setIsDoctorAdded]);

  const registerDoctor = async (e) => {
    try {
      e.preventDefault();
      setDoctorInformations({
        username: "",
        email: "",
        password: "",
        role: "doctor",
        qualifications: "",
        expertise: "",
        mobileno: "",
      });
      const { data } = await addDoctor(doctorInformations);
      setIsDoctorAdded(data.success);
    } catch (err) {
      setDoctorInformations({
        username: "",
        email: "",
        password: "",
        role: "doctor",
        qualifications: "",
        expertise: "",
        mobileno: "",
      });
      console.log(err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
      className="add-doctor-form-container"
    >
      <h1 className="add-doctor-title">Add doctor</h1>
      {isDoctorAdded && (
        <h2 className="doctor-added-title">Doctor successfully added</h2>
      )}
      <form
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div className="add-doctor-input-element">
          <TextField
            id="standard-basic"
            label="Doctor Full Name"
            className="register-form-input"
            value={doctorInformations.username}
            name="username"
            type="text"
            autoComplete="true"
            placeholder="Enter
          Full name"
            onChange={(e) => handleDoctorAddition(e)}
          />
        </div>
        <div className="add-doctor-input-element">
          <TextField
            id="standard-basic"
            label="Doctor Email"
            className="register-form-input"
            value={doctorInformations.email}
            type="email"
            name="email"
            autoComplete="true"
            placeholder="Enter E-mail"
            onChange={(e) => handleDoctorAddition(e)}
          />
        </div>
        <div className="add-doctor-input-element">
          <TextField
            id="standard-basic"
            label="Doctor Qualifications"
            className="register-form-input"
            value={doctorInformations.qualifications}
            name="qualifications"
            type="text"
            autoComplete="true"
            placeholder="Enter qualifications"
            onChange={(e) => handleDoctorAddition(e)}
          />
        </div>
        <div className="add-doctor-input-element">
          <TextField
            id="standard-basic"
            label="Doctor Expertise"
            className="register-form-input"
            value={doctorInformations.expertise}
            name="expertise"
            type="text"
            autoComplete="true"
            placeholder="Enter expertise"
            onChange={(e) => handleDoctorAddition(e)}
          />
        </div>
        <div className="add-doctor-input-element">
          <TextField
            id="standard-basic"
            label="Doctor Mobile Number"
            className="register-form-input"
            value={doctorInformations.mobileno}
            name="mobileno"
            type="string"
            autoComplete="true"
            placeholder="Enter mobileno"
            onChange={(e) => handleDoctorAddition(e)}
          />
        </div>
        <div className="add-doctor-input-element">
          <TextField
            id="standard-basic"
            label="Doctor Password"
            className="register-form-input"
            value={doctorInformations.password}
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={(e) => handleDoctorAddition(e)}
          />
        </div>
        <button
          className="hero-register-button"
          type="submit"
          onClick={(e) => registerDoctor(e)}
        >
          Add Doctor
        </button>
      </form>
    </div>
  );
};

export default AddDoctorForm;
