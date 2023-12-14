import axios from "axios";
import React, { useEffect, useState } from "react";
import "./restaurantHomePage.css";
import { useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";
export default function RestaurantHomePage() {
  const restaurantToken = localStorage.getItem("restaurantToken");
  const [foodItemList, setFoodItemList] = useState([]);
  const [foodItemData, setFoodItemData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const navigate = useNavigate();
  const getFoodItemList = async () => {
    try {
      axios
        .get("https://food-ordering-app-backend-tdf7.onrender.com/item/getitemsbyid", {
          headers: {
            "Content-Type": "application/json",
            Authorization: restaurantToken,
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
  const handleEdit = (foodItem) => {
    setFoodItemData(foodItem);
    navigate("/restaurant/editfooditem", { state: foodItem });
  };
  const handleView = (foodItem) => {
    setFoodItemData(foodItem);
    setShowViewModal(true);
  };
  const handleDelete = (foodItem) => {
    setFoodItemData(foodItem);
    setShowDeleteModal(true);
  };
  const handleDeleteFunction = () => {
    try {
      axios
        .delete("https://food-ordering-app-backend-tdf7.onrender.com/item/deleteitem", { data: foodItemData })
        .then((response) => {
          console.log(response.data);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="food-item-main-div">
        {foodItemList.length > 0 && (
          <table className="food-item-list">
            <tr className="food-item-list-heading">
              <th>Food Item</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>View</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            {foodItemList.length > 0 &&
              foodItemList.map((foodItem, index) => {
                return (
                  <tr className="food-item-list-row">
                    <td className="food-item-list-data">
                      <img
                        src={foodItem.imageUrl}
                        className="food-item-image"
                      />
                    </td>
                    <td>{foodItem.name}</td>
                    <td>{foodItem.quantity}</td>
                    <td>₹ {foodItem.price}</td>
                    <td>
                      <button
                        className="food-item-button"
                        onClick={() => {
                          handleView(foodItem);
                        }}
                      >
                        View
                      </button>
                    </td>
                    <td>
                      <button
                        className="food-item-button"
                        onClick={() => {
                          handleEdit(foodItem);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="food-item-button"
                        onClick={() => {
                          handleDelete(foodItem);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </table>
        )}
        {foodItemList.length == 0 && (
          <div className="no-food-item-div">
            <p>Your food item list is empty. Please add food items.</p>
            <button
              className="food-item-button"
              onClick={() => navigate("/restaurant/addfooditem")}
            >
              Add food item
            </button>
          </div>
        )}
        <div className={showDeleteModal ? "delete-modal" : "hide-data"}>
          <h3>Delete Food Item?</h3>
          <p>Are you sure, you want to delete this Food Item?</p>
          <p>{foodItemData.name}</p>
          <hr></hr>
          <div className="delete-modal-btns">
            <button
              className="cancel-btn"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </button>
            <button
              className="delete-confirm-btn"
              onClick={handleDeleteFunction}
            >
              Delete
            </button>
          </div>
        </div>
        <div className={showViewModal ? "view-modal-container" : "hide-data"}>
          <div className="view-modal-header">
            <h3>Food Item Details</h3>
            <Close
              style={{
                marginBottom: "5px",
                fontSize: "20px",
                color: "#93e410",
                cursor: "pointer",
              }}
              onClick={() => setShowViewModal(false)}
            />
          </div>
          <div className="view-modal-img-box">
            <img src={foodItemData.imageUrl} className="img-in-viewmodal"></img>
          </div>
          <div className="view-modal-content-box">
            <p>
              <span>Item Name:</span> {foodItemData.name}
            </p>
            <p>
              <span>Item Quantity:</span> {foodItemData.quantity}
            </p>
            <p>
              <span>Item Price:</span>
              {foodItemData.price}
            </p>
            <p>
              <span>Item Description:</span> {foodItemData.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
