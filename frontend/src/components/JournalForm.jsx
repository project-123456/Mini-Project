// Example: Journal.jsx
import React, { useState } from "react";

export default function Journal() {
  const [mood, setMood] = useState("calm");

  const moodStyles = {
    happy: {
      bg: "bg-yellow-100",
      emoji: "🌻",
      text: "text-yellow-800",
    },
    calm: {
      bg: "bg-blue-100",
      emoji: "🌿",
      text: "text-blue-800",
    },
    reflective: {
      bg: "bg-purple-100",
      emoji: "🌙",
      text: "text-purple-800",
    },
    sad: {
      bg: "bg-gray-100",
      emoji: "🌧️",
      text: "text-gray-700",
    },
    healing: {
      bg: "bg-orange-100",
      emoji: "🌈",
      text: "text-orange-800",
    },
  };

  const currentMood = moodStyles[mood];

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-all duration-700 ${currentMood.bg}`}
    >
      <h1 className={`text-4xl font-bold mb-4 ${currentMood.text}`}>
        {currentMood.emoji} Write a Journal
      </h1>

      <select
        className="mb-6 px-4 py-2 rounded-lg border border-gray-300"
        onChange={(e) => setMood(e.target.value)}
      >
        <option value="happy">Happy 🌻</option>
        <option value="calm">Calm 🌿</option>
        <option value="reflective">Reflective 🌙</option>
        <option value="sad">Sad 🌧️</option>
        <option value="healing">Healing 🌈</option>
      </select>

      <div className="w-96 bg-white shadow-lg rounded-xl p-6">
        <input
          type="text"
          placeholder="Title"
          className="w-full mb-3 p-3 rounded-md border border-gray-300"
        />
        <textarea
          placeholder="How are you feeling today?"
          className="w-full p-3 h-32 rounded-md border border-gray-300"
        ></textarea>
        <button className="mt-4 bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition">
          Save ✨
        </button>
      </div>
    </div>
  );
}
