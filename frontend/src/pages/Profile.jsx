import { useState } from "react";
import { predictEmotion } from "../utils/api";

export default function Profile({ user }) {
  const [audioFile, setAudioFile] = useState(null);
  const [emotion, setEmotion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!user) {
    return (
      <div className="p-6 text-center text-gray-500">
        Please log in to view your profile.
      </div>
    );
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setAudioFile(file);
    setEmotion("");
    setError("");
  };

  const handleAnalyzeEmotion = async () => {
    if (!audioFile) {
      setError("Please select an audio file first.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setEmotion("");

      const result = await predictEmotion(audioFile);

      if (result.emotion) {
        setEmotion(result.emotion);
      } else {
        setError(result.error || "Unable to detect emotion.");
      }
    } catch (err) {
      setError("Failed to connect with emotion detection API.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md mt-10">

      <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
        Profile Details
      </h2>

      <p>
        <strong>Name:</strong> {user.name}
      </p>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <p className="mt-4 text-gray-500">
        Keep journaling and tracking your mood 🌈
      </p>

      {/* Voice Emotion Detection */}
      <div className="mt-8 border-t pt-6">

        <h3 className="text-xl font-semibold text-green-700 mb-3">
          🎤 Voice Emotion Detection
        </h3>

        <p className="text-sm text-gray-500 mb-4">
          Upload your voice recording and let AI detect your emotion.
        </p>

        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="w-full border p-2 rounded-lg"
        />

        {audioFile && (
          <p className="mt-2 text-sm text-gray-600">
            Selected: {audioFile.name}
          </p>
        )}

        <button
          onClick={handleAnalyzeEmotion}
          disabled={loading}
          className="mt-4 bg-[#6a8c68] text-white px-6 py-3 rounded-full hover:bg-[#789b74] transition"
        >
          {loading ? "Analyzing..." : "Analyze Emotion 🎤"}
        </button>

        {emotion && (
          <div className="mt-5 p-4 bg-green-50 rounded-lg text-center">
            <p className="text-gray-600">
              Detected Emotion
            </p>

            <p className="text-2xl font-bold text-green-700 capitalize">
              {emotion} 💚
            </p>
          </div>
        )}

        {error && (
          <p className="mt-4 text-red-500">
            {error}
          </p>
        )}

      </div>
    </div>
  );
}