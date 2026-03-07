import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "https://scalable-backend-afac.onrender.com";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    axios.get(`${API}/api/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      setUser(res.data.user);
    })
    .catch((err) => {
      console.log("Token error:", err);
      localStorage.removeItem("token");
      navigate("/");
    });

  }, [navigate]);



  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };



  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Dashboard</h2>

      {user ? (
        <>
          <p>Welcome 🎉</p>
          <p>User ID: {user.userId}</p>

          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;