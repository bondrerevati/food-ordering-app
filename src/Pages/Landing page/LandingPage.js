import React from 'react'
import "./landingPage.css"
import lpImg from "./../../Assets/lp-img.png"
import { useNavigate } from 'react-router-dom'
export default function LandingPage() {
  const navigate = useNavigate()
  return (
    <div>
        <div className="landing-page-container">
            <div className="select-user">
                <h1 className='landing-page-heading'>Food Ordering App</h1>
                <div className="select-user-btn-box">
                <button className="user-btn" onClick={()=>navigate("/customer/login")}>Customer</button>
                <button className="user-btn">Restaurant</button>
                </div>
            </div>
            <img className="lpImg" src={lpImg} alt=""/>
        </div>
        
    </div>
  )
}
