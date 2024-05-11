import { React, useState } from "react";
import "./assets/css/content2.css"
import profile from "./assets/img/profile.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEllipsis} from '@fortawesome/free-solid-svg-icons'; 
import api from "../../api/axiosConfig.js"
import { useEffect } from "react";
import "./assets/css/popup.css"
import { nanoid } from 'nanoid';

function Content2() {
  
    const [workout, setWorkout] = useState([]);
    const [reviewDescription, setReviewDescription] = useState("");
    const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);
    const [showCommentsPopup, setShowCommentsPopup] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentInputs, setCommentInputs] = useState({}); // State for comment inputs

    const getWorkouts = async () => {
        try {
            const response = await api.get("/api/v1/workouts");
            console.log(response.data);
            setWorkout(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getWorkouts();
    }, []);

    const handleReviewSubmit = async (workoutId) => {
        try {
            const reviewId = nanoid(6); // Generate a random ID with 6 characters
            const response = await api.post("/api/v1/reviews/addReview", {
                username: "sampleUser",
                description: commentInputs[workoutId] || '', // Use the comment input value for the corresponding workout ID
                workoutId: workoutId,
                reviewId: reviewId // Include the generated reviewId in the payload
            });
            console.log(response.data);
            getWorkouts();
            setCommentInputs({...commentInputs, [workoutId]: ''}); // Clear the comment input value after submitting
        } catch (err) {
            console.log(err);
        }
    };

    const handleCancel = () => {
        setReviewDescription(""); 
    };

    const openCommentPopup = async (workoutId) => {
        const selected = workout.find(item => item.workoutId === workoutId);
        setSelectedWorkoutId(selected);
        setShowCommentsPopup(true);
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

    const handleRemoveReview = async (reviewId) => {
        try {
            await api.delete(`/api/v1/reviews/delete/${reviewId}`);
            getWorkouts();
            if (selectedWorkoutId) {
                const response = await api.get(`/api/v1/workouts/reviews/${selectedWorkoutId.workoutId}`);
                setComments(response.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleCommentInputChange = (workoutId, value) => {
        setCommentInputs({...commentInputs, [workoutId]: value}); // Update the comment input value for the corresponding workout ID
    };

    return (
        <>
            <div className="container" style={{maxWidth:"400px"}}>
                <div className="d-flex">
                    <div className="col-md-7">
                        <div className="feed">
                            <div className="share border bg-white" style={{width:'580px'}}>
                                <div className="d-flex flex-row inputs p-2 py-4">
                                    <img className="rounded-circle" src={profile} width="40" />
                                    <input type="text" className="border-0 form-control share-input" placeholder=" Share your thoughts"/>
                                </div>
                                <div className="d-flex justify-content-between border-top" style={{height:"50px"}}>
                                    <div className="d-flex flex-row publish-options">
                                        <div className="align-items-center border-right p-2 share" style={{marginTop:"0px"}}><i className="fa fa-camera "> </i> photos</div>
                                        <div className="align-items-center border-right p-2 share"style={{marginTop:"0px"}}><i className="fa fa-video"></i> videos</div>
                                        <div className="align-items-center border-right p-2 share"style={{marginTop:"0px"}}><i className="fa fa-file "></i> files</div>
                                    </div>
                                    <div className="publish-button">
                                        <button className="btn btn-info" style={{marginTop:"5px",marginRight:"20px"}}>Publish</button>
                                    </div>
                                </div>
                            </div>
                            <div style={{ overflowY: "auto", maxHeight: "calc(78vh - 70px)", width:"1050px" }}>
                                {workout.map((item, index) => (
                                    <div key={index} className="feed-post mt-2 border" style={{width:"560px", marginLeft:"8px"}}>
                                        <div className="p-2 bg-white">
                                            <div className="d-flex flex-row justify-content-between align-items-start profile">
                                                <div className="d-flex align-items-center">
                                                    <img className="rounded-circle img-responsive" src={profile} width="50" height="50"/>
                                                    <div className="d-flex flex-column ml-2">
                                                        <h6> &nbsp;{item.username}</h6>
                                                    </div>
                                                </div>
                                                <button style={{ background: "none", border: "none", padding: 0 }}> <FontAwesomeIcon  icon={faEllipsis}  style={{color:"#1818a4",marginTop:'10px'}}></FontAwesomeIcon></button>
                                            </div>
                                            <div style={{marginTop:"10px"}} ><span style={{fontSize:"18px" ,color:'black'}}><b>{item.workoutName}</b></span></div>
                                            <div style={{marginTop:"10px"}} className="profile-content"><span style={{fontSize:"14px"}}>{item.description}</span>
                                                <div style={{marginTop:"20px"}}  className="content-image"><img src={item.poster}/></div>
                                            </div>
                                            <div className="profile-engagements">
                                                <div className="">
                                                    <div className="d-flex flex-row fs-12" style={{marginTop:"10px"}}>
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
                                                            <input value={commentInputs[item.workoutId] || ''} onChange={(e) => handleCommentInputChange(item.workoutId, e.target.value)} type="text" className="form-control rounded-pill bg-white bg-opacity-15" style={{paddingLeft: "30px"}} placeholder="Write a comment..." />
                                                            <div className="position-absolute end-0 text-center">
                                                                <a href="#" className="text-body text-opacity-50 me-2"><i className="fa fa-smile"></i></a>
                                                                <a href="#" className="text-body text-opacity-50 me-2"><i className="fa fa-camera"></i></a>
                                                                <a href="#" className="text-body text-opacity-50 me-2"><i className="fa fa-video"></i></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-2 text-right">
                                                    <button style={{marginBottom:"0px"}} className="btn btn-info btn-sm shadow-none" type="button" onClick={() => handleReviewSubmit(item.workoutId)}>Post comment</button> 
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
                        <div className="feed-post mt-2 border" style={{ width: "520px", marginLeft: "20px" }}>
                            <div className="p-2 bg-white" style={{ overflowY: "auto", maxHeight: "calc(100vh - 80px)" }}>
                                <div className="d-flex flex-row justify-content-between align-items-start profile">
                                    <div className="d-flex align-items-center">
                                        <img className="rounded-circle img-responsive" src={profile} width="50" height="50" />
                                        <div className="d-flex flex-column ml-2">
                                            <h6>&nbsp;{selectedWorkoutId.username}</h6>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginTop: "10px" }}><span style={{ fontSize: "18px", color: 'black' }}><b>{selectedWorkoutId.workoutName}</b></span></div>
                                <div style={{ marginTop: "10px" }} className="profile-content"><span style={{ fontSize: "14px" }}>{selectedWorkoutId.description}</span>
                                    <div style={{ marginTop: "20px" }} className="content-image"><img src={selectedWorkoutId.poster} alt={selectedWorkoutId.workoutName} /></div>
                                </div>
                                <div className="profile-engagements">
                                    <div className="">
                                        <div className="d-flex flex-row fs-12" style={{ marginTop: "10px" }}>
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
                                                <span><small className="font-weight-bold text-primary">&nbsp;{comment.username}</small> <small className="font-weight-bold">{comment.description}</small></span>
                                            </div>
                                            <small>3 days ago</small>
                                        </div>
                                        <div className="action d-flex justify-content-between mt-2 align-items-center">
                                            <div className="reply px-4">
                                                <button onClick={() => handleRemoveReview(comment.reviewId)} style={{ background: "none", border: "none", padding: 0 }}>
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
            )}
        </>
    );
}

export default Content2;
