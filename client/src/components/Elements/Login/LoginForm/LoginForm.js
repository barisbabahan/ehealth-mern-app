import React, { useState, useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { AuthenticationContext } from "../../../../context/UserContext";
import { TextField } from "@material-ui/core";
import { login } from "../../../../api/register";
import "../../HeroSection/HomeSection.css";
import "./LoginForm.css";
const LoginForm = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const { isAuthenticate } = useContext(AuthenticationContext);
  const history = useHistory();
  const sendUserInformation = async (e) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      return;
    }
    try {
      const { data } = await login(user);
      if (data === undefined || !data.success) {
        setUser({ email: "", password: "" });
      } else {
        localStorage.setItem("token", data.token);
        history.push("/");
        window.location.reload();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return !isAuthenticate ? (
    <div className="login-form-container">
      <h3 className="login-title">Login</h3>
      <form>
        <div className="login-input-element">
          <TextField
            id="standard-basic"
            label="Email"
            value={user.email}
            className="login-form-input"
            type="email"
            placeholder="Enter E-mail"
            onChange={(e) =>
              setUser((prevVal) => {
                return { ...prevVal, email: e.target.value };
              })
            }
          />
        </div>
        <div className="login-input-element">
          <TextField
            id="standard-basic"
            label="Password"
            value={user.password}
            className="login-form-input"
            type="password"
            placeholder="Enter Password"
            onChange={(e) =>
              setUser((prevVal) => {
                return { ...prevVal, password: e.target.value };
              })
            }
          />
        </div>
        <button
          className="hero-register-button"
          type="submit"
          onClick={(e) => sendUserInformation(e)}
        >
          Login
        </button>
      </form>
    </div>
  ) : (
    <Redirect to="/home" />
  );
};

export default LoginForm;
