// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import Notes from './pages/Notes';

const App = () => {
  const token = localStorage.getItem('token');

  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/welcome" element={token ? <Welcome /> : <Navigate to="/login" />} />
      <Route path="/notes" element={token ? <Notes /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
