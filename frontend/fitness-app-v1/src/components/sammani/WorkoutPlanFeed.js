import {React} from "react";
import "./assets/css/content2.css"
import profile from "./assets/img/profile.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit, faEllipsis, faTrash} from '@fortawesome/free-solid-svg-icons'; 
import api from "../../api/axiosConfig.js"
import { useEffect,useState } from "react";
import "./assets/css/popup.css"
import { nanoid } from 'nanoid';
import { ThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import { Box, Typography, useMediaQuery, Button } from "@material-ui/core"
import "../sammani/assets/css/Ads1.css";
import { Carousel } from 'react-bootstrap';
import "./assets/css/popup2.css"


const theme = createTheme();

function WorkoutPlanFeed({ userName ,filteredWorkouts, onSearch }) {
  

   
    const [searchQuery, setSearchQuery] = useState("");
    const [workout, setWorkout] = useState([]);
    const [commentInputs, setCommentInputs] = useState({});
    const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);
    const [showCommentsPopup, setShowCommentsPopup] = useState(false);
    const [comments, setComments] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
const [workoutToDelete, setWorkoutToDelete] = useState(null);


    const getWorkouts=async()=>{
        try{
            const response = await api.get("/api/v1/workouts")
            console.log(response.data);
            setWorkout(response.data);
        } catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        console.log("userName:", userName);
        getWorkouts();
    }, []);
    

    const handleReviewSubmit = async (workoutId, userName) => {
        try {
            const reviewId = nanoid(6); // Generate a random ID with 6 characters
            const response = await api.post("/api/v1/reviews/addReview", {
                username: userName, // Set the username fetched from the browser
                description: commentInputs[workoutId],
                workoutId: workoutId,
                reviewId: reviewId // Include the generated reviewId in the payload
            });
            console.log(response.data);
            getWorkouts();
            setCommentInputs({ ...commentInputs, [workoutId]: '' }); // Clear comment input
        } catch (err) {
            console.log(err);
        }
    };
    const handleCancel = () => {
        // Implement cancel functionality if needed
    };

    //model

    const openCommentPopup = async (workoutId) => {
        const selected = workout.find(item => item.workoutId === workoutId);
        setSelectedWorkoutId(selected);
        setShowCommentsPopup(true);
        // Fetch comments for the selected workout
        try {
            const response = await api.get(`/api/v1/workouts/reviews/${workoutId}`);
            console.log(response.data);
            setComments(response.data);
        } catch (err) {
            console.log(err);
        }
    };
  
    const closeCommentPopup = () => {
        setSelectedWorkoutId(null);
        setShowCommentsPopup(false);
    };

    const handleRemoveReview = async (reviewId, userName) => {
        try {
            // Fetch the username associated with the workout ID
            const workoutResponse = await api.get(`/api/v1/workouts/${selectedWorkoutId.workoutId}`);
            const workoutUsername = workoutResponse.data.username;
            console.log('Username fetched from workout ID:', workoutUsername);
    
            // Fetch the review details including the username
            const response = await api.get(`/api/v1/reviews/get/${reviewId}`);
            const reviewUsername = response.data.username;
            console.log('Username fetched from review ID:', reviewUsername);
    
            // Check if the usernames match and the workout username matches the user's username
            if (reviewUsername === userName || workoutUsername === userName) {
                // Proceed with deleting the review
                await api.delete(`/api/v1/reviews/delete/${reviewId}`);
                // Reload the workouts after removing the review
                getWorkouts();
                // Fetch the comments for the selected workout again
                if (selectedWorkoutId) {
                    const commentsResponse = await api.get(`/api/v1/workouts/reviews/${selectedWorkoutId.workoutId}`);
                    setComments(commentsResponse.data);
                }
                console.log('Review deleted successfully.');
            } else {
                console.log('You are not authorized to delete this review.');
            }
    
            // Log whether the usernames match or not
            console.log(`Username match: ${reviewUsername === userName}`);
        } catch (err) {
            console.log(err);
        }
    };
    
    
    const handleCommentInputChange = (workoutId, value) => {
        setCommentInputs({ ...commentInputs, [workoutId]: value });
    };


    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
    //delete
    const handleDeleteWorkout = async (workoutId, userName) => {
        try {
            // Fetch the workout details including the username
            const response = await api.get(`/api/v1/workouts/${workoutId}`);
            const { username } = response.data;
    
            // Check if the username matches the current user's username
            if (username === userName) {
                // Proceed with deleting the workout
                await api.delete(`/api/v1/workouts/delete/${workoutId}`);
                // Refresh the list of workouts after deletion
                getWorkouts();
                alert('Workout deleted successfully.');
                console.log('Workout deleted successfully.');
            } else {
                alert('You are not authorized to delete this workout.');
                console.log('You are not authorized to delete this workout.');
            }
    
            // Log whether the usernames match or not
            console.log(`Username match: ${username === userName}`);
        } catch (error) {
            console.error('Error deleting workout:', error);
        }
    };
    
      

      const handleDeleteConfirm = async () => {
        if (workoutToDelete) {
            await handleDeleteWorkout(workoutToDelete.workoutId, userName);
            setShowDeleteModal(false);
            setWorkoutToDelete(null);
        }
    };
    
    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
        setWorkoutToDelete(null);
    };
    


