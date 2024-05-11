import {React} from "react";
import "./assets/css/content1.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper,faBookmark,faPeopleGroup,faDumbbell,faBowlFood,faChartArea} from '@fortawesome/free-solid-svg-icons'; 
import image1 from "./assets/img/img1.png"



function Content1() {
  

  return (
    <>
     
     
     <div className="area"></div><nav className="main-menu" style={{ boxShadow:" rgba(0, 0, 0, 0.1) 10px 9px 10px 12px"}} >
            <ul>
            <li className="has-subnav" style={{border:"1px solid white",borderRadius:"10px"}}>
                    <a href="https://jbfarrow.com">
   <FontAwesomeIcon className="faa fa-2x" icon={faNewspaper}></FontAwesomeIcon>
                        <span className="nav-text" style={{marginTop:"10px"}}>
                          News Feed
                        </span>
                    </a>
                  
                </li>
                <hr className="horizontal light mt-0 mb-2"/>
                <li className="has-subnav" style={{border:"1px solid white",borderRadius:"10px"}}>
                    <a href="#">
                    <FontAwesomeIcon className="faa fa-2x" icon={faChartArea}></FontAwesomeIcon>
                        <span className="nav-text">
                        workout status
                        </span>
                    </a>
                </li>
              
                 <li className="has-subnav" style={{border:"1px solid white",borderRadius:"10px"}}>
                    <a href="#">
                <FontAwesomeIcon className="faa fa-2x" icon={faPeopleGroup}></FontAwesomeIcon>
                        <span className="nav-text">
                           Friends
                        </span>
                    </a>
                    
                </li>
                 <li className="has-subnav" style={{border:"1px solid white",borderRadius:"10px"}}>
                    <a href="#">
                    <FontAwesomeIcon className="faa fa-2x" icon={faDumbbell}></FontAwesomeIcon>
                        <span className="nav-text">
                          Workout Plans
                        </span>
                    </a>
                   
                </li>
                <li className="has-subnav" style={{border:"1px solid white",borderRadius:"10px"}}>
                    <a href="#">
                    <FontAwesomeIcon className="faa fa-2x" icon={faBowlFood}></FontAwesomeIcon>
                        <span className="nav-text">
                           Meal Plans
                        </span>
                    </a>
                </li>

                 <li className="has-subnav" style={{border:"1px solid white",borderRadius:"10px"}}>
                    <a href="#">
                    <FontAwesomeIcon className="faa fa-2x" icon={faBookmark}></FontAwesomeIcon>
                        <span className="nav-text">
                           Saved
                        </span>
                    </a>
                    
                </li>

                <li className="has-subnav">
               
    <img style={{height:'180px'}} src={image1}></img>

                
                    
                </li>

  
               
            </ul>

        </nav>
       
    

    </>
  );
}

export default Content1;
