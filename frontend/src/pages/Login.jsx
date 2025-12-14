import { useState } from "react";
import { loginUser } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await loginUser({ email, password });
      // res should be { token, user }
      console.log("LOGIN RESPONSE 👉", res);
      if (!res.token) {
  throw new Error("Token not received");
}

      localStorage.setItem("token", res.token);
      setUser(res.user);
      navigate("/dashboard"); // or '/'
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4">Login</h2>
        {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full p-3 mb-3 rounded bg-gray-800 text-white" required />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-3 mb-4 rounded bg-gray-800 text-white" required />
        <button className="w-full bg-indigo-500 text-white py-3 rounded">Login</button>
      </form>
    </div>
  );
}
