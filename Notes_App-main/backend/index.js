require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const notesRoutes = require("./routes/notes.routes");

const app = express();

// 🔗 Connect Database
connectDB();

// 🌍 CORS configuration
const corsOptions = {
  origin: [
    "https://notes-app-wcr7.vercel.app", // Vercel frontend
    "http://localhost:5173"              // Local dev frontend
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

// Apply CORS
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests

// 📦 Middleware
app.use(express.json({ limit: "10mb" }));

// 🏠 Root route
app.get("/", (req, res) => {
  res.send("✅ NotesApp backend is running!");
});

// 📌 API routes
app.use("/auth", authRoutes);
app.use("/notes", notesRoutes);

// 🌐 Server listen
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});

module.exports = app;

