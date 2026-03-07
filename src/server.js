// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json()); // 👈 REQUIRED
// app.use("/api/auth", authRoutes); // 👈 REQUIRED

// connectDB();

// const PORT = process.env.PORT || 5000;
// app.get("/", (req, res) => {
//   res.send("Backend is running successfully 🚀");
// });
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// // ✅ TEMP Redis test
// //   try {
// //     await redis.set("test", "working");
// //     const value = await redis.get("test");
// //     console.log("Redis test value:", value);
// //   } catch (err) {
// //     console.error("Redis test failed:", err);
// //   }
// // });



import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// Connect Database
connectDB();

// CORS configuration (important for React frontend)
app.use(
  cors({
    origin: "http://localhost:3000", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});