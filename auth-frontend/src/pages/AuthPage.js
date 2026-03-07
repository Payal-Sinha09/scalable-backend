import React, { useState } from "react";
import axios from "axios";
import "../styles/auth.css";

const API = "https://scalable-backend-afac.onrender.com";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isLogin
        ? `${API}/api/auth/login`
        : `${API}/api/auth/register`;

      const res = await axios.post(url, { email, password });

      alert(res.data.message || "Success");
    } catch (err) {
      alert(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2>{isLogin ? "Login" : "Register"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="main-btn">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="switch-text">
          {isLogin ? "New user?" : "Already have an account?"}
        </p>

        <button
          className="switch-btn"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Register Here" : "Login Here"}
        </button>

      </div>
    </div>
  );
}