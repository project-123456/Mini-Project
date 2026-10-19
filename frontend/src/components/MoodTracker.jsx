import { useState, useEffect } from "react";
import { logMood, getMoods, predictEmotion } from "../utils/api";
import { motion } from "framer-motion";

const MOODS = [
  { label: "rad", value: "happy", emoji: "😄", color: "text-emerald-500" },
  { label: "good", value: "calm", emoji: "🙂", color: "text-lime-500" },
  { label: "meh", value: "neutral", emoji: "😐", color: "text-sky-500" },
  { label: "bad", value: "sad", emoji: "😔", color: "text-orange-500" },
  { label: "awful", value: "anxious", emoji: "😣", color: "text-red-500" },
];

// Safe date formatter
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

  // Voice emotion states
  const [recording, setRecording] = useState(false);
  const [emotion, setEmotion] = useState("");

  // Load mood history
  useEffect(() => {
  if (!token) {
    setMoods([]);
    return;
  }

  let active = true;

  getMoods(token)
    .then((data) => {
      if (active) {
        setMoods(Array.isArray(data) ? data : []);
      }
    })
    .catch((error) => {
      console.error("Failed to load mood history:", error);
      if (active) setMoods([]);
    });

  return () => {
    active = false;
  };
}, [token]);

  // Select manual mood
  const handleSelectMood = async (moodValue) => {
    if (loading) return;

    setLoading(true);

    try {
      const res = await logMood(
        {
          mood: moodValue,
        },
        token
      );

      if (res?._id) {
        setMoods((prev) => [res, ...prev]);
      }
    } catch (error) {
      console.error("Mood logging error:", error);
      alert("Unable to save mood.");
    } finally {
      setLoading(false);
    }
  };

  // Voice emotion prediction
  const handleVoiceUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Clear previous emotion
    setEmotion("");

    // Start analyzing
    setRecording(true);

    try {
      const result = await predictEmotion(file);

      console.log("ML Prediction:", result);

      if (result?.emotion) {
        setEmotion(result.emotion);
      } else if (result?.error) {
        alert(result.error);
      } else {
        alert("Emotion could not be detected.");
      }
    } catch (error) {
      console.error("Voice emotion error:", error);
      alert("Unable to analyze voice. Please try again.");
    } finally {
      setRecording(false);

      // Reset file input
      e.target.value = "";
    }
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

        {/* Manual Mood Selector */}
        <div className="flex justify-between mt-8">
          {MOODS.map((m) => (
            <motion.button
              key={m.value}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => handleSelectMood(m.value)}
              disabled={loading}
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

        {/* Voice Emotion Detection */}
        <div className="mt-8 text-center">

          <h3 className="text-sm font-semibold text-gray-600 mb-3">
            🎤 Detect Emotion from Voice
          </h3>

          <label
            className={`inline-block cursor-pointer text-white px-5 py-2 rounded-full transition ${
              recording
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#6a8c68] hover:bg-[#789b74]"
            }`}
          >
            {recording ? "Analyzing... 🎧" : "Upload Voice 🎙️"}

            <input
              type="file"
              accept="audio/*"
              onChange={handleVoiceUpload}
              disabled={recording}
              className="hidden"
            />
          </label>

          {/* Emotion Result */}
          {emotion && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 bg-white/70 rounded-xl p-4"
            >
              <p className="text-sm text-gray-500">
                Detected Emotion
              </p>

              <p className="text-2xl font-semibold capitalize text-[#6a8c68] mt-1">
                {emotion}
              </p>

              <p className="text-xs text-gray-400 mt-2">
                Emotion detected using AI voice analysis.
              </p>
            </motion.div>
          )}
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