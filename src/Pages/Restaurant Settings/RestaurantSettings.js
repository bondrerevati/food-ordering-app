import React, { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import "./../../Common Styling/AddEdit.css";
import axios from "axios";

export default function RestaurantSettings() {
  const restaurantToken = localStorage.getItem("restaurantToken");
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const getRestaurantDetails = async () => {
    try {
      axios
        .get("http://localhost:8080/restaurant/restaurant_details", {
          headers: {
            Authorization: restaurantToken,
          },
        })
        .then((response) => {
          setRestaurantDetails(decodeToken(response.data.token));
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getRestaurantDetails();
  }, [restaurantDetails]);
  const [hidePassword, setHidePassword] = useState(true);
  const [name, setName] = useState(restaurantDetails.name);
  const [email, setEmail] = useState(restaurantDetails.email);
  const [address, setAddress] = useState(restaurantDetails.address);
  const [openingTime, setOpeningTime] = useState(restaurantDetails.openingTime);
  const [closingTime, setClosingTime] = useState(restaurantDetails.closingTime);
  const [password, setPassword] = useState(restaurantDetails.password);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [openingTimeError, setOpeningTimeError] = useState("");
  const [closingTimeError, setClosingTimeError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [settingsError, setSettingsError] = useState("");
  const [displayRule, setDisplayRule] = useState(false);
  const handleClickShowPassword = () => {
    setHidePassword(!hidePassword);
  };
  const handleNameChange = (e) => {
    if (e.target.value === "") setNameError("Name can't be empty");
    else {
      setNameError("");
      setName(e.target.value);
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
    if (e.target.value === "")
      setOpeningTimeError("Opening time can't be empty");
    else {
      setOpeningTimeError("");
      setOpeningTime(e.target.value);
    }
  };
  const handleClosingTimeChange = (e) => {
    if (e.target.value === "")
      setClosingTimeError("Closing time can't be empty");
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
    setSettingsError("");
    if (name === "") {
      setNameError("Name can't be empty");
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
      addressError === "" &&
      openingTimeError === "" &&
      closingTimeError === "" &&
      passwordError === ""
    ) {
      axios
        .put(
          "http://localhost:8080/restaurant/update",
          {
            name,
            email,
            address,
            openingTime,
            closingTime,
            password,
          },
          {
            headers: {
              Authorization: restaurantToken,
            },
          }
        )
        .then((response) => {
          console.log(response.data.message);
          localStorage.removeItem("restaurantToken");
          localStorage.setItem("restaurantToken", response.data.token);
          window.location.reload();
        })
        .catch((error) => {
          if (error.response) setSettingsError(error.response.data.message);
          else console.log(error.message);
        });
    }
  };
  return (
    <div className="settings-div">
      <div className="add-edit-form-div">
        <h1 className="add-edit-form-heading">Restaurant Settings</h1>
        <div className="add-edit-form-inner-div">
          <label
            for="restaurant-settings-name"
            className="add-edit-input-label"
          >
            Restaurant Name
          </label>
          <input
            type="name"
            name="restaurant-settings-name"
            id="restaurant-settings-name"
            className="add-edit-input-field"
            onChange={handleNameChange}
            defaultValue={restaurantDetails.name}
          />
          <p className="error">{nameError}</p>
          <label
            for="restaurant-settings-email"
            className="add-edit-input-label"
          >
            Restaurant Email
          </label>
          <input
            type="email"
            name="restaurant-settings-email"
            id="restaurant-settings-email"
            className="add-edit-input-field"
            value={restaurantDetails.email}
            readOnly
          />
          <p className="error">{emailError}</p>
          <label
            for="restaurant-settings-address"
            className="add-edit-input-label"
          >
            Restaurant Address
          </label>
          <textarea
            name="restaurant-settings-address"
            id="restaurant-settings-address"
            className="add-edit-input-field"
            onChange={handleAddressChange}
            defaultValue={restaurantDetails.address}
          />
          <p className="error">{addressError}</p>
          <label for="retaurant-opening-time" className="add-edit-input-label">
            Opening time
          </label>
          <input
            type="time"
            name="retaurant-settings-opening-time"
            id="retaurant-settings-opening-time"
            className="add-edit-input-field"
            onChange={handleOpeningTimeChange}
            defaultValue={restaurantDetails.openingTime}
          />
          <p className="error">{openingTimeError}</p>
          <label for="retaurant-closing-time" className="add-edit-input-label">
            Closing time
          </label>
          <input
            type="time"
            name="retaurant-settings-closing-time"
            id="retaurant-settings-closing-time"
            className="add-edit-input-field"
            onChange={handleClosingTimeChange}
            defaultValue={restaurantDetails.closingTime}
          />
          <p className="error">{closingTimeError}</p>
          <label
            for="restaurant-settings-password"
            className="add-edit-input-label"
          >
            Password
          </label>
          <div className="password-input-box">
            <input
              type={hidePassword ? "password" : "text"}
              name="restaurant-settings-pass"
              id="restaurant-settings-pass"
              className="password-input-field"
              onChange={handlePasswordChange}
              onFocus={() => setDisplayRule(true)}
              onBlur={() => setDisplayRule(false)}
              defaultValue={restaurantDetails.password}
            />
            <div
              className="show-hide-password-box"
              onClick={handleClickShowPassword}
            >
              {hidePassword ? (
                <VisibilityOutlinedIcon
                  style={{ fontSize: "20px", color: "#5e5e5e" }}
                />
              ) : (
                <VisibilityOffOutlinedIcon
                  style={{ fontSize: "20px", color: "#5e5e5e" }}
                />
              )}
            </div>
          </div>
          <p className="error">{passwordError}</p>
          {displayRule && (
            <p className="password-rule">
              Password can be 8 to 16 characters long and should contain 1
              uppercase letter, 1 special character, and alphanumeric characters
            </p>
          )}
          <button className="add-edit-submit-button" onClick={handleSubmit}>
            Update
          </button>
          <p className="error">{settingsError}</p>
        </div>
      </div>
    </div>
  );
}
