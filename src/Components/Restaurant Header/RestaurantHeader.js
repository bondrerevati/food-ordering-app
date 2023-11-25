import React, { useEffect, useState } from "react";
import "./restaurantHeader.css";
import { useNavigate } from "react-router-dom";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import { decodeToken } from "react-jwt";
export default function RestaurantHeader() {
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
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("restaurantToken");
    navigate("/");
  };
  return (
    <div>
      <header>
        <div className="header-left-side">
          <div>
            <RestaurantMenuIcon
              sx={{ height: "40px", width: "40px", color: "#93e410" }}
            />
          </div>
          <div>
            <h1 className="header-heading">{restaurantDetails.name}</h1>
          </div>
        </div>
        <div className="header-right-side">
          <div>
            <AccountCircleIcon
              sx={{ height: "40px", width: "40px", color: "#93e410", cursor:"pointer" }}
              onClick={()=>navigate("/restaurant/settings")}
            />
          </div>
          <div className="user-profile-card" onClick={handleLogout}>
            <p>Logout</p>
          </div>
        </div>
      </header>
    </div>
  );
}
