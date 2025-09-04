const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  screenshot: {
      type: String, 
      default: null,
  },
  isPinned: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  screenshot: { type: String }, 
  tags: { type: [String], default: [] },
  isPinned: { type: Boolean, default: false },
}, { 
  timestamps: true 
});


module.exports = mongoose.model("Note", noteSchema);
