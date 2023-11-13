import React from "react";
import "./../../Common Styling/loginSignup.css"
import customerlpImg from "./../../Assets/customerlp-img.png";
import { useNavigate } from "react-router-dom";
export default function CustomerLoginPage() {
  const navigate = useNavigate();
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
            />
            <label for="customer-login-password" className="input-label">
              Password
            </label>
            <input
              type="password"
              name="customer-login-password"
              id="customer-login-password"
              className="input-field"
            />
            <button className="submit-btn customer-login-signup-btn">
              Sign in
            </button>
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
        <img className="login-signup-img" src={customerlpImg} />
      </div>
    </div>
  );
}
