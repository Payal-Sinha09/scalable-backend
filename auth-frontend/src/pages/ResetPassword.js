// import React, { useState } from "react";
// import axios from "axios";

// const API = "https://scalable-backend-afac.onrender.com";

// function ResetPassword() {

//   const [token, setToken] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {

//     e.preventDefault();

//     try {

//       const res = await axios.post(`${API}/api/auth/reset-password`, {
//         token,
//         password
//       });

//       alert(res.data.message);

//     } catch (err) {

//       alert("Reset failed");

//     }
//   };

//   return (
//     <div>
//       <h2>Reset Password</h2>

//       <form onSubmit={handleSubmit}>

//         <input
//           type="text"
//           placeholder="Enter token"
//           value={token}
//           onChange={(e) => setToken(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="New password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button type="submit">
//           Reset Password
//         </button>

//       </form>
//     </div>
//   );
// }

// export default ResetPassword;

import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API = "https://scalable-backend-afac.onrender.com";

export default function ResetPassword() {

  const { token } = useParams();

  const [password, setPassword] = useState("");

  const handleReset = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(`${API}/api/auth/reset-password`, {
        token,
        password
      });

      alert(res.data.message);

    } catch (err) {

      alert("Reset failed");

    }

  };

  return (

    <div>

      <h2>Reset Password</h2>

      <form onSubmit={handleReset}>

        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button type="submit">Reset Password</button>

      </form>

    </div>

  );
}