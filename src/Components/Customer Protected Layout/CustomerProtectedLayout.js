import React from 'react'
import { Outlet } from "react-router-dom";
import CustomerSidebar from "../Customer Sidebar/CustomerSidebar";
import CustomerHeader from "../Customer Header/CustomerHeader";
export default function CustomerProtectedLayout() {
  return (
    <div>
      <CustomerHeader />
      <div className="main-container">
        <div className="sidebar-container">
          <CustomerSidebar />
        </div>
        <div className="outlet-container">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
