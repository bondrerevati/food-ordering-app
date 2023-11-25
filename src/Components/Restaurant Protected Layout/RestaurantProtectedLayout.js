import React from "react";
import { Outlet } from "react-router-dom";
import "./restaurantProtectedLayout.css";
import RestaurantSidebar from "../Restaurant Sidebar/RestaurantSidebar";
import RestaurantHeader from "../Restaurant Header/RestaurantHeader";

export default function RetaurantLayout() {
  return (
    <div>
      <RestaurantHeader />
      <div className="main-container">
        <div className="sidebar-container">
          <RestaurantSidebar />
        </div>
        <div className="outlet-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
