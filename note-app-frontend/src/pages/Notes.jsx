// src/pages/Notes.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');

  const fetchNotes = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/notes', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setNotes(res.data);
  };

  const addNote = async () => {
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:5000/api/notes', { content: input }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setInput('');
    fetchNotes();
  };

  const deleteNote = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:5000/api/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Your Notes</h2>
        <div className="flex mb-4 gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a note..."
            className="flex-1 p-2 border border-gray-300 rounded"
          />
          <button onClick={addNote} className="bg-green-500 text-white px-4 rounded">Add</button>
        </div>
        <ul className="space-y-2">
          {notes.map(note => (
            <li key={note._id} className="bg-gray-100 p-3 rounded flex justify-between items-center">
              <span>{note.content}</span>
              <button onClick={() => deleteNote(note._id)} className="text-red-500 hover:text-red-700">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notes;
