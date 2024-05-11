import React from "react";
import "./assets/css/headerUI.css"
import logo from "./assets/img/logo.png"
import { Link, useLocation } from "react-router-dom";
// import logo2 from "./assets/img/Logo2.jpg"

function SideBar(){

 const location = useLocation();
 

// Define a function to determine if a NavLink should be considered active
const isActive = (path) => {
  return location.pathname === path;
};

const isActiveWorkoutPlans = () => {
  return location.pathname === "/workout-plan" || location.pathname === "/weekly-schedule";
};



    return(
        <>
    
        <div className="g-sidenav bg-gray-200">
        <div className="sidenav navbar navbar-vertical navbar-expand-xs border-0 fixed-start " style={{backgroundColor:"white",overflowY:"hidden"}}>
    <div className="sidenav-header" style={{height:"65px"}} >
      <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
      <a className="navbar-brand m-0" href=" " target="_blank" style={{padding:"1rem 1rem"}}>
       <img src={logo}></img>
        <span style={{color:'black' ,fontSize:'15px'}}  className="font-weight-bold "> HIIT Fitness Coach</span>
      </a>
    </div>
    <hr className="horizontal dark mt-0 " style={{height:"2px",backgroundImage:"linear-gradient(90deg, transparent, rgb(0 0 0), transparent)"}}/>
    <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main" style={{overflowY:"hidden"}}>
      <ul className="navbar-nav" >
        <li className="nav-item">
        <Link
                  className={`nav-link${isActive("/news-feed/") ? "active" : ""}`} 
                  to="/news-feed/${username}"
                >
            <div className="text-black text-center me-2 d-flex align-items-center justify-content-center">
              <i style={{color:'purple'}} className="material-icons opacity-10">newspaper</i>
            </div>
            <span  style={{color:'black'}} className="nav-link-text ms-1"><b>News Feed</b></span>
          </Link>
        </li>
        <li className="nav-item">
        <Link
                  className={`nav-link ${isActive("/") ? "active" : ""}`}
                  to="/"
                >
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i style={{color:'purple'}} className="material-icons opacity-10">equalizer</i>
            </div>
            <span style={{color:'black'}} className="nav-link-text ms-1"><b>Workout Status</b></span>
          </Link>
        </li>
        <li className="nav-item">
        <Link
                  className={`nav-link ${isActive("/") ? "active" : ""}`} 
                  to="/"
                >
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i style={{color:'purple'}} className="material-icons opacity-10">people</i>
            </div>
            <span style={{color:'black'}} className="nav-link-text ms-1"><b>Friends</b></span>
          </Link>
        </li>
        <li className="nav-item">
                <Link className={`nav-link ${isActiveWorkoutPlans("/workout-plan") ? "active" : ""}`} to="/workout-plan">
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i style={{ color: 'purple' }} className="material-icons opacity-10">fitness_center</i>
                  </div>
                  <span style={{ color: 'black' }} className="nav-link-text ms-1"><b>Workout Plans</b></span>
                </Link>
              
                 
              </li>
       
        <li className="nav-item">
        <Link
                  className={`nav-link ${isActive("/Meal-Plan") ? "active" : ""}`} 
                  to="/Meal-Plan"
                >
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i style={{color:'purple'}} className="material-icons opacity-10">rice_bowl</i>
            </div>
            <span style={{color:'black'}} className="nav-link-text ms-1"><b>Meal Plans</b></span>
          </Link>
        </li>
        
        
        {/* <img style={{marginTop:"10px"}} src={logo2}></img> */}

      </ul>
     
    </div>
    
  </div>
 
        </div>

        </>
    )

}export default SideBar;