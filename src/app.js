import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

// app.get("/", (req, res) => {
//   res.send("API is running 🚀");
// });

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Scalable Backend API is running 🚀",
    status: "OK"
  });
});

export default app;