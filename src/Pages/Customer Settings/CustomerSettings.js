import React, { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import "./../../Common Styling/AddEdit.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CustomerSettings() {
  const customerToken = localStorage.getItem("customerToken");
  const [customerDetails, setCustomerDetails] = useState({});
  const getCustomerDetails = async () => {
    try {
      axios
        .get("http://localhost:8080/customer/customer_details", {
          headers: {
            Authorization: customerToken,
          },
        })
        .then((response) => {
          setCustomerDetails(decodeToken(response.data.token));
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getCustomerDetails();
  }, [customerDetails]);
  const [hidePassword, setHidePassword] = useState(true);
  const [name, setName] = useState(customerDetails.name);
  const [email, setEmail] = useState(customerDetails.email);
  const [mobileNumber, setMobileNumber] = useState(customerDetails.mobileNo);
  const [password, setPassword] = useState(customerDetails.password);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [settingsError, setSettingsError] = useState("");
  const [displayRule, setDisplayRule] = useState(false);
  const navigate = useNavigate();
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
    setSettingsError("");
    if (name === "") {
      setNameError("Name can't be empty");
    }
    if (mobileNumber === "") {
      setMobileNumberError("Mobile number can't be empty");
    }
    if (password === "") {
      setPasswordError("Password can't be empty");
    }
    if (nameError === "" && mobileNumberError === "" && passwordError === "") {
      axios
        .put(
          "http://localhost:8080/customer/update",
          {
            name,
            email,
            mobileNumber,
            password,
          },
          {
            headers: {
              Authorization: customerToken,
            },
          }
        )
        .then((response) => {
          console.log(response.data.message);
          localStorage.removeItem("customerToken");
          localStorage.setItem("customerToken", response.data.token);
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
        <h1 className="add-edit-form-heading">Customer Settings</h1>
        <div className="add-edit-form-inner-div">
          <label for="customer-settings-name" className="add-edit-input-label">
            Name
          </label>
          <input
            type="name"
            name="customer-settings-name"
            id="customer-settings-name"
            className="add-edit-input-field"
            onChange={handleNameChange}
            defaultValue={customerDetails.name}
          />
          <p className="error">{nameError}</p>
          <label for="customer-settings-email" className="add-edit-input-label">
            Email
          </label>
          <input
            type="email"
            name="customer-settings-email"
            id="customer-settings-email"
            className="add-edit-input-field"
            value={customerDetails.email}
            readOnly
          />
          <p className="error">{emailError}</p>
          <label
            for="customer-settings-number"
            className="add-edit-input-label"
          >
            Mobile Number
          </label>
          <input
            type="text"
            name="customer-settings-number"
            id="customer-settings-number"
            className="add-edit-input-field"
            onChange={handleMobileNumberChange}
            defaultValue={customerDetails.mobileNo}
          />
          <p className="error">{mobileNumberError}</p>
          <label for="customer-settings-pass" className="add-edit-input-label">
            Password
          </label>
          <div className="password-input-box">
            <input
              type={hidePassword ? "password" : "text"}
              name="customer-settings-pass"
              id="customer-settings-pass"
              className="password-input-field"
              onChange={handlePasswordChange}
              onFocus={() => setDisplayRule(true)}
              onBlur={() => setDisplayRule(false)}
              defaultValue={customerDetails.password}
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
