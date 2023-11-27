import React, { useState } from "react";
import "./../../Common Styling/loginSignup.css";
import restaurantlpImg from "./../../Assets/restaurantlp-img.png";
import { useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import axios from "axios";
export default function RestaurantSignUpPage() {
  const [hidePassword, setHidePassword] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [openingTimeError, setOpeningTimeError] = useState("");
  const [closingTimeError, setClosingTimeError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [displayRule, setDisplayRule] = useState(false);
  const navigate = useNavigate();
  const handleClickShowPassword=()=>{
    setHidePassword(!hidePassword);
  }
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
  const handleAddressChange = (e) => {
    if (e.target.value === "") setAddressError("Address can't be empty");
    else {
      setAddressError("");
      setAddress(e.target.value);
    }
  };
  const handleOpeningTimeChange = (e) => {
    if (e.target.value === "") setOpeningTimeError("Opening time can't be empty");
    else {
      setOpeningTimeError("");
      setOpeningTime(e.target.value);
    }
  };
  const handleClosingTimeChange = (e) => {
    if (e.target.value === "") setClosingTimeError("Closing time can't be empty");
    else {
      setClosingTimeError("");
      setClosingTime(e.target.value);
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
    if (address === "") {
      setAddressError("Address can't be empty");
    }
    if (openingTime === "") {
      setOpeningTimeError("Opening time can't be empty");
    }
    if (closingTime === "") {
      setClosingTimeError("Closing time can't be empty");
    }
    if (password === "") {
      setPasswordError("Password can't be empty");
    }
    if (
      nameError === "" &&
      emailError === "" &&
      addressError === "" &&
      openingTimeError === "" &&
      closingTimeError === "" &&
      passwordError === ""
    ) {
      axios
        .post("http://localhost:8080/restaurant/signup", {
          name,
          email,
          address,
          openingTime,
          closingTime,
          password,
        })
        .then((response) => {
          if (
            response.status === 200 &&
            response.data.token === "restaurantExists"
          )
            setSignupError(response.data.message);
          else navigate("/restaurant/login")
        })
        .catch((error) => {
          if (error.response) setSignupError(error.response.data.message);
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
          <h1 className="login-signup-heading">Restaurant Sign Up</h1>
          <div className="login-signup-form">
            <label for="restaurant-signup-name" className="input-label">
              Restaurant Name
            </label>
            <input
              type="name"
              name="restaurant-signup-name"
              id="restaurant-signup-name"
              className="input-field"
              onChange={handleNameChange}
            />
            <p className="error">{nameError}</p>
            <label for="rest-signup-email" className="input-label">
              Restaurant Email
            </label>
            <input
              type="email"
              name="restaurant-signup-email"
              id="restaurant-signup-email"
              className="input-field"
              onChange={handleEmailChange}
            />
            <p className="error">{emailError}</p>
            <label for="rstaurant-signup-address" className="input-label">
              Restaurant Address
            </label>
            <textarea
              name="restaurant-signup-address"
              id="restaurant-signup-address"
              className="input-field"
              onChange={handleAddressChange}
            />
            <p className="error">{addressError}</p>
            <label for="retaurant-opening-time" className="input-label">
              Opening time
            </label>
            <input
              type="time"
              name="retaurant-opening-time"
              id="retaurant-opening-time"
              className="input-field"
              onChange={handleOpeningTimeChange}
            />
            <p className="error">{openingTimeError}</p>
            <label for="retaurant-closing-time" className="input-label">
              Closing time
            </label>
            <input
              type="time"
              name="retaurant-closing-time"
              id="retaurant-closing-time"
              className="input-field"
              onChange={handleClosingTimeChange}
            />
            <p className="error">{closingTimeError}</p>
            <label for="restaurant-signup-password" className="input-label">
              Password
            </label>
            <div className="password-input-box">
            <input
              type={hidePassword?"password":"text"}
              name="restaurant-signup-password"
              id="restaurant-signup-password"
              className="password-input-field"
              onChange={handlePasswordChange}
              onFocus={() => setDisplayRule(true)}
              onBlur={() => setDisplayRule(false)}
            />
            <div className="show-hide-password-box" onClick={handleClickShowPassword}>
                {hidePassword ? (
                  <VisibilityOutlinedIcon style={{ fontSize: "20px", color: "#5e5e5e" }} />
                ) : (
                  <VisibilityOffOutlinedIcon style={{ fontSize: "20px", color: "#5e5e5e" }} />
                )}
              </div>
            </div>
            <p className="error">{passwordError}</p>
            {displayRule && (
              <p className="password-rule">
                Password can be 8 to 16 characters long and should contain 1
                uppercase letter, 1 special character, and alphanumeric
                characters
              </p>
            )}
            <button className="submit-btn restaurant-login-signup-btn" onClick={handleSubmit}>
              Sign Up
            </button>
            <p className="error">{signupError}</p>
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
