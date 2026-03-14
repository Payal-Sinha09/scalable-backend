import React, { useState } from "react";
import axios from "axios";

const API = "https://scalable-backend-afac.onrender.com";

function ForgotPassword() {

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const res = await axios.post(`${API}/api/auth/forgot-password`, {
      email
    });

    alert("Reset Token: " + res.data.resetToken);

  } catch (error) {

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
        />

        <button type="submit">
          Send Reset Link
        </button>

      </form>
    </div>
  );
}

export default ForgotPassword;