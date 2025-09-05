import React, { useState } from 'react';
import Navbar from '../../component/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Passwordinput from '../../component/Passwordinput';

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
    const mockEmail = 'sahithi@example.com';
    const mockPassword = 'Test@123';

    setTimeout(() => {
      if (email === mockEmail && password === mockPassword) {
        // Store a fake token
        localStorage.setItem('token', 'mock-token-123');
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
      setLoading(false);
    }, 500); // simulate network delay
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
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

            <p className="text-sm text-center mt-6 text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-indigo-600 font-medium underline hover:text-indigo-700">
                Sign up here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
