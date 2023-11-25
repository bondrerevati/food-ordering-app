import React from "react";
import "./restaurantSidebar.css";
import FilterFramesIcon from "@mui/icons-material/FilterFrames";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLocation, useNavigate } from "react-router-dom";
export default function RestaurantSidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <div className="sidenav-content">
      <ul className="nav-items">
        <li>
          <span
            className={
              pathname === "/restaurant/home" ||
              pathname === "/restaurant/editfooditem"
                ? "active"
                : "sidebar-span"
            }
            onClick={() => navigate("/restaurant/home")}
          >
            <ListAltIcon sx={{ paddingRight: "5px" }} />
            Food Item List
          </span>
        </li>
        <li>
          <span
            className={
              pathname === "/restaurant/addfooditem" ? "active" : "sidebar-span"
            }
            onClick={() => navigate("/restaurant/addfooditem")}
          >
            <PostAddIcon sx={{ paddingRight: "5px" }} />
            Add Food Item
          </span>
        </li>
        <li>
          <span
            className={
              pathname === "/restaurant/orders" ? "active" : "sidebar-span"
            }
            onClick={() => navigate("/restaurant/orders")}
          >
            <FilterFramesIcon sx={{ paddingRight: "5px" }} />
            Orders
          </span>
        </li>
        <li>
          <span
            className={
              pathname === "/restaurant/settings" ? "active" : "sidebar-span"
            }
            onClick={() => navigate("/restaurant/settings")}
          >
            <AccountCircleIcon sx={{ paddingRight: "5px" }} />
            Settings
          </span>
        </li>
      </ul>
    </div>
  );
}
