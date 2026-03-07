import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

const API = "https://scalable-backend-afac.onrender.com";

export default function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try{
      const res = await axios.post(`${API}/api/auth/login`,{
        email,
        password
      });

      alert("Login successful");

      navigate("/dashboard");

    }catch(err){
      alert("Login failed");
    }
  };

  return(
    <div className="auth-container">

      <div className="auth-card">

        <h2>Login</h2>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button className="main-btn">Login</button>

        </form>

        <p className="switch-text">New User?</p>

        <Link to="/register">
          <button className="switch-btn">Register Here</button>
        </Link>

      </div>

    </div>
  );
}