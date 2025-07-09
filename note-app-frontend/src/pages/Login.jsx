// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const verifyOtp = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
      localStorage.setItem('token', res.data.token);
      navigate('/welcome');
    } catch (err) {
      alert('Login failed');
    }
  };

  const googleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="OTP"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          onChange={(e) => setOtp(e.target.value)}
        />
        <button onClick={verifyOtp} className="w-full bg-blue-500 text-white py-2 rounded mb-4">
          Login
        </button>
        <button onClick={googleLogin} className="w-full border border-gray-400 text-black py-2 rounded">
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
