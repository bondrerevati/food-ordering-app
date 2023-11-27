import React from 'react'
import "./customerSidebar.css"
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLocation, useNavigate } from "react-router-dom";

export default function CustomerSidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <div className="sidenav-content">
      <ul className="nav-items">
        <li>
          <span
            className={
              pathname === "/customer/home"
                ? "active"
                : "sidebar-span"
            }
            onClick={() => navigate("/customer/home")}
          >
            <HomeIcon sx={{ paddingRight: "5px" }} />
            Home
          </span>
        </li>
        <li>
          <span
            className={
              pathname === "/customer/restaurant" || pathname === "/customer/restaurant/itemslist" ? "active" : "sidebar-span"
            }
            onClick={() => navigate("/customer/restaurant")}
          >
            <RestaurantMenuIcon sx={{ paddingRight: "5px" }} />
            Restaurant
          </span>
        </li>
        <li>
          <span
            className={
              pathname === "/customer/cart" ? "active" : "sidebar-span"
            }
            onClick={() => navigate("/customer/cart")}
          >
            <ShoppingCartIcon sx={{ paddingRight: "5px" }} />
            Cart
          </span>
        </li>
        <li>
          <span
            className={
              pathname === "/customer/settings" ? "active" : "sidebar-span"
            }
            onClick={() => navigate("/customer/settings")}
          >
            <AccountCircleIcon sx={{ paddingRight: "5px" }} />
            Settings
          </span>
        </li>
      </ul>
    </div>
  );
}
