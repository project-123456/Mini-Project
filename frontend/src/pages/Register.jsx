import { useState } from "react";
import { registerUser } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await registerUser({ name, email, password });
      if (res.token) {
        localStorage.setItem("token", res.token);
        navigate("/");
      } else {
        setError(res.message || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-sky-400 via-indigo-500 to-purple-600 relative overflow-hidden">
      {/* Floating circles background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-pink-400/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20"
      >
        <h2 className="text-4xl font-bold mb-6 text-center text-white drop-shadow-md">
          Create Account
        </h2>

        {error && (
          <p className="bg-red-500/80 text-white p-2 rounded mb-4 text-center">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
          />
          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="mt-6 w-full bg-gradient-to-r from-sky-400 to-purple-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Register
        </motion.button>

        <p className="text-center text-sm text-white/80 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-sky-300 hover:underline cursor-pointer"
          >
            Log in
          </span>
        </p>
      </motion.form>
    </div>
  );
}
