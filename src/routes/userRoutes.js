// import express from "express";
// import authMiddleware from "../middleware/authMiddleware.js";
// import {
//   getProfile,
//   updateProfile,
// } from "../controllers/userController.js";

// const router = express.Router();

// router.get("/profile", authMiddleware, getProfile);
// router.put("/profile", authMiddleware, updateProfile);

// export default router;

// import express from "express";
// import { verifyToken } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.get("/profile", verifyToken, (req, res) => {
//   res.json({
//     message: "Profile fetched successfully",
//     user: req.user
//   });
// });

// export default router;

import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { checkRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

// PROFILE ROUTE (needed for dashboard)
router.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Profile fetched successfully",
    user: req.user
  });
});

// ADMIN ROUTE
router.get("/admin", verifyToken, checkRole("admin"), (req, res) => {
  res.json({
    message: "Welcome Admin"
  });
});

export default router;