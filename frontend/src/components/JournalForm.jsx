import { useState } from "react";
import { motion } from "framer-motion";
import { uploadImage } from "../utils/api";
import { toBase64 } from "../utils/toBase64";

const ACTIVITIES = [
  { label: "Family", icon: "👨‍👩‍👧" },
  { label: "Friends", icon: "🧑‍🤝‍🧑" },
  { label: "Exercise", icon: "🏃" },
  { label: "Relax", icon: "🌿" },
  { label: "Movies", icon: "🎬" },
  { label: "Reading", icon: "📖" },
  { label: "Gaming", icon: "🎮" },
  { label: "Shopping", icon: "🛒" },
];

export default function JournalForm({ onSubmit }) {
  const [note, setNote] = useState("");
  const [selected, setSelected] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const token = localStorage.getItem("token");

  const toggleActivity = (a) => {
    setSelected((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );
  };

  const handleImageUpload = async (file) => {
    if (!file) return;
    setUploading(true);

    try {
      const base64 = await toBase64(file);
      const res = await uploadImage(base64, token);
      if (res?.url) {
        setImageUrl(res.url);
      }
    } catch (err) {
      console.error("Image upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = () => {
    if (!note.trim() && selected.length === 0 && !imageUrl) return;

    onSubmit({
      title: "Daily Journal",
      content: note,
      tags: selected,
      image: imageUrl,
    });

    setNote("");
    setSelected([]);
    setImageUrl(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-md"
    >
      <h2 className="text-lg font-semibold text-center mb-4">
        What have you been up to?
      </h2>

      {/* Activities */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {ACTIVITIES.map((a) => (
          <button
            key={a.label}
            onClick={() => toggleActivity(a.label)}
            className={`flex flex-col items-center p-3 rounded-2xl transition ${
              selected.includes(a.label)
                ? "bg-emerald-100 scale-105"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <span className="text-2xl">{a.icon}</span>
            <span className="text-xs mt-1">{a.label}</span>
          </button>
        ))}
      </div>

      {/* Image Upload */}
      <div className="mb-4">
        <label className="cursor-pointer inline-block px-4 py-2 bg-gray-200 rounded-xl text-sm hover:bg-gray-300">
          {uploading ? "Uploading..." : "Add Photo"}
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => handleImageUpload(e.target.files[0])}
          />
        </label>

        {imageUrl && (
          <motion.img
            src={imageUrl}
            alt="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 rounded-xl max-h-48 w-full object-cover"
          />
        )}
      </div>

      {/* Note */}
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write a note about your day..."
        className="w-full h-28 p-4 rounded-xl bg-gray-100 resize-none outline-none"
      />

      {/* Save */}
      <div className="flex justify-center mt-6">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleSave}
          className="w-14 h-14 rounded-full bg-emerald-500 text-white text-xl shadow-lg"
        >
          ✓
        </motion.button>
      </div>
    </motion.div>
  );
}
