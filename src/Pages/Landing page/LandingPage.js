import React from 'react'
import "./landingPage.css"
import lpImg from "./../../Assets/lp-img.png"
export default function LandingPage() {
  return (
    <div>
        <div className="landing-page-container">
            <div className="select-user">
                <h1>Food Ordering App</h1>
                <div className="select-user-btn-box">
                <button className="user-btn">Customer</button>
                <button className="user-btn">Restaurant</button>
                </div>
            </div>
            <img className="lpImg" src={lpImg} alt=""/>
        </div>
        
    </div>
  )
}
