import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";
import NewsFeed from "./components/sammani/NewsFeed.js";
import WorkoutPlan from "./components/sammani/WorkoutPlan.js";
import Schedule from "./components/sammani/Schedule.js";
import TimeTable from "./components/sammani/TimeTable.js";
import Login from "./components/sammani/Login.js";





function App() {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/news-feed/:username" element={<NewsFeed/>} />
        <Route path="/workout-plan/:username" element={<WorkoutPlan/>} />
        <Route path="/weekly-schedule" element={<Schedule/>} />
        <Route path="/q" element={<TimeTable/>} />
       
    
       
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
