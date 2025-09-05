const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Token = require("../models/token.model");

// Register new user
exports.register = async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ error: true, message: "All fields required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ error: true, message: "User already exists" });
  }

  const newUser = new User({ fullName, email, password });
  await newUser.save();

  const accessToken = jwt.sign(
    { userId: newUser._id, email: newUser.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  await new Token({ userId: newUser._id, token: accessToken }).save();

  return res.status(201).json({ success: true, accessToken });
};

// Log in existing user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: true, message: "All fields required" });
  }

  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    return res.status(401).json({ error: true, message: "Invalid credentials" });
  }

  const accessToken = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  await new Token({ userId: user._id, token: accessToken }).save();

  return res.json({ success: true, accessToken });
};
