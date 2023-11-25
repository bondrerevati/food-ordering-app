import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Edit } from "@mui/icons-material";
import "../../Common Styling/AddEdit.css";
export default function AddEditFoodItem() {
  const [hideItemImgInput, setHideItemImgInput] = useState(true);
  const [previewItemImg, setPreviewItemImg] = useState(false);
  const { pathname, state } = useLocation();
  const [image, setImage] = useState(
    pathname === "/restaurant/editfooditem" ? state.imageUrl : ""
  );
  const [name, setName] = useState(
    pathname === "/restaurant/editfooditem" ? state.name : ""
  );
  const [price, setPrice] = useState(
    pathname === "/restaurant/editfooditem" ? state.price : ""
  );
  const [quantity, setQuantity] = useState(
    pathname === "/restaurant/editfooditem" ? state.quantity : ""
  );
  const [description, setDescription] = useState(
    pathname === "/restaurant/editfooditem" ? state.description : ""
  );
  const [imageError, setImageError] = useState("");
  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [addEditFoodItemError, setAddEditFoodItemError] = useState("");
  const [isEdit, setIsEdit] = useState(
    pathname === "/restaurant/editfooditem" ? true : false
  );
  const [foodItem, setFoodItem] = useState(
    pathname === "/restaurant/editfooditem" ? state : {}
  );
  const navigate = useNavigate();
  const handleNameChange = (e) => {
    if (e.target.value === "") setNameError("Name can't be empty");
    else {
      setNameError("");
      setName(e.target.value);
    }
  };
  const handleImageChange = (e) => {
    if (isEdit) {
      if (e.target.files[0] === "") setPreviewItemImg(false);
      else {
        setPreviewItemImg(true);
        setImage(e.target.files[0]);
      }
    } else {
      if (e.target.files[0] === "") setImageError("Image can't be empty");
      else {
        setImageError("");
        setImage(e.target.files[0]);
      }
    }
  };
  const handleDescriptionChange = (e) => {
    if (e.target.value === "")
      setDescriptionError("Description can't be empty");
    else {
      setDescriptionError("");
      setDescription(e.target.value);
    }
  };
  const handleQuantityChange = (e) => {
    if (e.target.value === "") setQuantityError("Quantity can't be empty");
    else {
      setQuantityError("");
      setQuantity(e.target.value);
    }
  };
  const handlePriceChange = (e) => {
    if (e.target.value === "") setPriceError("Price can't be empty");
    else {
      setPriceError("");
      setPrice(e.target.value);
    }
  };
  const handleEditSubmit = async () => {
    setAddEditFoodItemError("");
    if (name === "") {
      setNameError("Name can't be empty");
    }
    if (image === "") {
      setImageError("Image can't be empty");
    }
    if (price === "") {
      setPriceError("Price can't be empty");
    }
    if (quantity === "") {
      setQuantityError("Quantity can't be empty");
    }
    if (description === "") {
      setDescriptionError("Description can't be empty");
    }
    if (
      nameError === "" &&
      imageError === "" &&
      quantityError === "" &&
      priceError === "" &&
      descriptionError === ""
    ) {
      const editedData = new FormData();
      editedData.append("id", foodItem._id);
      editedData.append("image", image);
      editedData.append("name", name);
      editedData.append("price", price);
      editedData.append("quantity", quantity);
      editedData.append("description", description);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("restaurantToken"),
        },
      };
      try {
        axios
          .put("http://localhost:8080/item/updateitem", editedData, config)
          .then((response) => {
            if (
              response.status === 200 &&
              response.data.token === "foodItemAlreadyExits"
            )
              setAddEditFoodItemError(response.data.message);
            else navigate("/restaurant/home");
          })
          .catch((error) => {
            if (error.response)
              setAddEditFoodItemError(error.response.data.message);
            else console.log(error.message);
          });
      } catch (e) {
        console.log(e);
      }
    }
  };
  const handleAddSubmit = async () => {
    setAddEditFoodItemError("");
    if (name === "") {
      setNameError("Name can't be empty");
    }
    if (image === "") {
      setImageError("Image can't be empty");
    }
    if (price === "") {
      setPriceError("Price can't be empty");
    }
    if (quantity === "") {
      setQuantityError("Quantity can't be empty");
    }
    if (description === "") {
      setDescriptionError("Description can't be empty");
    }
    if (
      nameError === "" &&
      imageError === "" &&
      quantityError === "" &&
      priceError === "" &&
      descriptionError === ""
    ) {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("description", description);
      console.log(formData);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("restaurantToken"),
        },
      };
      try {
        axios
          .post("http://localhost:8080/item/additem", formData, config)
          .then((response) => {
            if (
              response.status === 200 &&
              response.data.token === "foodItemAlreadyExits"
            )
              setAddEditFoodItemError(response.data.message);
            else navigate("/restaurant/home");
          })
          .catch((error) => {
            if (error.response)
              setAddEditFoodItemError(error.response.data.message);
            else console.log(error.message);
          });
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <div className="background-div">
      <div className="add-edit-form-div">
        <h1 className="add-edit-form-heading">{isEdit ? "Edit Food Item" : "Add Food Item"}</h1>
        <div className="add-edit-form-inner-div">
          <label for="item-name" className="add-edit-input-label">
            Item Name
          </label>
          <input
            type="text"
            name="name"
            id="item-name"
            className="add-edit-input-field"
            onChange={handleNameChange}
            defaultValue={isEdit ? foodItem.name : ""}
          />
          <p className="error">{nameError}</p>
          <label for="item-quantity" className="add-edit-input-label">
            Item Quantity
          </label>
          <input
            type="text"
            name="quantity"
            id="item-quantity"
            className="add-edit-input-field"
            onChange={handleQuantityChange}
            defaultValue={isEdit ? foodItem.quantity : ""}
          />
          <p className="error">{quantityError}</p>
          <label for="item-price" className="add-edit-input-label">
            Item Price
          </label>
          <input
            type="text"
            name="price"
            id="item-price"
            className="add-edit-input-field"
            onChange={handlePriceChange}
            defaultValue={isEdit ? foodItem.price : ""}
          />
          <p className="error">{priceError}</p>
          <label for="item-description" className="add-edit-input-label">
            Item Description
          </label>
          <input
            type="text"
            name="description"
            id="item-description"
            className="add-edit-input-field"
            onChange={handleDescriptionChange}
            defaultValue={isEdit ? foodItem.description : ""}
          />
          <p className="error">{descriptionError}</p>
          <label for="item-image" className="add-edit-input-label">
            Item Image
          </label>
          <div className={isEdit ? "preview-image-div" : "hide-preview-div"}>
            <img
              className="preview-image"
              src={
                previewItemImg ? URL.createObjectURL(image) : foodItem.imageUrl
              }
              alt=""
            />
            <Edit
              sx={{
                color: "#93e410",
                width: "20px",
                height: "20px",
                padding: "10px",
              }}
              className={"edit-icon"}
              onClick={() => setHideItemImgInput(!hideItemImgInput)}
            />
          </div>
          <input
            type="file"
            name="image"
            id="item-image"
            accept="image/*"
            className={
              isEdit
                ? hideItemImgInput
                  ? "hide-input"
                  : "add-edit-input-field img-field"
                : "add-edit-input-field img-field"
            }
            onChange={handleImageChange}
          />
          <p className="error">{imageError}</p>
          <button
            onClick={isEdit ? handleEditSubmit : handleAddSubmit}
            className="add-edit-submit-button"
          >
            {isEdit ? "Update" : "Add"}
          </button>
          <p className="error">{addEditFoodItemError}</p>
        </div>
      </div>
    </div>
  );
}
