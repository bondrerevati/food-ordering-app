import React, { useEffect, useState } from "react";
import "./carousel.css";
import axios from "axios";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
export default function Carousel() {
  const [foodItemList, setFoodItemList] = useState([]);
  const getFoodItemList = async () => {
    try {
      axios
        .get("http://localhost:8080/item/getitems", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setFoodItemList(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getFoodItemList();
  }, []);
  const handleCart = async (foodItem) => {
    try {
      axios
        .post(
          "http://localhost:8080/cart/addtocart",
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
      {foodItemList.length &&
        foodItemList.map((foodItem) => {
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
