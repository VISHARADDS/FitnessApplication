import React from "react";
import "./assets/css/headerUI.css";
import "./assets/css/timetable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";


function TimeTable() {
  return (
   <>
   
 <div style={{display:"flex"}} >
<div>
  <div className="div1">Monday</div>
  
</div>

<div>
  <div className="div1">Tuesday</div>
  
</div>

<div>
  <div className="div1">Wednesday </div>
  
</div>

<div>
  <div className="div1">Thursday</div>
  
</div>

<div>
  <div className="div1">Friday</div>
  
</div>

<div>
  <div className="div1">Saturday</div>
  
</div>

<div>
  <div className="div1">Sunday</div>
  
</div>

</div>

 
 
   </>
  );
}

export default TimeTable;
