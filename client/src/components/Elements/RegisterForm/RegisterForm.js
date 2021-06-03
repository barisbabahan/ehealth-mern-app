import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthenticationContext } from "../../../context/UserContext";
import { TextField } from "@material-ui/core";
import register from "../../../api/register";
import "../HeroSection/HomeSection.css";
import "../../../util/CommonCss/CommonRouteSection.css";
import "./RegisterForm.css";
const RegisterForm = () => {
  const { isAuthenticate } = useContext(AuthenticationContext);
  const [useInformation, setUserinformation] = useState({
    username: "",
    email: "",
    password: "",
  });
  const history = useHistory();
  useEffect(() => {
    if (isAuthenticate) {
      history.push("/home");
    }
  }, [history, isAuthenticate]);

  const handleUserInformation = ({ target }) => {
    setUserinformation((prevVal) => {
      return { ...prevVal, [target.name]: target.value };
    });
  };

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      setUserinformation({
        username: "",
        email: "",
        password: "",
      });
      const { data } = await register(useInformation);
      if (data) {
        localStorage.setItem("token", data.token);
        history.push("/home");
        window.location.reload(false);
      }
    } catch (err) {
      setUserinformation({
        username: "",
        email: "",
        password: "",
      });
      console.log(err);
    }
  };

  return (
    <div className="register-root-container">
      <h3 className="register-title">Registiraion Form</h3>
      <form>
        <div className="register-input-element">
          <TextField
            id="standard-basic"
            label="Full Name"
            className="register-form-input"
            value={useInformation.username}
            name="username"
            type="text"
            autoComplete="true"
            placeholder="Enter Full name"
            onChange={(e) => handleUserInformation(e)}
          />
        </div>
        <div className="register-input-element">
          <TextField
            id="standard-basic"
            label="Emal"
            className="register-form-input"
            value={useInformation.email}
            type="email"
            name="email"
            autoComplete="true"
            placeholder="Enter E-mail"
            onChange={(e) => handleUserInformation(e)}
          />
        </div>
        <div className="register-input-element">
          <TextField
            id="standard-basic"
            label="Password"
            className="register-form-input"
            value={useInformation.password}
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={(e) => handleUserInformation(e)}
          />
        </div>
        <button
          type="submit"
          onClick={(e) => handleRegister(e)}
          className="hero-register-button"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
