import React from "react";
import "./assets/css/headerUI.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faBell, faCog,faSignOut,faNewspaper,faBowlRice } from '@fortawesome/free-solid-svg-icons'; 
import profile from "./assets/img/profile.png"

function Header(){
    return(
        <>
  <div className="container position-sticky z-index-sticky top-0 " style={{marginTop:"0px"}}>
    <div className="row">
      <div className="">
        <nav className="navbar navbar-expand-lg  z-index-3 shadow position-absolute " style={{backgroundColor:"white", marginLeft:"150px",width:"1070px"}}  >
          <div className="container-fluid px-0">
            <a className="navbar-brand font-weight-bolder ms-sm-3"  href=""  data-placement="bottom" style={{color:"black"}} >
             <FontAwesomeIcon style={{color:"purple"}} size="xl" icon={faNewspaper}></FontAwesomeIcon>
              &nbsp; News Feed
            </a>
           
            <div className="collapse navbar-collapse pt-3 pb-1 py-lg-0 w-100" id="navigation" >
              <ul className="navbar-nav navbar-nav-hover ms-auto" >
              <li className="nav-item dropdown dropdown-hover mx-2">
              <div className="ms-md-auto pe-md-1 d-flex align-items-center" style={{height:"45px"}}>
                
            <div className="input-group input-group-outline  "style={{height:"45px"}}>
             
              <input style={{width:"500px",height:"40px",color:"",marginTop:"5px"}} type="text" className="form-control"  placeholder="Search..."      
               />
<button className="btn " style={{marginTop:"5px"}} type="button"> <FontAwesomeIcon icon={faSearch} size="lg" style={{color:"purple"}} ></FontAwesomeIcon> </button>

            </div>
          </div>
                </li>
             
                <li className="nav-item dropdown dropdown-hover mx-2">
                  <a className="nav-link ps-2 d-flex cursor-pointer align-items-center" href="/Categories" id="dropdownMenuPages" data-bs-toggle="dropdown" aria-expanded="false"  style={{color:"purple"}}>
                  <FontAwesomeIcon icon={faBell} size="1x" style={{marginTop: "10px"}} />                   
                  </a>
                 
                </li>
             
                <li className="nav-item dropdown dropdown-hover mx-2">
                  <a  href= "VirtualSearch"  className="nav-link ps-2 d-flex cursor-pointer align-items-center" id="dropdownMenuBlocks" data-bs-toggle="dropdown" aria-expanded="false"  style={{color:"purple"}}>
                  <FontAwesomeIcon icon={faCog} size="1x" style={{marginTop: "10px"}} />

                  </a>
                </li>
                <li className=" nav-item dropdown dropdown-hover mx-2">
                <a className="nav-link ps-2 d-flex cursor-pointer align-items-center" id="dropdownMenuDocs" data-bs-toggle="dropdown" aria-expanded="false" >
                    <div style={{height:"35px",backgroundColor:"purple", borderRadius:"50px"}}> <img style={{height:"35px"}} src={profile} /></div>
              
                   </a>
                </li>
                <li className="nav-item dropdown dropdown-hover mx-2">
                  <a  href= "VirtualSearch"  className="nav-link ps-2 d-flex cursor-pointer align-items-center" id="dropdownMenuBlocks" data-bs-toggle="dropdown" aria-expanded="false"  style={{color:"purple"}}>
                  <FontAwesomeIcon icon={faSignOut} size="1x" style={{marginTop: "10px"}} />

                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
       
      </div>
    </div>
  </div>

     

    

        </>
    )

}export default Header;