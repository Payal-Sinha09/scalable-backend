import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>

        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Register Page */}
        <Route path="/register" element={<Register />} />

        {/* Dashboard Page */}
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </Router>
  );
}

export default App;