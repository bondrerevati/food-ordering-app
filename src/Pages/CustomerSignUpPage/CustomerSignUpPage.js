import React from "react";
import "./../../Common Styling/customer.css";
import loginPageImg from "./../../Assets/loginPage-img.png";
import { useNavigate } from "react-router-dom";
export default function CustomerSignUpPage() {
  const navigate = useNavigate();
  return (
    <div className="customer-login-signup-div">
      <div className="customer-login-signup-div1">
        <div className="customer-login-signup-form-div">
          <h1 className="customer-login-signup-heading">Customer Sign Up</h1>
          <div className="customer-login-signup-form">
            <label for="cust-signup-name" className="input-label">
              Name
            </label>
            <input
              type="name"
              name="cust-signup-name"
              className="input-field"
            />
            <label for="cust-signup-email" className="input-label">
              Email
            </label>
            <input
              type="email"
              name="cust-signup-email"
              className="input-field"
            />
            <label for="cust-signup-number" className="input-label">
              Mobile Number
            </label>
            <input
              type="text"
              name="cust-signup-number"
              className="input-field"
            />
            <label for="cust-signup-pass" className="input-label">
              Password
            </label>
            <input
              type="password"
              name="cust-signup-pass"
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
      <div className="customer-login-signup-div2">
        <img className="customer-login-signup-img" src={loginPageImg} />
      </div>
    </div>
  );
}
