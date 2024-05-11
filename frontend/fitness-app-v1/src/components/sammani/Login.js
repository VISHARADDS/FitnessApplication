import React, { useEffect, useState } from "react";
import "./assets/css/headerUI.css";
import "./assets/css/login.css";
import api from "../../api/axiosConfig.js";
import { useNavigate } from "react-router-dom";

function Login() {
  useEffect(() => {
    const banner = document.getElementById("banner");
    const loginContainer = document.getElementById("login-container");
    const signupContainer = document.getElementById("signup-container");
    const loginToggle = document.getElementById("login-form-toggler");
    const signupToggle = document.getElementById("signup-form-toggler");

    if (signupToggle && loginToggle) {
      signupToggle.addEventListener("click", () => {
        banner.style.transform = "translateX(-100%)";
        loginContainer.style.transform = "scale(0)";
        signupContainer.style.transform = "scale(1)";
      });

      loginToggle.addEventListener("click", () => {
        banner.style.transform = "translateX(0%)";
        signupContainer.style.transform = "scale(0)";
        loginContainer.style.transform = "scale(1)";
      });
    }
  }, []);

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must contain at least one capital letter and one number."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login button clicked");
  
    try {
      const response = await api.post("/api/v1/user/login", {
        email: email,
        password: password,
      });
  
      alert("Login successful!");


      const userDetailsResponse = await api.get(`/api/v1/user/email/${email}`);
        console.log("details",userDetailsResponse)
        const username = userDetailsResponse.data.userName;
          navigate(`/workout-plan/${username}`);
     
      if (response.data.success) {
        
       
      } else {
        setError("Invalid email or password."); // Set error message
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred while logging in."); // Set error message
      alert("An error occurred while logging in.");
    }
  };
  
  const generateTodoId = () => {
    // Generate a unique todoId here (e.g., using UUID or any other method)
    return "TODO-" + Math.random().toString(36).substr(2, 9);
  };

  const handleSignUp = async () => {
    validateEmail();
    validatePassword();

    // Check if there are any errors
    if (emailError || passwordError) {
      return; // Exit function if there are errors
    }

    try {
      const response = await api.post("/api/v1/user/addUser", {
        email: email,
        userName: userName,
        password: password,
      });
      const todoId = generateTodoId();
      const todoResponse = await api.post("/api/v1/todos/addTodo", {
        todoId: todoId,
        userName: userName,
      });

      setEmail("");
      setUserName("");
      setPassword("");
      setEmailError(""); // Resetting errors after successful signup
      setPasswordError("");

      alert("User registered successfully!");
      console.log("User added successfully:", response.data);
      console.log("Todo added successfully:", todoResponse.data);
      // You can add further logic here, such as redirecting the user to a login page or displaying a success message
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp();
  };

  return (
    <>
      <div className="form-container ">
        <div className="login-container" id="login-container">
          <h1 className="title" style={{ color: "black" }}>
            Log In
          </h1>
          <p className="desc" style={{ color: "black" }}>
            Login to your account to share and keep track of your fitness
            progress, meal plan and much more
          </p>
          <form>
          <div className="input-container">
            <input
              type="text"
              placeholder="Enter Your Email Address"
              autoFocus="on"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
             
            />
           
          </div>
          <div className="input-container">
          <input
  type="password"
  placeholder="Enter Your Password"
  autoFocus="on"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>
           
          </div>
          <div className="account-controls">
            <a href="">Forgot Password?</a>
            <button onClick={handleLogin} style={{marginTop:"10px"}} >
              Next <i className="fas fa-solid fa-angle-right"></i>
            </button>
          </div>

          </form>
          <span className="line"></span>
          <span className="other-login-text">Or log in with</span>
          <div className="social-logins">
            <button className="social-login">
              <i style={{ color: "#1e7bf2" }} className="fas fa-brands fa-facebook-f"></i>
            </button>
            <button className="social-login">
              <i style={{ color: "#ea4335" }} className="fas fa-brands fa-google"></i>
            </button>
          </div>
          <span className="signup-text" style={{ color: "black" }}>
            Don't have an account yet? <a id="signup-form-toggler">Sign up</a>
          </span>
        </div>
        <div className="placeholder-banner" id="banner">
          <img
            src="https://img.freepik.com/free-vector/abstract-flat-design-background_23-2148450082.jpg?size=626&ext=jpg&ga=GA1.1.1286474015.1708934801&semt=sph"
            alt=""
            className="banner"
          />
        </div>

        <div className="signup-container" id="signup-container">
          <h1 className="title" style={{ color: "black" }}>Signup</h1>
          <p className="desc" style={{ color: "black" }}>
            Create your account to share and keep track of your fitness progress, meal plan and much more
          </p>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input type="email" placeholder="Enter Your Email " value={email} onChange={(e) => setEmail(e.target.value)} />
              {emailError && <p className="error-message">{emailError}</p>}
            </div>
            <div className="input-container">
              <input type="text" placeholder="Enter Your Username" value={userName} onChange={(e) => setUserName(e.target.value)} />
            </div>
            <div className="input-container">
              <input type="password" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              {passwordError && <p className="error-message">{passwordError}</p>}
            </div>
            <div className="account-controls">
              <button type="submit">Next <i className="fas fa-solid fa-angle-right"></i></button>
            </div>
          </form>
          <span className="line"></span>
          <span className="other-login-text">Or Signup with</span>
          <div className="social-logins">
            <button className="social-login">
              <i style={{ color: "#1e7bf2" }} className="fas fa-brands fa-facebook-f"></i>
            </button>
            <button className="social-login">
              <i style={{ color: "#ea4335" }} className="fas fa-brands fa-google"></i>
            </button>
          </div>
          <span className="signup-text" style={{ color: "black" }}>
            Already have an account? <a id="login-form-toggler">Login here</a>
          </span>
        </div>
      </div>
    </>
  );
}

export default Login;
