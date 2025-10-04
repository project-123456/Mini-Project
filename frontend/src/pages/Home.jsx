import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <h1 className="text-5xl font-bold mb-4">Welcome to MindJournal ✨</h1>
      <p className="text-lg mb-6 max-w-lg text-center">
        Your personal space to track moods, write reflections, and grow
        emotionally every day 💜
      </p>
      <div className="space-x-4">
        <Link
          to="/register"
          className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
