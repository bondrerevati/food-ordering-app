import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import { decodeToken } from "react-jwt";
import "./customerHeader.css"
import { Search } from "@mui/icons-material";

export default function CustomerHeader() {
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
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("customerToken");
    navigate("/");
  };
  return (
    <div>
      <header>
        <div className="header-left-side">
          <div>
            <DeliveryDiningIcon
              sx={{ height: "40px", width: "40px", color: "#93e410" }}
            />
          </div>
          <div className='search-div'>
            <input type='text' className='header-search' 
            placeholder='Search food'
            ></input>
            <Search className='search-icon' />
        </div>
        </div>
        <div className="header-right-side">
          <div>
            <AccountCircleIcon
              sx={{ height: "40px", width: "40px", color: "#93e410", cursor:"pointer" }}
              onClick={()=>navigate("/customer/settings")}
            />
          </div>
          <div>
          <p className="username">{customerDetails.name}</p>
          </div>
          <div className="user-profile-card" onClick={handleLogout}>
            <p>Logout</p>
          </div>
        </div>
      </header>
    </div>
  );
}
