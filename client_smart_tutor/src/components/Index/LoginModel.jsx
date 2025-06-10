import React, { useState } from 'react';

const LoginModel = ({ onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
            alert('Login successful!');
            localStorage.setItem("loggedInUser", JSON.stringify(data.user));
            window.location.href = "index.html";
          } else {
            alert(data.error || 'Invalid login');
          }
      } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred. Please try again.');
      }

    onClose();
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full text-white">
      <div className="bg-gray-800 rounded-lg shadow-lg w-80 p-6 relative">
        <h2 className="text-white text-2xl mb-6 text-center font-semibold">Log In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="loginUsername" className="block mb-1 text-gray-300 font-medium">
              Username:
            </label>
            <input
              type="text"
              id="loginUsername"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="loginPassword" className="block mb-1 text-gray-300 font-medium">
              Password:
            </label>
            <input
              type="password"
              id="loginPassword"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModel;
