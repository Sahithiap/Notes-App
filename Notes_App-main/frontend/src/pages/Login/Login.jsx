import React, { useState } from 'react';
import Navbar from '../../component/Navbar';
import Passwordinput from '../../component/Passwordinput';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Hardcoded credentials
    const validEmail = 'sahithi@example.com';
    const validPassword = 'Test@123';

    if (email !== validEmail || password !== validPassword) {
      setError('Invalid email or password');
      setLoading(false);
      return;
    }

    // Save a mock token
    localStorage.setItem('token', 'mock-token-12345');
    navigate('/dashboard');
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="w-full max-w-md border rounded-lg bg-white shadow-md px-7 py-10">
          <form onSubmit={handleLogin}>
            <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
              Welcome Back 👋
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <Passwordinput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 text-sm mt-2 mb-4">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md text-white font-semibold transition ${
                loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
