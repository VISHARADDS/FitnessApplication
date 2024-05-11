import React from "react";
import "./assets/css/headerUI.css"
import logo from "./assets/img/logo.png"

function SideBar(){
    return(
        <>
    
        <div className="g-sidenav bg-gray-200">
        <div className="sidenav navbar navbar-vertical navbar-expand-xs border-0  my-3 fixed-start ms-3 " style={{backgroundColor:"#260e63"}}>
    <div className="sidenav-header" >
      <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
      <a className="navbar-brand m-0" href=" " target="_blank">
       <img src={logo}></img>
        <span className="ms-1 font-weight-bold text-white"> HIIT Fitness Coach</span>
      </a>
    </div>
    <hr className="horizontal light mt-0 mb-2"/>
    <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link text-white " href="l">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">dashboard</i>
            </div>
            <span className="nav-link-text ms-1">Dashboard</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white " href="../pages/sign-in.html">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">people</i>
            </div>
            <span className="nav-link-text ms-1">User Accounts</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white " href="../pages/tables.html">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">fitness_center</i>
            </div>
            <span className="nav-link-text ms-1">Workout Plans</span>
          </a>
        </li>
       
        <li className="nav-item">
          <a className="nav-link text-white " href="../pages/tables.html">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">fastfood</i>
            </div>
            <span className="nav-link-text ms-1">Online Orders</span>
          </a>
        </li>
       
       
       
      
        <li className="nav-item">
          <a className="nav-link text-white " href="">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">list</i>
            </div>
            <span className="nav-link-text ms-1">Contacts</span>
          </a>
        </li>

      </ul>
    </div>
    <div className="sidenav-footer position-absolute w-100 bottom-0 " style={{backgroundColor:"#5c09c6"}}>
      <div className="mx-3">
        <a className="btn  w-100" href="" type="button" style={{color:"white"}}>
       
              <i className="material-icons opacity-10">login</i>
            <span className="nav-link-text ms-3">Sign Out</span>
        </a>
      </div>
    </div>
  </div>
 
        </div>

        </>
    )

}export default SideBar;