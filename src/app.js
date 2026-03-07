import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// Middleware
// app.use(cors());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://auth-frontend-three-delta.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);
app.use(express.json());

// Connect Database
connectDB();

// Test Route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Scalable Backend API is running 🚀",
    status: "OK"
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

export default app;