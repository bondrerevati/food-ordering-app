import React from "react";
import { useLocation } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import axios from "axios";
export default function ItemsList() {
  const { state } = useLocation();
  const handleCart = async (foodItem) => {
    try {
      axios
        .post(
          "https://food-ordering-app-backend-tdf7.onrender.com/cart/addtocart",
          { foodItem },
          {
            headers: {
              Authorization: localStorage.getItem("customerToken"),
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="carousel-div">
      {state.length &&
        state.map((foodItem) => {
          return (
            <div className="carousel-item">
              <div className="carousel-item-container">
                <img
                  className="carousel-food-item-image"
                  src={foodItem.imageUrl}
                  alt=""
                />
                <div className="carousel-food-item-details">
                  <h3 className="carousel-food-item-name">{foodItem.name}</h3>
                  <h4 className="carousel-food-item-price">
                    ₹ {foodItem.price}
                  </h4>
                  <h4><AddShoppingCartIcon
                  sx={{
                    color: "#93e410",
                  }}
                  className="carousel-food-item-icon"
                  onClick={() => handleCart(foodItem)}
                /></h4>
                </div>
                <p className="carousel-food-item-description">
                  {foodItem.description}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
}
