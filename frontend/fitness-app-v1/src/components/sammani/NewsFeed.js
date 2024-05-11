import {React} from "react";
import "./assets/css/headerUI.css"
import Header from "./Header.js"
import Content2 from "./Content2.js";
import SideBar from "./Sidebar.js";
import Content3 from "./Content3.js";




function NewsFeed() {
  

  return (
    <>
     
     <div className="contact-us blog-author " style={{backgroundColor:"#ede9f6",overflowX: "hidden",overflowY: "hidden"}}>
        <header>
          <Header />
        
        </header>
       
          <div className="row">
         
            <div className="col-lg-5" style={{ height: "0px" }}>
          <SideBar/>
            </div>
            <div style={{marginLeft:"10px", marginTop:"80px",display:"flex"}}>
              <div style={{marginLeft:"240px"}}> <Content2/></div>
            <div style={{marginLeft:"250px"}}><Content3/></div> 
            </div>
           
               
                </div>
            
         
           
           
           
         
           
          </div>
         
       
    

    </>
  );
}

export default NewsFeed;
