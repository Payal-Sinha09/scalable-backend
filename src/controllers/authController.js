// // import User from "../models/User.js";
// // import bcrypt from "bcryptjs";
// // import jwt from "jsonwebtoken";

// // export const register = async (req, res) => {
// //   const { name, email, password } = req.body;

// //   const existingUser = await User.findOne({ email });
// //   if (existingUser) {
// //     return res.status(400).json({ message: "User already exists" });
// //   }

// //   const hashedPassword = await bcrypt.hash(password, 10);

// //   const user = await User.create({
// //     name,
// //     email,
// //     password: hashedPassword,
// //   });

// //   res.status(201).json({ message: "User registered successfully" });
// // };

// // export const login = async (req, res) => {
// //   const { email, password } = req.body;

// //   const user = await User.findOne({ email });
// //   if (!user) {
// //     return res.status(400).json({ message: "Invalid credentials" });
// //   }

// //   const isMatch = await bcrypt.compare(password, user.password);
// //   if (!isMatch) {
// //     return res.status(400).json({ message: "Invalid credentials" });
// //   }

// //   const token = jwt.sign(
// //     { id: user._id },
// //     process.env.JWT_SECRET,
// //     { expiresIn: "1h" }
// //   );

// //   res.json({ token });
// // };

// // import User from "../models/User.js";
// // import bcrypt from "bcryptjs";
// // import jwt from "jsonwebtoken";
// // import logger from "../utils/logger.js";
// // import crypto from "crypto";

// // // REGISTER USER
// // export const register = async (req, res) => {
// //   try {

// //     const { email, password } = req.body;

// //     const existingUser = await User.findOne({ email });

// //     if (existingUser) {
// //       return res.status(400).json({ message: "User already exists" });
// //     }

// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     const user = new User({
// //       email,
// //       password: hashedPassword
// //     });

// //     await user.save();

// //     res.status(201).json({
// //       message: "User registered successfully"
// //     });

// //   } catch (error) {
// //     res.status(500).json({
// //       message: "Server error"
// //     });
// //   }
// // };


// // // LOGIN USER
// // export const login = async (req, res) => {
// //   try {

// //     const { email, password } = req.body;

// //     const user = await User.findOne({ email });

// //     if (!user) {
// //       return res.status(400).json({
// //         message: "User not found"
// //       });
// //     }

// //     const isMatch = await bcrypt.compare(password, user.password);

// //     if (!isMatch) {
// //       return res.status(400).json({
// //         message: "Invalid password"
// //       });
// //     }

// //     const token = jwt.sign(
// //       { userId: user._id, email: user.email },
// //       process.env.JWT_SECRET,
// //       { expiresIn: "1h" }
// //     );

// //     logger.info(`User login: ${email}`);

// //     res.json({
// //       message: "Login successful",
// //       token
// //     });

// //   } catch (error) {
// //     res.status(500).json({
// //       message: "Server error"
// //     });
// //   }
// // };

// // export const forgotPassword = async (req, res) => {
// //   try {

// //     const { email } = req.body;

// //     const user = await User.findOne({ email });

// //     if (!user) {
// //       return res.status(404).json({ message: "User not found" });
// //     }

// //     // Generate reset token
// //     const resetToken = crypto.randomBytes(20).toString("hex");

// //     user.resetPasswordToken = resetToken;
// //     user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

// //     await user.save();

// //     res.json({
// //       message: "Password reset token generated",
// //       resetToken
// //     });

// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// // export const resetPassword = async (req, res) => {
// //   try {

// //     const { token, password } = req.body;

// //     const user = await User.findOne({
// //       resetPasswordToken: token,
// //       resetPasswordExpire: { $gt: Date.now() }
// //     });

// //     if (!user) {
// //       return res.status(400).json({ message: "Invalid or expired token" });
// //     }

// //     user.password = password;

// //     user.resetPasswordToken = undefined;
// //     user.resetPasswordExpire = undefined;

// //     await user.save();

// //     res.json({ message: "Password reset successful" });

// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import logger from "../utils/logger.js";
// import crypto from "crypto";
// //import sendEmail from "../utils/sendEmail.js";


// // REGISTER USER
// export const register = async (req, res) => {
//   try {

//     const { email, password } = req.body;

//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({
//       email,
//       password: hashedPassword
//     });

//     await user.save();

//     res.status(201).json({
//       message: "User registered successfully"
//     });

//   } catch (error) {

//     logger.error(error.message);

//     res.status(500).json({
//       message: "Server error"
//     });

//   }
// };


// // LOGIN USER
// export const login = async (req, res) => {
//   try {

//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({
//         message: "User not found"
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({
//         message: "Invalid password"
//       });
//     }

//     const token = jwt.sign(
//       { userId: user._id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     //logger.info(`User login: ${email}`);

//     res.json({
//       message: "Login successful",
//       token
//     });

//   } catch (error) {

//     logger.error(error.message);

//     res.status(500).json({
//       message: "Server error"
//     });

//   }
// };


// // FORGOT PASSWORD
// export const forgotPassword = async (req, res) => {
//   try {

//     const { email } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Generate reset token
//     const resetToken = crypto.randomBytes(20).toString("hex");

//     user.resetPasswordToken = resetToken;
//     user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

//     await user.save();

//     // Instead of sending email, return token
//     res.json({
//       message: "Reset token generated",
//       resetToken: resetToken
//     });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
// // RESET PASSWORD
// export const resetPassword = async (req, res) => {
//   try {

//     const { token, password } = req.body;

//     const user = await User.findOne({
//       resetPasswordToken: token,
//       resetPasswordExpire: { $gt: Date.now() }
//     });

//     if (!user) {
//       return res.status(400).json({ message: "Invalid or expired token" });
//     }

//     // HASH PASSWORD BEFORE SAVING
//     const hashedPassword = await bcrypt.hash(password, 10);
//     user.password = hashedPassword;

//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;

//     await user.save();

//     res.json({ message: "Password reset successful" });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";
import crypto from "crypto";

// =========================
// REGISTER USER
// =========================
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({ email, password: hashedPassword });
    await user.save();

    logger.info(`New user registered: ${email}`);

    res.status(201).json({
      success: true,
      message: "User registered successfully"
    });

  } catch (error) {
    logger.error(`Register error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// =========================
// LOGIN USER
// =========================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"  // ✅ Generic message for security
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"  // ✅ Generic message for security
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    logger.info(`User logged in: ${email}`);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email
      }
    });

  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// =========================
// FORGOT PASSWORD
// =========================
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    logger.info(`Password reset token generated for: ${email}`);

    res.status(200).json({
      success: true,
      message: "Reset token generated",
      resetToken  // In production, send via email instead
    });

  } catch (error) {
    logger.error(`Forgot password error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// =========================
// RESET PASSWORD
// =========================
export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        success: false,
        message: "Token and new password are required"
      });
    }

    // Find user with valid token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token"
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    // Clear reset token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    logger.info(`Password reset successful for: ${user.email}`);

    res.status(200).json({
      success: true,
      message: "Password reset successful"
    });

  } catch (error) {
    logger.error(`Reset password error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};