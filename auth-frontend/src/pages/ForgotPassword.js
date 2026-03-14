import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "https://scalable-backend-afac.onrender.com";

function ForgotPassword() {

  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(`${API}/api/auth/forgot-password`, {
        email
      });

      console.log(res.data);

      const token = res.data.resetToken;

      alert("Reset Token: " + token);

      // Redirect to reset password page
      navigate(`/reset-password/${token}`);

    } catch (error) {

      console.error(error);
      alert("Error generating reset token");

    }

  };

  return (
    <div>
      <h2>Forgot Password</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">
          Send Reset Link
        </button>

      </form>
    </div>
  );
}

export default ForgotPassword;