// src/pages/Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const sendOtp = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/send-otp', { email });
      setOtpSent(true);
    } catch (err) {
      alert('Failed to send OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
      localStorage.setItem('token', res.data.token);
      navigate('/welcome');
    } catch (err) {
      alert('OTP verification failed');
    }
  };

  const googleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
        <input
          type="email"
          className="w-full border border-gray-300 rounded p-2 mb-4"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {otpSent && (
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2 mb-4"
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
          />
        )}
        {!otpSent ? (
          <button onClick={sendOtp} className="w-full bg-blue-500 text-white py-2 rounded mb-4">
            Send OTP
          </button>
        ) : (
          <button onClick={verifyOtp} className="w-full bg-green-500 text-white py-2 rounded mb-4">
            Verify OTP
          </button>
        )}
        <button onClick={googleLogin} className="w-full border border-gray-400 text-black py-2 rounded">
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Signup;
