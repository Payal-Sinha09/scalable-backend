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
const allowedOrigins = [
  "http://localhost:3000",
  "https://auth-frontend-three-delta.vercel.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS policy: Origin ${origin} not allowed`));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

// ✅ Handle preflight for all routes
app.options("*", cors());

// =========================
// 2️⃣ Body Parser
// =========================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================
// 3️⃣ Connect Database
// =========================
connectDB();

// =========================
// 4️⃣ Health Check
// =========================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Scalable Backend API is running 🚀",
    status: "OK",
    environment: process.env.NODE_ENV
  });
});

// =========================
// 5️⃣ Routes
// =========================
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// =========================
// 6️⃣ 404 Handler
// =========================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// =========================
// 7️⃣ Global Error Handler
// =========================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

export default app;