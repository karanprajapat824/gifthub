import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './../App';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import './../css/Login.css';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { handleRegister } = useContext(AuthContext);
  const navigateTo = useNavigate();
  const [message, setMessage] = useState("");

  const doRegister = async () => {
    const result = await handleRegister(name, email, password);
    if (result === "success") {
      setMessage(result);
      navigateTo("/");
    } else {
      setMessage("*" + result);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-form-container">
          <div className="login-form">
            <h1>Create Account</h1>
            <p className="subtitle">Please fill in your details to register</p>

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                placeholder="Enter your name" 
                className="form-input"
                value={name}
                onChange={(e) => {
                  setMessage("");
                  setName(e.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Enter your email" 
                className="form-input"
                value={email}
                onChange={(e) => {
                  setMessage("");
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-field">
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  placeholder="Enter your password" 
                  className="form-input"
                  value={password}
                  onChange={(e) => {
                    setMessage("");
                    setPassword(e.target.value);
                  }}
                />
                <div onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? 
                    <FaEye className="password-icons" /> :
                    <FaEyeSlash className="password-icons" />
                  }
                </div>
              </div>
            </div>

            <div className="messages">
              <div className="error-message">{message}</div>
            </div>

            <button onClick={doRegister} className="login-button">Register</button>

            <div className="register-link">
              Already have an account? <a href="/login">Login here</a>
            </div>
          </div>
        </div>

        <div className="login-image-container">
          <img src="login-image.png" alt="Register visual" className="login-image" />
        </div>
      </div>
    </div>
  );
};

export default Register;
