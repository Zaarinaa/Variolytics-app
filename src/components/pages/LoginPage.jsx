import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === 'password123') {
      localStorage.setItem('username', username);
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="h-screen flex-1 items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 mt-[100px] mb-[100px] mx-auto rounded-lg shadow-lg w-full max-w-lg border-2 border-gray-700">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Welcome Back</h2>

        <div className="mb-6">
          <label className="block text-gray-300 font-medium mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-900"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-900"
            placeholder="Enter your password"
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-orange-500 text-white p-3 rounded-lg font-semibold hover:bg-orange-600 transition duration-300">
          Login
        </button>

        <p className="text-center text-gray-400 mt-6">
          Don't have an account?{' '}
          <a href="/register" className="text-orange-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
