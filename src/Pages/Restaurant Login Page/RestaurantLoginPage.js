import React from "react";
import "./../../Common Styling/loginSignup.css";
import restaurantlpImg from "./../../Assets/restaurantlp-img.png"
import { useNavigate } from "react-router-dom";
export default function RestaurantLoginPage() {
  const navigate = useNavigate();
  return (
    <div className="login-signup-div">
      <div className="login-signup-div2">
        <img className="login-signup-img" src={restaurantlpImg} />
      </div>
      <div className="login-signup-div1">
        <div className="restaurant-login-signup-form-div">
          <h1 className="login-signup-heading">Customer Login</h1>
          <div className="login-signup-form">
            <label for="restaurant-login-email" className="input-label">
              Restaurant Email
            </label>
            <input
              type="email"
              name="restaurant-login-email"
              id="restaurant-login-email"
              className="input-field"
            />
            <label for="restaurant-login-pass" className="input-label">
              Password
            </label>
            <input
              type="password"
              name="restaurant-login-pass"
              id="restaurant-login-pass"
              className="input-field"
            />
            <button className="submit-btn restaurant-login-signup-btn">
              Sign in
            </button>
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
