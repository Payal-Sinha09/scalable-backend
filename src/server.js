import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(express.json()); // 👈 REQUIRED
app.use("/api/auth", authRoutes); // 👈 REQUIRED

connectDB();

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
//   // ✅ TEMP Redis test
//   try {
//     await redis.set("test", "working");
//     const value = await redis.get("test");
//     console.log("Redis test value:", value);
//   } catch (err) {
//     console.error("Redis test failed:", err);
//   }
// });