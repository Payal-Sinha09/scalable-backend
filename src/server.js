// // import express from "express";
// // import dotenv from "dotenv";
// // import cors from "cors";
// // import connectDB from "./config/db.js";
// // import authRoutes from "./routes/authRoutes.js";

// // dotenv.config();

// // const app = express();

// // app.use(cors());
// // app.use(express.json()); // 👈 REQUIRED
// // app.use("/api/auth", authRoutes); // 👈 REQUIRED

// // connectDB();

// // const PORT = process.env.PORT || 5000;
// // app.get("/", (req, res) => {
// //   res.send("Backend is running successfully 🚀");
// // });
// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });
// // // ✅ TEMP Redis test
// // //   try {
// // //     await redis.set("test", "working");
// // //     const value = await redis.get("test");
// // //     console.log("Redis test value:", value);
// // //   } catch (err) {
// // //     console.error("Redis test failed:", err);
// // //   }
// // // });



// // import express from "express";
// // import dotenv from "dotenv";
// // import cors from "cors";
// // import connectDB from "./config/db.js";
// // import authRoutes from "./routes/authRoutes.js";
// // import userRoutes from "./routes/userRoutes.js";

// // dotenv.config();

// // const app = express();

// // // Connect Database
// // connectDB();

// // // CORS configuration (important for React frontend)
// // app.use(
// //   cors({
// //     origin:[
// //     "http://localhost:3000", // frontend URL
// //     "https://auth-frontend-three-delta.vercel.app"],
// //     methods: ["GET", "POST", "PUT", "DELETE"],
// //     credentials: true
// //   })
// // );

// // // Middleware
// // app.use(express.json());

// // // Routes
// // app.use("/api/auth", authRoutes);
// // app.use("/api/user", userRoutes);

// // // Test route
// // app.get("/", (req, res) => {
// //   res.send("Backend is running successfully 🚀");
// // });

// // // Start server
// // const PORT = process.env.PORT || 5000;

// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });

// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import rateLimit from "express-rate-limit";

// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
// import userRoutes from "./routes/userRoutes.js";

// import swaggerUi from "swagger-ui-express";
// import swaggerJsdoc from "swagger-jsdoc";

// dotenv.config();

// const app = express();

// // Connect Database
// connectDB();

// // =========================
// // Rate Limiting (Security)
// // =========================
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // max requests per IP
//   message: "Too many requests from this IP, please try again later."
// });

// app.use(limiter);

// // Login protection
// const loginLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 5,
//   message: "Too many login attempts. Please try again later."
// });

// app.use("/api/auth/login", loginLimiter);

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Auth API",
//       version: "1.0.0"
//     }
//   },
//   apis: ["./src/routes/*.js"]
// };

// const specs = swaggerJsdoc(options);

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// // =========================
// // CORS Configuration
// // =========================
// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000",
//       "https://auth-frontend-three-delta.vercel.app"
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true
//   })
// );
// // app.use(
// //   cors({
// //     origin: "*",
// //     methods: ["GET","POST","PUT","DELETE"],
// //     credentials: true
// //   })
// // );

// // =========================
// // Middleware
// // =========================
// app.use(express.json());

// // =========================
// // Routes
// // =========================
// app.use("/api/auth", authRoutes);
// app.use("/api/user", userRoutes);

// // =========================
// // Health Check Route
// // =========================
// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "Scalable Backend API is running 🚀",
//     status: "OK"
//   });
// });

// // =========================
// // Global Error Handler
// // =========================
// app.use((err, req, res, next) => {
//   console.error(err.stack);

//   res.status(err.status || 500).json({
//     success: false,
//     message: err.message || "Server Error"
//   });
// });

// // =========================
// // Start Server
// // =========================
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });


import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

dotenv.config();

const app = express();

// Connect Database
connectDB();

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
    allowedHeaders: ["Content-Type", "Authorization"],    // ✅ Authorization added
    credentials: true
  })
);

// ✅ Handle ALL preflight requests immediately
app.options("*", cors());

// =========================
// 2️⃣ Rate Limiting (Security)
// =========================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests from this IP, please try again later."
});

app.use(limiter);

// Login-specific rate limiter
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts. Please try again later."
});

app.use("/api/auth/login", loginLimiter);

// =========================
// 3️⃣ Swagger Docs
// =========================
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth API",
      version: "1.0.0"
    }
  },
  apis: ["./src/routes/*.js"]
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// =========================
// 4️⃣ Body Parser Middleware
// =========================
app.use(express.json());

// =========================
// 5️⃣ Routes
// =========================
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// =========================
// 6️⃣ Health Check Route
// =========================
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Scalable Backend API is running 🚀",
    status: "OK"
  });
});

// =========================
// 7️⃣ Global Error Handler
// =========================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error"
  });
});

// =========================
// 8️⃣ Start Server
// =========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});