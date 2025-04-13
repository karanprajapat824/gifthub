import React, { useState,useContext} from 'react';
import { FaEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FaEyeSlash } from "react-icons/fa";
import {AuthContext} from './../App';
import './../css/Login.css';

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [showPassword,setShowPassword] = useState(false);
    const {handleLogin,login} = useContext(AuthContext);
    const navigateTo = useNavigate();
    const [message,setMessage] = useState("");

    const doLogin = async ()=>{
        const result = await handleLogin(email,password);
        if(result == "success")
        {
            setMessage(result);
            navigateTo("/");
        }
        else {
            setMessage("*"+result);
        }
    }

    const handleEmail = (e)=>{
        setMessage("");
        setEmail(e.target.value);
    }
    
    const handlePassword = (e)=>{
        setMessage("");
        setPassword(e.target.value);
    }

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-form-container">
          <div className="login-form">
            <h1>Welcome Back</h1>
            <p className="subtitle">Please enter your credentials to login</p>
            
            <div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="Enter your email" 
                  className="form-input"
                  onChange={handleEmail}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className='password-field'>
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  placeholder="Enter your password" 
                  className="form-input"
                  onChange={handlePassword}
                />
                <div onClick={()=>setShowPassword(!showPassword)}>
                {
                    showPassword ? 
                    <FaEye className='password-icons'/>
                    : <FaEyeSlash  className='password-icons'/>
                }
                </div>
                </div>
              </div>
              <div className="messages">
              <div className="error-message">
                {message}
              </div>
              <div className="forgot-password">
                <a href="/forgot-password">Forgot password?</a>
              </div>
              </div>
              <button onClick={doLogin} className="login-button">Login</button>
              
              <div className="register-link">
                Don't have an account? <a href="/register">Create one here</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="login-image-container">
          <img src="login-image.png" alt="Login visual" className="login-image" />
        </div>
      </div>
    </div>
  );
};

export default Login;