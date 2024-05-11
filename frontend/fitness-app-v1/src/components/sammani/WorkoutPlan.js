import React, { useState, useEffect } from 'react';
import "./assets/css/headerUI.css"
import SideBar from "./Sidebar.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faCog, faSignOut, faDumbbell, faLongArrowAltRight, faClose, faShapes, faShare, faAdd, faSave, faTrash, faEdit, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import profile from "./assets/img/profile.png"
import daily from "./assets/img/daily.png"
import weekly from "./assets/img/weekly.png"
import "./assets/css/buttons.css"
import WorkoutPlanFeed from "./WorkoutPlanFeed.js"
import "./assets/css/model.css"
import api from "../../api/axiosConfig.js"
import Todo from './Todo.js';
import { useParams } from "react-router-dom";


function WorkoutPlan() {
  const { username } = useParams();
  console.log('Fetched username to workoutplan:', username);
  const [workoutId, setWorkoutId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [description, setDescription] = useState('');
  // const [username] = useState('samy'); 
  // const [date] = useState(new Date().toISOString());
  const [filteredWorkouts, setFilteredWorkouts] = useState('');

  const [showMore, setShowMore] = useState(false);
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [sets, setSets] = useState('');
  const [rep, setRep] = useState('');
  const [equipment, setEquipment] = useState('');
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [exerciseIdToDelete, setExerciseIdToDelete] = useState(null); 
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);

//base64
const readFileAsBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    // Add event listeners to track FileReader events
    reader.onloadstart = () => console.log('File reading started...');
    reader.onprogress = (event) => console.log(`File reading progress: ${event.loaded}/${event.total}`);
    reader.onload = () => {
      console.log('File reading completed.');
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      console.error('File reading error:', error);
      reject(error);
    };
    
    // Start reading the file
    reader.readAsDataURL(file);
  });
};


const handlePhotoChange = async (e) => {
  const files = Array.from(e.target.files);
  try {
    const base64Images = await Promise.all(files.map(file => readFileAsBase64(file)));
    setSelectedPhotos([...selectedPhotos, ...base64Images.filter(image => image !== null)]);
  } catch (error) {
    console.error('Error reading photo file:', error);
    // Handle the error appropriately, e.g., show a message to the user
  }
};

const handleVideoChange = async (e) => {
  const files = Array.from(e.target.files);
  try {
    const base64Videos = await Promise.all(files.map(file => readFileAsBase64(file)));
    setSelectedVideos([...selectedVideos, ...base64Videos.filter(video => video !== null)]);
  } catch (error) {
    console.error('Error reading video file:', error);
    // Handle the error appropriately, e.g., show a message to the user
  }
};
// Function to remove a selected media file
const handleRemoveMediaFile = (indexToRemove) => {
  // Remove the media file at the specified index from selectedPhotos array
  setSelectedPhotos(selectedPhotos.filter((_, index) => index !== indexToRemove));

  // Remove the media file at the specified index from selectedVideos array
  setSelectedVideos(selectedVideos.filter((_, index) => index !== indexToRemove));

 
};


//   //videos and photos 
//   const handlePhotoChange = (e) => {
//     const files = Array.from(e.target.files);
//     setSelectedPhotos([...selectedPhotos, ...files]);
//     const urls = files.map(file => URL.createObjectURL(file)); // Convert selected photos to URLs
//     console.log('Selected photo URLs:', urls);
//     setPhotoUrls([...photoUrls, ...urls]); // Append URLs to photoUrls state
// };

//   const handleRemovePhoto = (indexToRemove) => {
//     setSelectedPhotos(selectedPhotos.filter((_, index) => index !== indexToRemove));
//   };
  

