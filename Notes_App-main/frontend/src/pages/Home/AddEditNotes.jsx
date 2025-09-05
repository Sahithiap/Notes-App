import React, { useState } from 'react';
import { MdClose, MdCameraAlt } from 'react-icons/md';
import axiosInstance from '../../utils/axiosInstance';
import html2canvas from 'html2canvas';

const AddEditNotes = ({ type, noteData, getAllNotes, onClose }) => {
  const [title, setTitle] = useState(noteData?.title || '');
  const [content, setContent] = useState(noteData?.content || '');
  const [error, setError] = useState(null);
  const [loadingScreenshot, setLoadingScreenshot] = useState(false);

  // Add Note 
  const AddNewNote = async (noteContent = content) => {
    try {
      const response = await axiosInstance.post('/add-note', {
        title,
        content: noteContent,
        tags: [],
        isPinned: false,
      });

      if (response.data?.note) {
        getAllNotes();
        onClose();
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
    }
  };

  // Edit Note
  const EditNote = async (noteContent = content) => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put('/edit-note/' + noteId, {
        title,
        content: noteContent,
        tags: [],
        isPinned: false,
      });

      if (response.data?.note) {
        getAllNotes();
        onClose();
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
    }
  };

  // Handle form submit
  const handleSubmit = () => {
    if (!title) return setError('Please enter a title');
    if (!content) return setError('Please enter content');
    setError('');
    type === 'edit' ? EditNote() : AddNewNote();
  };

  // Capture Screenshot
  const handleScreenshot = async () => {
    setLoadingScreenshot(true);
    try {
      const canvas = await html2canvas(document.body); // capture full page
      const imgData = canvas.toDataURL('image/png');

      // Save screenshot as note content (base64)
      type === 'edit' ? EditNote(imgData) : AddNewNote(imgData);
    } catch (err) {
      console.error(err);
      setError('Failed to capture screenshot');
    }
    setLoadingScreenshot(false);
  };

  return (
    <div className="relative text-slate-800">
      {/* Close Button */}
      <button
        className="w-8 h-8 rounded-full flex items-center justify-center absolute -top-4 -right-4 hover:bg-gray-100 transition"
        onClick={onClose}
        title="Close"
      >
        <MdClose className="text-xl text-slate-400" />
      </button>

      {/* Form Heading */}
      <h2 className="text-2xl font-bold mb-4">
        {type === 'edit' ? 'Edit Note' : 'Add a New Note'}
      </h2>

      {/* Title Input */}
      <div className="flex flex-col gap-1 mb-4">
        <label className="text-sm font-medium text-gray-600">Title</label>
        <input
          type="text"
          placeholder="e.g., Meeting notes"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-base"
        />
      </div>

      {/* Content Input */}
      <div className="flex flex-col gap-1 mb-4">
        <label className="text-sm font-medium text-gray-600">Content</label>
        <textarea
          rows={8}
          placeholder="Write your note content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm resize-none bg-slate-50"
        />
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="flex-1 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition text-sm font-semibold"
        >
          {type === 'edit' ? 'Update Note' : 'Add Note'}
        </button>

        <button
          onClick={handleScreenshot}
          className="flex-1 flex items-center justify-center gap-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition text-sm font-semibold"
        >
          {loadingScreenshot ? 'Capturing...' : <><MdCameraAlt /> Screenshot</>}
        </button>
      </div>
    </div>
  );
};

export default AddEditNotes;

