import React, { useState } from "react";
import Passwordinput from "./Passwordinput";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://notes-app-arsj.onrender.com/", 
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Login Success:", response.data);
      localStorage.setItem("token", response.data.token); // save JWT
      setError("");
      // redirect or load user dashboard
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <Passwordinput value={password} onChange={(e) => setPassword(e.target.value)} />
      <button
        type="submit"
        className="w-full bg-indigo-500 text-white py-3 rounded-md hover:bg-indigo-600 transition"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;

