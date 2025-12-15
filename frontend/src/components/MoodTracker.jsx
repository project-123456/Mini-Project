import { useState, useEffect } from "react";
import { logMood, getMoods } from "../utils/api";
import { motion } from "framer-motion";

const MOODS = [
  { label: "rad", value: "happy", emoji: "😄", color: "text-emerald-500" },
  { label: "good", value: "calm", emoji: "🙂", color: "text-lime-500" },
  { label: "meh", value: "neutral", emoji: "😐", color: "text-sky-500" },
  { label: "bad", value: "sad", emoji: "😔", color: "text-orange-500" },
  { label: "awful", value: "anxious", emoji: "😣", color: "text-red-500" },
];

// 🔒 Safe formatter
const formatDateTime = (dateString) => {
  if (!dateString) return {};
  const date = new Date(dateString);

  return {
    date: date.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    time: date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};

export default function MoodTracker({ token }) {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      getMoods(token).then(setMoods);
    }
  }, [token]);

  const handleSelectMood = async (moodValue) => {
    if (loading) return;
    setLoading(true);

    const res = await logMood({ mood: moodValue }, token);
    if (res?._id) {
      setMoods((prev) => [res, ...prev]);
    }

    setLoading(false);
  };

  const now = formatDateTime(new Date());

  return (
    <div className="min-h-screen bg-[#f4ede4] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-8">

        {/* Header */}
        <h2 className="text-xl font-semibold text-center text-[#2f3f3f]">
          How are you?
        </h2>

        {/* Date & Time */}
        <p className="text-center text-xs text-gray-500 mt-2">
          Today, {now.date} • {now.time}
        </p>

        {/* Emoji Selector */}
        <div className="flex justify-between mt-8">
          {MOODS.map((m) => (
            <motion.button
              key={m.value}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => handleSelectMood(m.value)}
              className="flex flex-col items-center"
            >
              <div
                className={`text-4xl ${m.color} ${
                  loading ? "opacity-50" : ""
                }`}
              >
                {m.emoji}
              </div>
              <span className="text-xs mt-1 text-gray-500">
                {m.label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-300 my-8 opacity-50" />

        {/* Mood History */}
        <h3 className="text-sm font-semibold text-gray-600 mb-3">
          Mood History
        </h3>

        <div className="space-y-2 max-h-48 overflow-y-auto">
          {moods.length === 0 && (
            <p className="text-sm text-gray-400 text-center">
              No moods logged yet
            </p>
          )}

          {moods.map((m) => {
            const { date, time } = formatDateTime(m.createdAt);

            return (
              <div
                key={m._id}
                className="flex justify-between items-center bg-white/60 rounded-xl px-4 py-2"
              >
                <span className="capitalize text-gray-700">
                  {m.mood}
                </span>
                <span className="text-xs text-gray-400 text-right">
                  {date}
                  <br />
                  {time}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
