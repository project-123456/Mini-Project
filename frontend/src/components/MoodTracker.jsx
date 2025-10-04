import { useState, useEffect } from "react";
import { logMood, getMoods } from "../utils/api";

export default function MoodTracker({ token }) {
  const [mood, setMood] = useState("");
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    if (token) {
      getMoods(token).then(setMoods);
    }
  }, [token]);

  const handleLogMood = async () => {
    if (!mood) return;
    const res = await logMood({ mood }, token);
    if (res._id) setMoods([res, ...moods]);
    setMood("");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Mood Tracker 😊</h2>

      <div className="flex gap-3 mb-4">
        {["Happy", "Sad", "Calm", "Anxious", "Excited"].map((m) => (
          <button
            key={m}
            onClick={() => setMood(m)}
            className={`px-3 py-2 rounded-full border ${
              mood === m
                ? "bg-indigo-600 text-white"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <button
        onClick={handleLogMood}
        className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
      >
        Log Mood
      </button>

      <div className="mt-6">
        <h3 className="text-lg font-bold mb-2">Mood History</h3>
        <ul className="space-y-2">
          {moods.map((m, i) => (
            <li
              key={i}
              className="border-b pb-1 text-gray-600 flex justify-between"
            >
              <span>{m.mood}</span>
              <span className="text-sm text-gray-400">
                {new Date(m.createdAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
