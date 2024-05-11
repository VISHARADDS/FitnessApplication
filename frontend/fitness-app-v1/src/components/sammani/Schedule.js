import {React} from "react";
import "./assets/css/headerUI.css"
import SideBar from "./Sidebar.js";
import "./assets/css/headerUI.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faBell, faCog,faSignOut,faDumbbell,faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'; 
import profile from "./assets/img/profile.png"
import "./assets/css/buttons.css"
import TimeTable from "./TimeTable.js";





function Schedule() {

  const backNavigate = () => {
    const workoutPlan = `/workout-plan`;
    // Navigate to the constructed URL
    window.location.href = workoutPlan;
};

  
  

  return (
    <>
    

    <div className="container position-sticky z-index-sticky top-0 " style={{marginTop:"0px"}}>
    <div className="row">
      <div className="">
        <nav className="navbar navbar-expand-lg  z-index-3 shadow position-absolute " style={{backgroundColor:"white", marginLeft:"150px",width:"1070px"}}  >
          <div className="container-fluid px-0">
            <a className="navbar-brand font-weight-bolder ms-sm-3"  href=""  data-placement="bottom" style={{color:"black"}} >
             <FontAwesomeIcon style={{color:"purple"}} size="xl" icon={faDumbbell}></FontAwesomeIcon>
              &nbsp;Weekly Workout Schedule
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
                  <a className="nav-link ps-2 d-flex cursor-pointer align-items-center" id="dropdownMenuBlocks" data-bs-toggle="dropdown" aria-expanded="false"  style={{color:"purple"}}>
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

      
  <div className="contact-us blog-author " style={{backgroundColor:"#ede9f6",overflowX: "hidden",overflowY: "hidden"}}>
    
       
          <div className="row">
         
            <div className="col-lg-5" style={{ height: "0px" }}>
          <SideBar/>
            </div>
           
            <div style={{marginLeft:"10px", marginTop:"80px",display:"flex"}}>
         <div style={{display:"inline-block"}}><button style={{marginLeft:"280px"}} onClick={backNavigate} className="btn btn-info"><FontAwesomeIcon icon={faArrowLeftLong} size="xl"/> Back</button></div>
            </div>
            <div style={{marginLeft:"10px", marginTop:"20px",display:"flex"}}>
         <div className="bg1"  style={{marginLeft:"280px", height:"180px",borderRadius:"10px",width:"1000px"}}>
         <h3 style={{color:"white",fontSize:"40px",marginLeft:'220px',marginTop:'55px'}}> <b>WEEKLY WORKOUT ROUTINE</b></h3>
         </div>
         
            </div>
            <div  style={{marginLeft:"280px",marginTop:'20px'}}>
              <TimeTable/>
         </div>
               
                </div>
            
         
         
         
           
          </div>
         
      
           
         
           
        
         
       
    

    </>
  );
}

export default Schedule;






















