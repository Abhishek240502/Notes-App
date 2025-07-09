// src/pages/Welcome.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-purple-300 to-indigo-300 p-4">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome!</h1>
        <p className="mb-6 text-gray-600">You have successfully signed in.</p>
        <button
          onClick={() => navigate('/notes')}
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Welcome;
