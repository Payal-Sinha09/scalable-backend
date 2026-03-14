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
      console.log(err.response);
      localStorage.removeItem("token");
      navigate("/");
    });

  }, [navigate]);


  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };


  return (

    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #4facfe, #00f2fe)",
        color: "white",
        fontFamily: "Arial"
      }}
    >

      <h1>Dashboard</h1>

      {user ? (
        <>
          <h2>Welcome {user.email}🎉</h2>
          <p>Email: {user.email}</p>

          <button
            onClick={logout}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}

    </div>

  );
}

export default Dashboard;