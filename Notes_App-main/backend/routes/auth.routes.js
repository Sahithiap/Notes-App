const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

// Create new user account
router.post("/create-account", authController.register);

// Login user
router.post("/login", authController.login);

// Get logged-in user (protected route)
router.get("/get-user", authenticateToken, authController.getUser);

module.exports = router;
