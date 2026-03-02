const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const redisClient = require("../config/redis");

/**
 * REGISTER USER
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};

/**
 * LOGIN USER
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};

/**
 * GET USER PROFILE (CACHED)
 */
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const cacheKey = `user:${userId}`;

    // 1️⃣ Check Redis cache
    const cachedUser = await redisClient.get(cacheKey);
    if (cachedUser) {
      return res.json({
        source: "cache",
        data: JSON.parse(cachedUser),
      });
    }

    // 2️⃣ Fetch from database
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3️⃣ Store in Redis (TTL = 1 hour)
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(user));

    res.json({
      source: "database",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile", error });
  }
};