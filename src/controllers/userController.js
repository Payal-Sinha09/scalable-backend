import redis from "../config/redis.js";
import User from "../models/User.js";

export const getProfile = async (req, res) => {
  const userId = req.user.id;

  const cachedUser = await redis.get(`user:${userId}`);
  if (cachedUser) {
    return res.json({
      source: "cache",
      data: cachedUser,
    });
  }

  const user = await User.findById(userId).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await redis.set(`user:${userId}`, user, { ex: 60 });

  res.json({
    source: "database",
    data: user,
  });
};

export const updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { name } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { name },
    { new: true }
  ).select("-password");

  await redis.del(`user:${userId}`);

  res.json({
    message: "Profile updated successfully",
    data: updatedUser,
  });
};