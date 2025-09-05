const Note = require("../models/note.model");

// ➕ Add Note (with screenshot, tags, pin)
exports.addNote = async (req, res) => {
  try {
    const { title, content, screenshot, tags = [], isPinned = false } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: true, message: "Title and Content are required" });
    }

    const note = new Note({
      title,
      content,
      screenshot: screenshot || null,
      tags,
      isPinned,
      userId: req.user.id, // ✅ from JWT middleware
    });

    await note.save();
    return res.status(201).json({ error: false, message: "Note added successfully", note });

  } catch (err) {
    res.status(500).json({ error: true, message: "Failed to add note", details: err.message });
  }
};

// ✏️ Edit Note
exports.editNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, screenshot, tags, isPinned } = req.body;

    const note = await Note.findOne({ _id: id, userId: req.user.id });
    if (!note) return res.status(404).json({ error: true, message: "Note not found" });

    if (title) note.title = title;
    if (content) note.content = content;
    if (typeof isPinned !== "undefined") note.isPinned = isPinned;
    if (screenshot !== undefined) note.screenshot = screenshot;
    if (tags) note.tags = tags;

    await note.save();
    return res.json({ error: false, message: "Note updated successfully", note });

  } catch (err) {
    res.status(500).json({ error: true, message: "Failed to update note", details: err.message });
  }
};

// 📋 Get All Notes (user-specific)
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id }).sort({ createdAt: -1 });
    return res.json({ error: false, notes, message: "Notes fetched successfully" });
  } catch (err) {
    res.status(500).json({ error: true, message: "Failed to fetch notes", details: err.message });
  }
};

// ❌ Delete Note
exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findOne({ _id: id, userId: req.user.id });
    if (!note) return res.status(404).json({ error: true, message: "Note not found" });

    await note.deleteOne();
    return res.json({ error: false, message: "Note deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: true, message: "Failed to delete note", details: err.message });
  }
};


