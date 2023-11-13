import React from "react";
import "./../../Common Styling/loginSignup.css";
import restaurantlpImg from "./../../Assets/restaurantlp-img.png"
import { useNavigate } from "react-router-dom";
export default function RestaurantSignUpPage() {
  const navigate = useNavigate();
  return (
    <div className="login-signup-div">
      <div className="login-signup-div2">
        <img className="login-signup-img" src={restaurantlpImg} />
      </div>
      <div className="login-signup-div1">
        <div className="restaurant-login-signup-form-div">
          <h1 className="login-signup-heading">Customer Sign Up</h1>
          <div className="login-signup-form">
            <label for="restaurant-signup-name" className="input-label">
              Restaurant Name
            </label>
            <input
              type="name"
              name="restaurant-signup-name"
              id="restaurant-signup-name"
              className="input-field"
            />
            <label for="rest-signup-email" className="input-label">
              Restaurant Email
            </label>
            <input
              type="email"
              name="restaurant-signup-email"
              id="restaurant-signup-email"
              className="input-field"
            />
            <label for="rstaurant-signup-address" className="input-label">
              Restaurant Address
            </label>
            <input
              type="text"
              name="restaurant-signup-address"
              id="restaurant-signup-address"
              className="input-field"
            />
            <label for="retaurant-opening-time" className="input-label">
              Opening time
            </label>
            <input
              type="time"
              name="retaurant-opening-time"
              id="retaurant-opening-time"
              className="input-field"
            />
            <label for="retaurant-closing-time" className="input-label">
              Closing time
            </label>
            <input
              type="time"
              name="retaurant-closing-time"
              id="retaurant-closing-time"
              className="input-field"
            />
            <label for="restaurant-signup-password" className="input-label">
              Password
            </label>
            <input
              type="password"
              name="restaurant-signup-password"
              id="restaurant-signup-password"
              className="input-field"
            />
            <button className="submit-btn restaurant-login-signup-btn">
              Sign Up
            </button>
            <p className="login-signup-question">
              Already have an account?{" "}
              <span
                className="login-signup-span"
                onClick={() => navigate("/restaurant/login")}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
