const express = require("express");
const router = express.Router();

const { register, login, getUser } = require("../controllers/auth.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

// Register
router.post("/create-account", register);

// Login
router.post("/login", login);

// Get logged-in user
router.get("/get-user", authenticateToken, getUser);

module.exports = router;

