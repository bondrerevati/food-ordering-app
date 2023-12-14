import axios from "axios";
import React, { useEffect, useState } from "react";
import "./restaurantList.css";
import { useNavigate } from "react-router-dom";
export default function RestaurantList() {
  const [restaurantsList, setRestaurantsList] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  const navigate = useNavigate();
  const getRestaurantsList = async () => {
    try {
      axios
        .get("https://food-ordering-app-backend-tdf7.onrender.com/restaurant/getrestaurants", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setRestaurantsList(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getRestaurantsList();
  }, []);
  const handleExploreClick = async (restaurant) => {
    try {
      axios
        .post("https://food-ordering-app-backend-tdf7.onrender.com/item/getitemsbyrid", {
          restaurant,
        })
        .then((response) => {
          setItemsList(response.data);
          navigate("/customer/restaurant/itemslist", { state: response.data });
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="restaurants-list-container">
      <div className="restaurants-list-inner-container">
        {restaurantsList.length > 0 &&
          restaurantsList.map((restaurants) => {
            return (
              <div className="restaurant-list-individual-div">
                <div className="restaurant-list-inner-div1">
                  <div>
                    <h4 className="restaurant-list-name">{restaurants.name}</h4>
                    <p className="restaurant-list-address">
                      {restaurants.address}
                    </p>
                  </div>
                  <div>
                    <p className="restaurant-list-time">
                      {restaurants.openingTime} - {restaurants.closingTime}
                    </p>
                  </div>
                </div>
                <div className="restaurant-list-inner-div2">
                  <button
                    className="restaurant-list-btn"
                    onClick={() => { setItemsList(restaurants)
                      handleExploreClick(restaurants)}}
                  >
                    Explore Menu
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
