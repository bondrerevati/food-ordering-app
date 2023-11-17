import React, { useState } from "react";
import "./../../Common Styling/loginSignup.css";
import customerlpImg from "./../../Assets/customerlp-img.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function CustomerSignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [displayRule, setDisplayRule] = useState(false);
  const navigate = useNavigate();
  const handleNameChange = (e) => {
    if (e.target.value === "") setNameError("Name can't be empty");
    else {
      setNameError("");
      setName(e.target.value);
    }
  };
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
  const handleMobileNumberChange = (e) => {
    const regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    if (e.target.value === "")
      setMobileNumberError("Mobile number can't be empty");
    else if (!e.target.value.match(regex))
      setMobileNumberError("Mobile number is invalid");
    else if (e.target.value.match(regex)) {
      setMobileNumberError("");
      setMobileNumber(e.target.value);
    }
  };
  const handlePasswordChange = (e) => {
    const regex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;
    if (e.target.value === "") setPasswordError("Password can't be empty");
    else if (!e.target.value.match(regex))
      setPasswordError("Password should be in the given format");
    else if (e.target.value.match(regex)) {
      setPasswordError("");
      setPassword(e.target.value);
    }
  };
  const handleSubmit = async () => {
    setSignupError("");
    if (name === "") {
      setNameError("Name can't be empty");
    }
    if (email === "") {
      setEmailError("Email can't be empty");
    }
    if (mobileNumber === "") {
      setMobileNumberError("Mobile number can't be empty");
    }
    if (password === "") {
      setPasswordError("Password can't be empty");
    }
    if (
      nameError === "" &&
      emailError === "" &&
      mobileNumberError === "" &&
      passwordError === ""
    ) {
      axios
        .post("http://localhost:8080/customer/signup", {
          name,
          email,
          mobileNumber,
          password,
        })
        .then((response) => {
          if (
            response.status === 200 &&
            response.data.token === "customerExists"
          )
            setSignupError(response.data.message);
          else console.log(response.data.message);
        })
        .catch((error) => {
          if (error.response) setSignupError(error.response.data.message);
          else console.log(error.message);
        });
    }
  };
  return (
    <div className="login-signup-div">
      <div className="login-signup-div1">
        <div className="customer-login-signup-form-div">
          <h1 className="login-signup-heading">Customer Sign Up</h1>
          <div className="login-signup-form">
            <label for="customer-signup-name" className="input-label">
              Name
            </label>
            <input
              type="name"
              name="customer-signup-name"
              id="customer-signup-name"
              className="input-field"
              onChange={handleNameChange}
            />
            <p className="error">{nameError}</p>
            <label for="customer-signup-email" className="input-label">
              Email
            </label>
            <input
              type="email"
              name="customer-signup-email"
              id="customer-signup-email"
              className="input-field"
              onChange={handleEmailChange}
            />
            <p className="error">{emailError}</p>
            <label for="customer-signup-number" className="input-label">
              Mobile Number
            </label>
            <input
              type="text"
              name="customer-signup-number"
              id="customer-signup-number"
              className="input-field"
              onChange={handleMobileNumberChange}
            />
            <p className="error">{mobileNumberError}</p>
            <label for="customer-signup-pass" className="input-label">
              Password
            </label>
            <input
              type="password"
              name="customer-signup-pass"
              id="customer-signup-pass"
              className="input-field"
              onChange={handlePasswordChange}
              onFocus={() => setDisplayRule(true)}
              onBlur={() => setDisplayRule(false)}
            />
            <p className="error">{passwordError}</p>
            {displayRule && (
              <p className="password-rule">
                Password can be 8 to 16 characters long and should contain 1
                uppercase letter, 1 special character, and alphanumeric
                characters
              </p>
            )}
            <button
              className="submit-btn customer-login-signup-btn"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
            <p className="error">{signupError}</p>
            <p className="login-signup-question">
              Already have an account?{" "}
              <span
                className="login-signup-span"
                onClick={() => navigate("/customer/login")}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="login-signup-div2">
        <img className="login-signup-img" src={customerlpImg} />
      </div>
    </div>
  );
}
