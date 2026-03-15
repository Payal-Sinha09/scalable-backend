import app from "./app.js";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

dotenv.config();

// =========================
// Rate Limiting
// =========================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later."
  }
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === "production" ? 5 : 50, // ✅ 50 in dev, 5 in prod
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => process.env.NODE_ENV !== "production", // ✅ Skip in development
  message: {
    success: false,
    message: "Too many login attempts. Please try again later."
  }
});

app.use(limiter);
app.use("/api/auth/login", loginLimiter);

// =========================
// Swagger Docs
// =========================
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth API",
      version: "1.0.0",
      description: "Scalable Auth Backend API"
    },
    servers: [
      {
        url: process.env.NODE_ENV === "production"
          ? "https://scalable-backend-afac.onrender.com"
          : "http://localhost:5000"
      }
    ]
  },
  apis: ["./routes/*.js"]
};

const specs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// =========================
// Start Server
// =========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});