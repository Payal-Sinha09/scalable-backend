// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";

// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
// import userRoutes from "./routes/userRoutes.js";

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// // app.use(
// //   cors({
// //     origin: [
// //       "http://localhost:3000",
// //       "https://auth-frontend-three-delta.vercel.app",
// //       /vercel\.app$/
// //     ],
// //     methods: ["GET", "POST", "PUT", "DELETE"],
// //     allowedHeaders: ["Content-Type", "Authorization"],
// //   })
// // );
// // app.use(
// //   cors({
// //     origin: [
// //       "http://localhost:3000",
// //       "https://auth-frontend-three-delta.vercel.app",
// //       /vercel\.app$/
// //     ],
// //     methods: ["GET", "POST", "PUT", "DELETE"],
// //     credentials: true
// //   })
// // );
// app.use(express.json());

// // Connect Database
// connectDB();

// // Test Route
// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "Scalable Backend API is running 🚀",
//     status: "OK"
//   });
// });

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/user", userRoutes);

// export default app;

import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// =========================
// 1️⃣ CORS — MUST BE FIRST
// =========================
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://auth-frontend-three-delta.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // ✅ OPTIONS added
    allowedHeaders: ["Content-Type", "Authorization"],    // ✅ Needed for JWT
    credentials: true                                     // ✅ Needed for cookies/auth
  })
);

//app.options("/*", cors()); // ✅ Handle preflight for all routes

// =========================
// 2️⃣ Body Parser
// =========================
app.use(express.json());

// =========================
// 3️⃣ Connect Database
// =========================
connectDB();

// =========================
// 4️⃣ Health Check
// =========================
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Scalable Backend API is running 🚀",
    status: "OK"
  });
});

// =========================
// 5️⃣ Routes
// =========================
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

export default app;