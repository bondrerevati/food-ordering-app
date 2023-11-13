import React from "react";
import "./../../Common Styling/customer.css";
import loginPageImg from "./../../Assets/loginPage-img.png";
import { useNavigate } from "react-router-dom";
export default function CustomerLoginPage() {
  const navigate = useNavigate();
  return (
    <div className="customer-login-signup-div">
      <div className="customer-login-signup-div1">
        <div className="customer-login-signup-form-div">
          <h1 className="customer-login-signup-heading">Customer Login</h1>
          <div className="customer-login-signup-form">
            <label for="cust-login-email" className="input-label">
              Email
            </label>
            <input
              type="email"
              name="cust-login-email"
              className="input-field"
            />
            <label for="cust-login-pass" className="input-label">
              Password
            </label>
            <input
              type="password"
              name="cust-login-pass"
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
      <div className="customer-login-signup-div2">
        <img className="customer-login-signup-img" src={loginPageImg} />
      </div>
    </div>
  );
}
