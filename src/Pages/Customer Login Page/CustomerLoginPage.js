import React, { useState } from "react";
import "./../../Common Styling/loginSignup.css";
import customerlpImg from "./../../Assets/customerlp-img.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function CustomerLoginPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
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
    if (email === "") {
      setEmailError("Email can't be empty");
    }
    if (password === "") {
      setPasswordError("Password can't be empty");
    }
    if (emailError === "" && passwordError === "") {
      axios
        .post("http://localhost:8080/customer/login", { email, password })
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
      <div className="login-signup-div1">
        <div className="customer-login-signup-form-div">
          <h1 className="login-signup-heading">Customer Login</h1>
          <div className="login-signup-form">
            <label for="customer-login-email" className="input-label">
              Email
            </label>
            <input
              type="email"
              name="customer-login-email"
              id="customer-login-email"
              className="input-field"
              onChange={handleEmailChange}
            />
            <p className="error">{emailError}</p>
            <label for="customer-login-password" className="input-label">
              Password
            </label>
            <input
              type="password"
              name="customer-login-password"
              id="customer-login-password"
              className="input-field"
              onChange={handlePasswordChange}
            />
            <p className="error">{passwordError}</p>
            <button
              className="submit-btn customer-login-signup-btn"
              onClick={handleSubmit}
            >
              Sign in
            </button>
            <p className="error">{loginError}</p>
            <p className="login-signup-question">
              Don't have an account?{" "}
              <span
                className="login-signup-span"
                onClick={() => navigate("/customer/signup")}
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="login-signup-div2">
        <img className="login-signup-img" src={customerlpImg} alt="" />
      </div>
    </div>
  );
}
