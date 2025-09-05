const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Register new account
exports.register = async (req, res) => {
  try {
    const { username, fullName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already in use" });

    const newUser = new User({
      username,
      fullName,
      email,
      password, // gets hashed automatically in User model pre-save
    });

    await newUser.save();
    res.status(201).json({ message: "Account created successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Update lastLogin
    user.lastLogin = new Date();
    await user.save();

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, username: user.username, email: user.email }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get logged-in user
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
