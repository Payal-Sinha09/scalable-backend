import app from "./app.js";
import redis from "./config/redis.js";   // ✅ IMPORT REDIS

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  // ✅ TEMP Redis test
  try {
    await redis.set("test", "working");
    const value = await redis.get("test");
    console.log("Redis test value:", value);
  } catch (err) {
    console.error("Redis test failed:", err);
  }
});