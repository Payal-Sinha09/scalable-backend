import React,{useState} from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

const API = "https://scalable-backend-afac.onrender.com";

export default function Register(){

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async(e)=>{
    e.preventDefault();

    try{

      await axios.post(`${API}/api/auth/register`,{
        email,
        password
      });

      alert("Registration successful");

      navigate("/");

    }catch(err){

      alert("Registration failed");

    }
  };

  return(

    <div className="auth-container">

      <div className="auth-card">

        <h2>Register</h2>

        <form onSubmit={handleRegister}>

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

          <button className="main-btn">Register</button>

        </form>

        <p className="switch-text">Already have an account?</p>

        <Link to="/">
          <button className="switch-btn">Login Here</button>
        </Link>

      </div>

    </div>

  );

}