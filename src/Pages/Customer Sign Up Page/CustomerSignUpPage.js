import React from "react";
import "./../../Common Styling/loginSignup.css"
import customerlpImg from "./../../Assets/customerlp-img.png";
import { useNavigate } from "react-router-dom";
export default function CustomerSignUpPage() {
  const navigate = useNavigate();
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
            />
            <label for="customer-signup-email" className="input-label">
              Email
            </label>
            <input
              type="email"
              name="customer-signup-email"
              id="customer-signup-email"
              className="input-field"
            />
            <label for="cust-signup-number" className="input-label">
              Mobile Number
            </label>
            <input
              type="text"
              name="customer-signup-number"
              id="customer-signup-number"
              className="input-field"
            />
            <label for="cust-signup-pass" className="input-label">
              Password
            </label>
            <input
              type="password"
              name="customer-signup-pass"
              id="customer-signup-pass"
              className="input-field"
            />
            <button className="submit-btn customer-login-signup-btn">
              Sign Up
            </button>
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
