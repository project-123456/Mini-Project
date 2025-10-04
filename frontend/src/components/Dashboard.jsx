import { FaSmile, FaBook } from "react-icons/fa";
export default function Dashboard({ user }) {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
  <div className="max-w-6xl mx-auto">
    <h1 className="text-3xl font-bold mb-2">Welcome back, 👋</h1>
    <p className="text-gray-500 mb-6">
      Track your mood, write journals, and take care of your mental health ❤️
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Mood Tracker Card */}
      <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl hover:scale-105 transform transition cursor-pointer">
        <FaSmile className="text-3xl text-yellow-400 mb-2" />
        <h2 className="text-xl font-semibold mb-2">Mood Tracker</h2>
        <p className="text-gray-400">Log your feelings and view trends.</p>
      </div>

      {/* Journal Card */}
      <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl hover:scale-105 transform transition cursor-pointer">
        <FaBook className="text-3xl text-blue-400 mb-2" />
        <h2 className="text-xl font-semibold mb-2">Journal</h2>
        <p className="text-gray-400">Write daily entries and reflect on growth.</p>
      </div>
    </div>
  </div>
</div>

  );
}
