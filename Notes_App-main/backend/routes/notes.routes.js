const express = require("express");
const router = express.Router();
const { addNote, editNote, getAllNotes, deleteNote } = require("../controllers/notes.controller");
const { authenticateToken } = require("../middleware/auth.middleware");
const Note = require("../models/note.model"); // import Note model

// Existing routes
router.post("/add-note", authenticateToken, addNote);
router.put("/edit-note/:id", authenticateToken, editNote);
router.get("/all-notes", authenticateToken, getAllNotes);
router.delete("/delete-note/:id", authenticateToken, deleteNote);

// ✅ New route: Add screenshot & pin note
router.post("/add-screenshot", authenticateToken, async (req, res) => {
  try {
    const { title, screenshot } = req.body;

    if (!screenshot || !screenshot.startsWith("data:image")) {
      return res.status(400).json({ message: "Invalid screenshot data" });
    }

    const newNote = new Note({
      title: title || "Screenshot Note",
      content: "Screenshot captured",
      screenshot,
      isPinned: true, // always pinned if screenshot
      userId: req.user.id,
    });

    await newNote.save();
    res.status(201).json({ note: newNote });
  } catch (err) {
    res.status(500).json({ message: "Failed to save screenshot", error: err.message });
  }
});

module.exports = router;

