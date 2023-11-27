import axios from "axios";
import React, { useEffect, useState } from "react";
import "./cart.css";
import { useNavigate } from "react-router-dom";
export default function Cart() {
  const navigate = useNavigate();
  const [cartList, setCartList] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [cartItemData, setCartItemData] = useState([]);
  const [newQuantity, setNewQuantity] = useState("");
  const [newQuantityError, setNewQuantityError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  let total = 0;
  const handleQuantityChange = (e) => {
    if (e.target.value === "") setNewQuantityError("Quantity can't be empty");
    else {
      setNewQuantityError("");
      setNewQuantity(e.target.value);
    }
  };
  const getCartList = async () => {
    try {
      axios
        .get("http://localhost:8080/cart/getitemsbyid", {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("customerToken"),
          },
        })
        .then((response) => {
          console.log(response);
          setCartList(response.data[0].items);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getCartList();
  }, []);
  const handleEdit = (cartItem) => {
    setCartItemData(cartItem);
    setShowEditModal(true);
  };
  const handleEditFunction = async () => {
    if (newQuantity === "") setNewQuantityError("Quantity can't be empty");
    else if (newQuantityError === "") {
      try {
        axios
          .put(
            "http://localhost:8080/cart/updateitemquantity",
            { cartItemData, newQuantity },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("customerToken"),
              },
            }
          )
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
    }
  };
  const handleDelete = (cartItem) => {
    setCartItemData(cartItem);
    setShowDeleteModal(true);
  };
  const handleDeleteFunction = async () => {
    try {
      axios
        .delete("http://localhost:8080/cart/deleteitem", {
          headers: {
            Authorization: localStorage.getItem("customerToken"),
          },
          data: { cartItemData },
        })
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
  const handleCheckout = async () => {
    try {
      axios
        .post(
          "http://localhost:8080/cart/checkout",
          {},
          {
            headers: {
              Authorization: localStorage.getItem("customerToken"),
            },
          }
        )
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
    <div className="cart-div">
      {cartList.length > 0 && (
        <>
          <div className="cart-table-div">
            <h3>Your Cart</h3>
            <table className="cart-table">
              <tr className="cart-table-tr">
                <th className="cart-table-th">Food Item</th>
                <th className="cart-table-th">Quantity</th>
                <th className="cart-table-th">Price</th>
                <th className="cart-table-th">Edit</th>
                <th className="cart-table-th">Delete</th>
              </tr>
              {cartList.length > 0 &&
                cartList.map((cartItem, index) => {
                  total += cartItem.quantity * Number(cartItem.price);
                  return (
                    <tr className="cart-table-tr">
                      <td className="cart-table-td">{cartItem.name}</td>
                      <td className="cart-table-td">{cartItem.quantity}</td>
                      <td className="cart-table-td">₹ {cartItem.quantity * Number(cartItem.price)}</td>
                      <td className="cart-table-td">
                        <button
                          className="cart-item-button"
                          onClick={() => {
                            handleEdit(cartItem);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                      <td className="cart-table-td">
                        <button
                          className="cart-item-button"
                          onClick={() => {
                            handleDelete(cartItem);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </table>
            Total Amount: {total}
            <button className="checkout-btn" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </>
      )}
      {cartList.length == 0 && (
        <div>
          <p>
            Your cart is empty. Explore the menu to enjoy delicious food from
            the comfort of your home.
          </p>
          <button
            className="checkout-btn"
            onClick={() => navigate("/customer/home")}
          >
            Home
          </button>
        </div>
      )}
      <div className={showEditModal ? "delete-modal" : "hide-data"}>
        <p>Enter the updated quantity of {cartItemData.name}</p>{" "}
        <input
          type="text"
          name="quantity"
          onChange={handleQuantityChange}
          defaultValue={cartItemData.quantity}
        />
        <p>{newQuantityError}</p>
        <hr></hr>
        <div className="delete-modal-btns">
          <button
            className="cancel-btn"
            onClick={() => setShowEditModal(false)}
          >
            Cancel
          </button>
          <button className="edit-confirm-btn" onClick={handleEditFunction}>
            Edit
          </button>
        </div>
      </div>
      <div className={showDeleteModal ? "delete-modal" : "hide-data"}>
        <p>are you sure you want to remove {cartItemData.name}?</p>
        <hr></hr>
        <div className="delete-modal-btns">
          <button
            className="cancel-btn"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </button>
          <button className="delete-confirm-btn" onClick={handleDeleteFunction}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
