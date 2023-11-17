import React, { useState } from "react";
import "./../../Common Styling/loginSignup.css";
import restaurantlpImg from "./../../Assets/restaurantlp-img.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function RestaurantLoginPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (e.target.value === "") setEmailError("Email can't be empty");
    else if (!e.target.value.match(regex)) setEmailError("Email is invalid");
    else if (e.target.value.match(regex)) {
      setEmailError("");
      setEmail(e.target.value);
    }
  };
  const handlePasswordChange = (e) => {
    if (e.target.value === "") setPasswordError("Password can't be empty");
    else {
      setPasswordError("");
      setPassword(e.target.value);
    }
  };
  const handleSubmit = async () => {
    setLoginError("");
    if (email === "") {
      setEmailError("Email can't be empty");
    }
    if (password === "") {
      setPasswordError("Password can't be empty");
    }
    if (emailError === "" && passwordError === "") {
      axios
        .post("http://localhost:8080/restaurant/login", { email, password })
        .then((response) => {
          console.log(response.data.message);
        })
        .catch((error) => {
          if (error.response) setLoginError(error.response.data.message);
          else console.log(error.message);
        });
    }
  };
  return (
    <div className="login-signup-div">
      <div className="login-signup-div2">
        <img className="login-signup-img" src={restaurantlpImg} />
      </div>
      <div className="login-signup-div1">
        <div className="restaurant-login-signup-form-div">
          <h1 className="login-signup-heading">Restaurant Login</h1>
          <div className="login-signup-form">
            <label for="restaurant-login-email" className="input-label">
              Restaurant Email
            </label>
            <input
              type="email"
              name="restaurant-login-email"
              id="restaurant-login-email"
              className="input-field"
              onChange={handleEmailChange}
            />
            <p className="error">{emailError}</p>
            <label for="restaurant-login-pass" className="input-label">
              Password
            </label>
            <input
              type="password"
              name="restaurant-login-pass"
              id="restaurant-login-pass"
              className="input-field"
              onChange={handlePasswordChange}
            />
            <p className="error">{passwordError}</p>
            <button
              className="submit-btn restaurant-login-signup-btn"
              onClick={handleSubmit}
            >
              Sign in
            </button>
            <p className="error">{loginError}</p>
            <p className="login-signup-question">
              Don't have an account?{" "}
              <span
                className="login-signup-span"
                onClick={() => navigate("/restaurant/signup")}
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