//   const handleVideoChange = (e) => {
//     const files = Array.from(e.target.files);
//     setSelectedVideos([...selectedVideos, ...files]);
//     const urls = files.map(file => URL.createObjectURL(file)); // Convert selected video to URLs
//     console.log('Selected photo URLs:', urls);
//     setVideoUrls([...videoUrls, ...urls]);
//   };
//   const handleRemoveVideo = (indexToRemove) => {
//     setSelectedVideos(selectedVideos.filter((_, index) => index !== indexToRemove));
//   };
  


  //delete
  const handleDeleteButtonClick = (exerciseId) => {
    setShowDeleteModal(true); // Show the delete confirmation modal
    setExerciseIdToDelete(exerciseId); // Set the exerciseId to delete
  };

  const handleDeleteConfirm = async (exerciseId) => {
    try {
      // Send a DELETE request to the backend to delete the workout plan
      await api.delete(`/api/v1/workout/plan/delete/${exerciseId}`);
      console.log(`Workout plan with exerciseId ${exerciseId} deleted successfully`);
      // Close the delete confirmation modal
      setShowDeleteModal(false);
      // Optionally, you can also update the state to reflect the changes
      // For example, you can refetch the workout plans to update the UI
      fetchWorkoutPlansByWorkoutId(workoutId);
    } catch (error) {
      console.error('Error deleting workout plan:', error);
    }
  };

  const handleDeleteCancel = () => {
    // Close the modal when cancel button is clicked
    setShowDeleteModal(false);
  };
  

  const handleCloseModal = async () => {
    // Close the modal
    setShowModal(false);
    // Delete the added workout using the workout ID
    if (workoutId) {
      try {
        await api.delete(`/api/v1/workouts/delete/${workoutId}`);
        console.log('Workout deleted successfully');
      } catch (error) {
        console.error('Error deleting workout:', error);
      }
    }
    window.location.reload();
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const weeklySchedule = () => {
    const weeklySchedule = `/weekly-schedule`;
    window.location.href = weeklySchedule;
  };

  const handleOpenSecondModal = () => {
    // Check if workoutId is available
    if (workoutId) {
      // Open the second modal
      setShowSecondModal(true);
      console.log(workoutId)
    } else {
      console.error('WorkoutId is not available.');
      // Handle the case when workoutId is not available
    }
  };

  const handleCloseSecondModal = () => {
    setShowSecondModal(false);
  };

//add
const generateWorkoutId = () => {
  const randomString = Math.random().toString(36).substring(2, 8);
  const workoutId = 'workout_' + randomString;
  console.log('Generated workoutId:', workoutId);
  return workoutId;
};
  
const handleToggleShowMore = () => {
  // Check if description is empty or if either photos or videos are selected
  if (!description.trim() && !selectedPhotos.length && !selectedVideos.length) {
    console.log('Description, photos, and videos are empty. Cannot add workout.');
    return;
  }

  setShowMore(!showMore);
  // Generate workoutId here if needed
  const newWorkoutId = generateWorkoutId();
  setWorkoutId(newWorkoutId);
  // Call handleSubmit only if at least one of description, photos, or videos is not empty
  if (!showMore && (description.trim() || selectedPhotos.length || selectedVideos.length)) {
    handleSubmit(newWorkoutId);
  }
};

const handleSearch = (searchTerm) => {
  // Filter workouts based on the search term and username
  const filteredWorkouts = workouts.filter((workout) =>
    workout.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setFilteredWorkouts(filteredWorkouts);
};



const handleSubmit = (workoutId) => {
  // Check if at least one of description, selectedPhotos, or selectedVideos is not empty
  if (!description.trim() && selectedPhotos.length === 0 && selectedVideos.length === 0) {
    console.log('Description, selected photos, and selected videos are empty. Workout not added.');
    return; // Exit the function if all fields are empty
  }

  // Combine selected photos and selected videos into a single array
  const combinedMedia = [...selectedPhotos, ...selectedVideos];

  // Create an object with all the necessary data
  const workoutData = {
    description: description,
    date: new Date().toISOString(), // Get current date
    username: username, // Default username
    workoutId: workoutId, // Use the passed workoutId
    poster: combinedMedia, // Include selected photos and videos
    // Add other data as needed
  };

  console.log('Submitting workout data:', workoutData); // Log the workoutData object
  // Send a POST request to the backend with workoutData using Axios
  api.post('/api/v1/workouts/addWorkout', workoutData)
    .then(response => {
      // Handle success
      console.log('Workout added successfully:', response.data);
    })
    .catch(error => {
      // Handle error
      console.error('Error adding workout:', error);
    });
};





//save
const handleSave = async () => {
  // Check if any of the input fields are empty
  if (!name ) {
    console.log('Please fill in all fields before saving.');
    return;
  }

  // Generate a new exerciseId
  const exerciseId = Math.random().toString(36).substring(2, 8);
  try {
    // Save workout details to the backend
    await api.post('/api/v1/workout/plan/addPlan', {
      name,
      time,
      sets,
      rep,
      equipment,
      workoutId,
      exerciseId
    });
    console.log('Workout plan details saved successfully');
    // Clear input fields
    setName('');
    setTime('');
    setSets('');
    setRep('');
    setEquipment('');
    
    // Close the modal
    handleCloseSecondModal();
    fetchWorkoutPlansByWorkoutId(workoutId);
    // Fetch workout plans for the current workoutId after saving
  } catch (error) {
    console.error('Error saving workout details:', error);
  }
};
const fetchWorkoutPlansByWorkoutId = async (workoutId) => {
  try {
    const response = await api.get(`/api/v1/workouts/workoutPlans/${workoutId}`);
    setWorkoutPlans(response.data);
   
  } catch (error) {
    console.error('Error fetching workout plans:', error);
  }
};

useEffect(() => {
  if (workoutId) {
    fetchWorkoutPlansByWorkoutId(workoutId);
  }
}, [workoutId]);


//delete model



  return (
    <>
      <div className="container position-sticky z-index-sticky top-0 " style={{ marginTop: "0px" }}>
        <div className="row">
          <div className="">
            <nav className="navbar navbar-expand-lg  z-index-3 shadow position-absolute " style={{ backgroundColor: "white", marginLeft: "150px", width: "1070px" }}  >
              <div className="container-fluid px-0">
                <a className="navbar-brand font-weight-bolder ms-sm-3" href="" data-placement="bottom" style={{ color: "black" }}>
                  <FontAwesomeIcon style={{ color: "purple" }} size="xl" icon={faDumbbell}></FontAwesomeIcon>
                  &nbsp; Workout Plan
                </a>

                <div className="collapse navbar-collapse pt-3 pb-1 py-lg-0 w-100" id="navigation" >
                  <ul className="navbar-nav navbar-nav-hover ms-auto" >
                    <li className="nav-item dropdown dropdown-hover mx-2">
                      <div className="ms-md-auto pe-md-1 d-flex align-items-center" style={{ height: "45px" }}>
                        <div className="input-group input-group-outline  " style={{ height: "45px" }}>
                          <input onChange={(e) => handleSearch(e.target.value)} style={{ width: "500px", height: "40px", color: "", marginTop: "5px" }} type="text" className="form-control" placeholder="Search..."
                          />
                          <button className="btn " style={{ marginTop: "5px" }}> <FontAwesomeIcon icon={faSearch} size="lg" style={{ color: "purple" }} ></FontAwesomeIcon> </button>
                        </div>
                      </div>
                    </li>

                    <li className="nav-item dropdown dropdown-hover mx-2">
                      <a className="nav-link ps-2 d-flex cursor-pointer align-items-center" href="/Categories" id="dropdownMenuPages" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: "purple" }}>
                        <FontAwesomeIcon icon={faBell} size="1x" style={{ marginTop: "10px" }} />
                      </a>
                    </li>
                    <li className="nav-item dropdown dropdown-hover mx-2">
                      <a className="nav-link ps-2 d-flex cursor-pointer align-items-center" id="dropdownMenuBlocks" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: "purple" }}>
                        <FontAwesomeIcon icon={faCog} size="1x" style={{ marginTop: "10px" }} />
                      </a>
                    </li>
                    <li className=" nav-item dropdown dropdown-hover mx-2">
                      <a className="nav-link ps-2 d-flex cursor-pointer align-items-center" id="dropdownMenuDocs" data-bs-toggle="dropdown" aria-expanded="false" >
                        <div style={{ height: "35px", backgroundColor: "purple", borderRadius: "50px" }}> <img style={{ height: "35px" }} src={profile} /></div>
                      </a>
                    </li>
                    <li className="nav-item dropdown dropdown-hover mx-2">
                      <a href="VirtualSearch" className="nav-link ps-2 d-flex cursor-pointer align-items-center" id="dropdownMenuBlocks" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: "purple" }}>
                        <FontAwesomeIcon icon={faSignOut} size="1x" style={{ marginTop: "10px" }} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>

      <div className="contact-us blog-author " style={{ backgroundColor: "#ede9f6", overflowX: "hidden", overflowY: "hidden" }}>
        <div className="row">
          <div className="col-lg-5" style={{ height: "0px" }}>
            <SideBar />
          </div>
        </div>
        <div style={{ marginLeft: "10px", marginTop: "80px", display: "flex" }}>
          <div style={{ marginLeft: "240px" }}> 
          <WorkoutPlanFeed userName={username} filteredWorkouts={filteredWorkouts} onSearch={handleSearch} />
          </div>
          <div>
            <div style={{ marginLeft: "280px" }}>
              <a  onClick={handleOpenModal}>
                <div className="daily" style={{ padding: "10px", height: "120px", borderRadius: "10px", width: "370px", color: "white" }}>
                  <img style={{ height: "70px" }} src={daily} />
                  Create your own daily Routine
                  <div><button onClick={handleOpenModal} style={{ marginBottom: "5rem", marginLeft: "300px", height: "30px" }} className="btn "><FontAwesomeIcon style={{ marginBottom: "3rem", color: "white" }} icon={faLongArrowAltRight} size="xl" /></button></div>
                </div>
              </a>
            </div>
            <div style={{ marginLeft: "280px"}}>
              <a>
                <div className="weekly" style={{ backgroundColor: "purple", padding: "10px", height: "120px", borderRadius: "10px", width: "370px", marginTop: '10px', color: "white" }}>
                  <img style={{ height: "70px" }} src={weekly} />
                  Create your weekly  Routine
                  <div><button onClick={weeklySchedule} style={{ marginBottom: "5rem", marginLeft: "300px", height: "30px" }} className="btn "><FontAwesomeIcon style={{ marginBottom: "3rem", color: "white" }} icon={faLongArrowAltRight} size="xl" /></button></div>
                </div>
              </a>
            </div>
            <div style={{ marginLeft: "280px" }}>
              <Todo userName={username}/>
            </div>
          </div>
        </div>
      </div>
       {/* Modal */}
       {showModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <button className="modal-close-btn" onClick={handleCloseModal}><FontAwesomeIcon icon={faClose}/></button>
            <h5>Daily Workout Routine</h5>
            <form onSubmit={handleSubmit}>
            <div className="share border bg-white" style={{ width: '580px' }}>
              <div className="d-flex flex-row inputs p-2 py-4">
                <img className="rounded-circle" src={profile} width="40" />
                <input type="text"  value={description}  id="description" onChange={(e) => setDescription(e.target.value)} className="border-0 form-control share-input" placeholder=" Share your thoughts" />
              </div>
              <div className="d-flex justify-content-between border-top" style={{ height: "50px" }}>
                <div className="d-flex flex-row publish-options">
                <div className="align-items-center border-right p-2 share" style={{ marginTop: "0px" }}>
    <label htmlFor="photoUpload"><i className="fa fa-camera"></i> photos</label>
    <input type="file" id="photoUpload" accept="image/*" style={{ display: "none" }} multiple onChange={handlePhotoChange}/></div>   

    <div className="align-items-center border-right p-2 share" style={{ marginTop: "0px" }}>
  <label htmlFor="videoUpload"><i className="fa fa-video"></i> Videos</label>
  <input type="file" id="videoUpload" accept="video/*" style={{ display: "none" }} multiple onChange={handleVideoChange} />
</div>   

</div>
 

              </div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', overflowX: "auto" }}>
              {selectedPhotos.map((photo, index) => (
  <div key={index} style={{ marginLeft: '20px', marginBottom: '10px', position: 'relative' }}>
    <img src={photo} style={{ height: '100px' }} alt={`Selected Photo ${index + 1}`} />
    {/* Button to remove the selected photo */}
    <button
      onClick={() => handleRemoveMediaFile(index)}
      style={{ position: 'absolute', top: '5px', right: '5px', background: 'none', border: 'none', cursor: 'pointer' }}
    >
      <FontAwesomeIcon style={{ color: "red" }} icon={faTrash} />
    </button>
  </div>
))}

{/* Display selected videos */}
{selectedVideos.map((video, index) => (
  <div key={index} style={{ marginLeft: '20px', marginBottom: '10px', maxWidth: '300px', position: 'relative' }}>
    <video controls style={{ maxWidth: '100%' }}>
      <source src={video} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    {/* Button to remove the selected video */}
    <button
      onClick={() => handleRemoveMediaFile(index)}
      style={{ position: 'absolute', top: '5px', right: '5px', background: 'none', border: 'none', cursor: 'pointer' }}
    >
      <FontAwesomeIcon style={{ color: "white" }} icon={faTrash} />
    </button>
  </div>
))}
</div>

            </div>
            </form>
            <div className="modal-body">
              {/* Show or hide this section based on the showMore state */}
              {showMore && (
                 <div className="share border bg-white" style={{width:'580px'}}>
   
                 <div className="publish-button" >
                                     <button onClick={handleOpenSecondModal} className="btn btn-info" style={{marginTop:"5px",marginLeft:"470px",marginBottom:"0px",fontSize:"10px"}}><FontAwesomeIcon icon={faAdd} size='1x'/> Add </button>
                                 </div>
                                
                             <div className="d-flex flex-row inputs p-2 "style={{ display: 'flex', overflowX: 'auto' }}>
                           
                             {workoutPlans.map(plan => (
                              
          <div key={plan.id} className='bg2' style={{ marginLeft: "10px", padding: "3px", borderRadius: '5px', whiteSpace: 'nowrap' }}>
            <div style={{display:"flex"}}>
            <h6 style={{ marginLeft: "20px" }}>{plan.name}</h6>
             <button style={{border:"none",backgroundColor:"transparent" ,marginLeft:'90px',marginRight:"2px"}}><FontAwesomeIcon icon={faEdit}/></button>
              <button onClick={() => handleDeleteButtonClick(plan.exerciseId)} style={{border:"none",backgroundColor:"transparent"}}> <FontAwesomeIcon icon={faTrash}/></button>
            </div>
            <p style={{ color: "black" }}>{plan.sets} sets <b>|</b> {plan.rep} rep <b>|</b> {plan.time} mins <b>|</b> {plan.equipment}</p>
          </div>
        ))}

                             
                             </div>
                             
                             
                         </div>
              )}
              {/* Button to toggle showMore state */}
              {description.trim() && (
  <button onClick={handleToggleShowMore} style={{backgroundColor:"transparent",border:"none",marginLeft:"520px"}}><i><u>{showMore ? 'Less' : 'More'}</u></i></button>
)}          
            </div>
           
            <div style={{display:"flex"}}>
            
            <div className="publish-button">
              <button  onClick={handleCloseModal} className="btn btn-danger" style={{ marginTop: "10px", marginLeft: "300px" }}><FontAwesomeIcon icon={faTrash} />  Discard</button>
            </div>
            <div className="publish-button">
              <button onClick={() => window.location.reload()} className="btn btn-success" style={{ marginTop: "10px", marginLeft: "10px" }}><FontAwesomeIcon icon={faShare} />  Share</button>
            </div>
            </div>
          </div>
        </div>
      )}

      {/* Second Modal */}
      {showSecondModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal2">
            {/* Modal content */}
            <button className="modal-close-btn" onClick={handleCloseSecondModal}><FontAwesomeIcon icon={faClose}/></button>
            <form>
              <div style={{ display: "flex" }}>
                <label>Workout Name &nbsp; </label> <input type='text' style={{border:"1px solid black" ,padding:"5px"}} value={name} onChange={(e) => setName(e.target.value)} required/>
              </div>
              <div style={{ display: "flex", marginTop: "10px" }}>
                <label>Time &nbsp; </label> <input type='text' style={{border:"1px solid black" ,padding:"5px"}} value={time} onChange={(e) => setTime(e.target.value)} required />
              </div>
              <div style={{ display: "flex", marginTop: "10px" }}>
                <label>Sets &nbsp; </label> <input type='text' style={{border:"1px solid black" ,padding:"5px"}} value={sets} onChange={(e) => setSets(e.target.value)} />
              </div>
              <div style={{ display: "flex", marginTop: "10px" }}>
                <label>Rep &nbsp; </label> <input type='text' style={{border:"1px solid black" ,padding:"5px"}} value={rep} onChange={(e) => setRep(e.target.value)} />
              </div>
              <div style={{ display: "flex", marginTop: "10px" }}>
                <label>Equipment &nbsp; </label> <input type='text' style={{border:"1px solid black" ,padding:"5px"}} value={equipment} onChange={(e) => setEquipment(e.target.value)} />
              </div>
              </form>
              <div className="publish-button" style={{ marginTop: "10px" }}>
                <button className="btn btn-dark" style={{ marginTop: "5px", marginRight: "20px" }} onClick={handleSave}>
                  <FontAwesomeIcon icon={faSave} /> Save
                </button>
              </div>
           
        
          </div>
        </div>
      )}

{showDeleteModal && (
  <div className="custom-modal-overlay">
    <div className="custom-modal2">
      {/* Modal content */}
      <button className="modal-close-btn" ><FontAwesomeIcon icon={faClose}/></button>
      <p style={{color:"black"}}>Are you sure you want to delete this workout plan <b>{exerciseIdToDelete} </b>?</p>
      <div className="modal-buttons">
        {/* Confirm Delete Button */}
        <button className="btn btn-danger" onClick={() => handleDeleteConfirm(exerciseIdToDelete)}> Delete</button>
        {/* Cancel Button */}
        <button style={{marginLeft:"10px"}} className="btn btn-info" onClick={handleDeleteCancel}> Cancel</button>
      </div>
    </div>
  </div>
)}
    </>
  );
}

export default WorkoutPlan;