return (
    <>
        <div className="container" style={{maxWidth:"400px"}}>
            <div className="d-flex">
                <div className="col-md-7">
                    <div className="feed">
                       
                        <div  style={{ overflowY: "auto", maxHeight: "calc(115vh - 70px)", width:"1050px" }}>
                        {workout.map((item, index) => (
<div key={index} className="feed-post mt-2 border" style={{ width: "650px", marginLeft: "8px" }}>
    <div className="p-2 bg-white">
        <div className="d-flex flex-row justify-content-between align-items-start profile">
            <div className="d-flex align-items-center">
                <img className="rounded-circle img-responsive" src={profile} width="50" height="50" />
                <div className="d-flex flex-column ml-2">
                    <h6 style={{color:"black"}}>&nbsp;{item.username}</h6>
                </div>
            </div>
                <li className=" nav-item dropdown dropdown-hover" style={{color:"white"}}>
            <button style={{ background: "none", border: "none", padding: 0 }} className="nav-link ps-2 d-flex cursor-pointer align-items-center" id="dropdownMenuDocs" data-bs-toggle="dropdown" aria-expanded="false">
            <FontAwesomeIcon icon={faEllipsis} style={{ color: "#1818a4" }}></FontAwesomeIcon>
               </button>
               <div className="dropdown-menu dropdown-menu-animation  p-3  "  aria-labelledby="dropdownMenuPages" >
                <div className="d-none d-lg-block" style={{marginRight:"30px"}}>
                <button  className="dropdown-item border-radius-md">
                    <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                    <span> &nbsp;  Edit</span>
                  </button>
                  <button  onClick={() => {setWorkoutToDelete(item);  setShowDeleteModal(true);}} className="dropdown-item border-radius-md">
                  <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                    <span> &nbsp;  Delete</span>
                  </button>
                </div>
                </div>
            </li>
           
        </div>
        <div style={{ marginTop: "10px" }}><span style={{ fontSize: "18px", color: 'black' }}><b>{item.workoutName}</b></span></div>
        <div style={{ marginTop: "10px" }} className="profile-content"><span style={{ fontSize: "14px",color:'black' }}>{item.description}</span>
            <div style={{ display: "flex" }}>
                <div style={{ marginTop: "10px", height: "330px" }}>
                <ThemeProvider theme={theme}>
        <div style={{ paddingBottom: "0px", height:'180px'}}>
            <Box py={20}>
                <Carousel controls={false}  style={{ width: "340px"}}  interval={null}>
                {item.poster.map((media, mediaIndex) => {
// Check if media is not null and is a string before calling startsWith
if (media && typeof media === 'string' && media.startsWith && media.startsWith('data:video')) {
    return (
        <Carousel.Item key={mediaIndex} interval={null}>
            <video controls style={{ width: "100%", height: "auto" }}>
                <source src={media} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </Carousel.Item>
    );
} else if (media && typeof media === 'string') {
    return (
        <Carousel.Item key={mediaIndex} interval={null}>
            <img
                className="d-block w-100"
                src={media}
                alt={`Media ${mediaIndex}`}
                style={{ height: "45vh", objectFit: "cover"}}
            />
        </Carousel.Item>
    );
} else {
    // Handle null or unsupported media types
    return null;
}
})}

                </Carousel>
                <br />
            </Box>
            {isMobile ? (
                <Box textAlign="right">
                   
                </Box>
            ) : (
                <> </>
            )}
        </div>
    </ThemeProvider>
                    
                    
                    
                    
                    
                    
                    
                    </div>
                <div style={{ overflowY: 'auto', maxHeight: '325px' }}>
                <div className="d-flex flex-column inputs p-2" style={{ flex: 1 ,marginTop:"10px"}}>
                    {item.workoutPlansId.map((plan, planIndex) => (
                        <div key={planIndex} className='bg2 mb-2' style={{ padding: "3px", borderRadius: '5px', whiteSpace: 'nowrap' }}>
                            <h6 style={{ marginLeft: "20px",color:"black" }}>{plan.name}</h6>
                            <p style={{ color: "black", marginLeft: "10px" }}>{plan.sets} <b>sets</b> | {plan.rep} <b>reps</b> | {plan.time}<b> mins</b> |
                            {plan.equipment}</p>
                        </div>
                    ))}
                       
                       </div>
                                        </div>   
                                        </div> 
                                        </div>
                                        <div className="profile-engagements">
                                            <div className="">
                                                <div className="d-flex flex-row fs-12" style={{marginTop:"10px", color:"black"}}>
                                                    <div className="like p-2 cursor"><i className="fa fa-heart" style={{color:"red",fontSize:'18px'}} ></i>&nbsp;Like&nbsp;</div>
                                                    <button onClick={() => openCommentPopup(item.workoutId)} style={{ background: "none", border: "none", padding: 0 }} className="like p-2 cursor"><i className="fa fa-comment" style={{color:"grey",fontSize:'18px'}}></i>&nbsp;&nbsp;Comment</button>
                                                    <div className="like p-2 cursor"><i className="fa fa-share" style={{color:"blue",fontSize:'18px'}}></i>&nbsp;Share</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-light p-2">
                                            <div className="d-flex flex-row align-items-start">
                                                <img className="rounded-circle" src="https://i.imgur.com/RpzrMR2.jpg" width="40"/>
                                                <div className="flex-fill ps-2">
                                                    <div className="position-relative d-flex align-items-center">
                                                        <input
                                                            value={commentInputs[item.workoutId] || ''}
                                                            onChange={(e) => handleCommentInputChange(item.workoutId, e.target.value)}
                                                            type="text"
                                                            className="form-control rounded-pill bg-white bg-opacity-15"
                                                            style={{paddingLeft: "30px"}}
                                                            placeholder="Write a comment..."
                                                        />
                                                        <div className="position-absolute end-0 text-center">
                                                            <a href="#" className="text-body text-opacity-50 me-2"><i className="fa fa-smile"></i></a>
                                                            <a href="#" className="text-body text-opacity-50 me-2"><i className="fa fa-camera"></i></a>
                                                            <a href="#" className="text-body text-opacity-50 me-2"><i className="fa fa-video"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-2 text-right">
                                                <button style={{marginBottom:"0px"}} className="btn btn-info btn-sm shadow-none" type="button" onClick={() => handleReviewSubmit(item.workoutId, userName)}>Post comment</button> 
                                               &nbsp;&nbsp;
                                                <button style={{marginBottom:"0px"}} className="btn btn-outline-info btn-sm ml-1 shadow-none" onClick={handleCancel} type="button">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {showCommentsPopup && selectedWorkoutId && (
            <div className="comment-popup">
                <div className="comment-popup-content" >
                    <span className="close" onClick={closeCommentPopup}>&times;</span>
                    <div className="feed-post mt-2 border" style={{ width: "600px", marginLeft: "10px" }}>
                        <div className="p-2 bg-white" style={{ overflowY: "auto", maxHeight: "calc(100vh - 80px)" }}>
                            <div className="d-flex flex-row justify-content-between align-items-start profile">
                                <div className="d-flex align-items-center">
                                    <img className="rounded-circle img-responsive" src={profile} width="50" height="50" />
                                    <div className="d-flex flex-column ml-2">
                                        <h6 style={{color:"black"}}>&nbsp;{selectedWorkoutId.username}</h6>
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginTop: "10px" }}><span style={{ fontSize: "18px", color: 'black' }}><b>{selectedWorkoutId.workoutName}</b></span></div>
                            <div style={{ marginTop: "10px" }} className="profile-content"><span style={{ fontSize: "14px",color:"black" }}>{selectedWorkoutId.description}</span>
                            <div style={{ display: "flex" }}>
                    <div style={{ marginTop: "20px", marginRight: "20px" }} className="content-image">
                        <ThemeProvider theme={theme}>
                            <div style={{ paddingBottom: "0px", height: '180px' }}>
                                <Box py={20}>
                                    <Carousel controls={false} style={{ width: "340px" }} interval={null}>
                                        {selectedWorkoutId.poster.map((media, mediaIndex) => {
                                            if (media && typeof media === 'string' && media.startsWith && media.startsWith('data:video')) {
                                                return (
                                                    <Carousel.Item key={mediaIndex} interval={null}>
                                                        <video controls style={{ width: "100%", height: "auto" }}>
                                                            <source src={media} type="video/mp4" />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    </Carousel.Item>
                                                );
                                            } else if (media && typeof media === 'string') {
                                                return (
                                                    <Carousel.Item key={mediaIndex} interval={null}>
                                                        <img
                                                            className="d-block w-100"
                                                            src={media}
                                                            alt={`Media ${mediaIndex}`}
                                                            style={{ height: "45vh", objectFit: "cover" }}
                                                        />
                                                    </Carousel.Item>
                                                );
                                            } else {
                                                return null;
                                            }
                                        })}
                                    </Carousel>
                                    <br />
                                </Box>
                                {isMobile ? (
                                    <Box textAlign="right">

                                    </Box>
                                ) : (
                                    <> </>
                                )}
                            </div>
                        </ThemeProvider>
                    </div>
                    <div style={{ overflowY: 'auto', maxHeight: '325px' }}>
                        {selectedWorkoutId.workoutPlansId.map((plan, planIndex) => (
                            <div key={planIndex} className='bg2 mb-2' style={{ padding: "3px", borderRadius: '5px', whiteSpace: 'nowrap' }}>
                                <h6 style={{ marginLeft: "20px", color: "black" }}>{plan.name}</h6>
                                <p style={{ color: "black", marginLeft: "10px" }}>{plan.sets} <b>sets</b> | {plan.rep} <b>reps</b> | {plan.time}<b> mins</b> |
                                {plan.equipment}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <br></br>
                            <div className="profile-engagements">
                                <div className="">
                                    <div className="d-flex flex-row fs-12" style={{ marginTop: "120px", color:"black" }}>
                                        <div className="like p-2 cursor"><i className="fa fa-heart" style={{ color: "red", fontSize: '18px' }} ></i>&nbsp;Like&nbsp;</div>
                                        <button onClick={() => openCommentPopup(selectedWorkoutId.workoutId)} style={{ background: "none", border: "none", padding: 0 }} className="like p-2 cursor"><i className="fa fa-comment" style={{ color: "grey", fontSize: '18px' }}></i>&nbsp;&nbsp;Comment</button>
                                        <div className="like p-2 cursor"><i className="fa fa-share" style={{ color: "blue", fontSize: '18px' }}></i>&nbsp;Share</div>
                                    </div>
                                </div>
                            </div>
                            {comments.map((comment, index) => (
                                <div key={index} className="card p-3 mt-2">
                                   {console.log(comment)}
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="user d-flex flex-row align-items-center">
                                            <img src="https://i.imgur.com/C4egmYM.jpg" width="30" className="user-img rounded-circle mr-2" />
                                            <span><small className="font-weight-bold text-primary" style={{fontSize:'14px'}}>&nbsp;{comment.username}</small> <small className="font-weight-bold" style={{color:'grey',fontSize:'13px'}}>{comment.description}</small></span>
                                        </div>
                                        <small>3 days ago</small>
                                    </div>
                                    <div className="action d-flex justify-content-between mt-2 align-items-center">
                                        <div className="reply px-4">
                                            <button onClick={() => handleRemoveReview(comment.reviewId,userName)} style={{ background: "none", border: "none", padding: 0 }}>
                                                <small> Remove</small>
                                            </button>
                                            <small> &nbsp; Reply</small>
                                            <small> &nbsp; Translate</small>
                                        </div>
                                        <div className="icons align-items-center">
                                            <i className="fa fa-check-circle-o check-icon text-primary"></i>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )}

{showDeleteModal && (
    <div className="modal-overlay">
        <div className="modal-content">
            <p style={{color:"black"}}>Are you sure you want to delete this workout?</p>
            <div>
                <Button onClick={handleDeleteConfirm} variant="contained" color="primary">
                    Yes, Delete
                </Button>
                <Button onClick={handleDeleteCancel} variant="contained" color="secondary">
                    Cancel
                </Button>
            </div>
        </div>
    </div>
)}
        </>
    );
}

export default WorkoutPlanFeed;
