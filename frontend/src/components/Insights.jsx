import React from "react";

export default function Insights({ moods = [], journals = [] }) {
  // 🧠 Mood calculation
  const moodCount = {};
  moods.forEach((m) => {
    moodCount[m.mood] = (moodCount[m.mood] || 0) + 1;
  });

  const dominantMood =
    Object.keys(moodCount).length > 0
      ? Object.keys(moodCount).reduce((a, b) =>
          moodCount[a] > moodCount[b] ? a : b
        )
      : "No data";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6fdf8] to-[#eef7f3] px-4 sm:px-6 py-10">
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-10">
        Insights & Reflections 🌿
      </h1>

      {/* Cards wrapper */}
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Mood Insights */}
        <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">
            Mood Insights 📊
          </h2>
          <p className="text-gray-700 text-sm sm:text-base">
            Dominant Mood:{" "}
            <span className="font-semibold text-green-600">
              {dominantMood}
            </span>
          </p>
        </div>

        {/* Journal Insights */}
        <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">
            Journal Insights ✍️
          </h2>
          <p className="text-gray-700 text-sm sm:text-base">
            Overall Reflection:{" "}
            <span className="font-semibold text-blue-600">
              {journals.length > 0 ? "Positive 😊" : "Start journaling ✨"}
            </span>
          </p>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Journaling helps you process thoughts & emotions clearly.
          </p>
        </div>

        {/* Weekly Reflection */}
        <div className="bg-green-50 rounded-2xl shadow-md p-5 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">
            Weekly Reflection 📅
          </h2>
          <p className="text-gray-700 text-sm sm:text-base">
            Is week aapke liye sabse meaningful moment kya tha?
          </p>
          <p className="text-gray-500 text-xs sm:text-sm mt-2">
            Total journal entries: {journals.length}
          </p>
        </div>
      </div>
    </div>
  );
}
