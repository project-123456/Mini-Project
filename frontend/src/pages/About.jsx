

import { motion } from "framer-motion";
import {
  FaSmile,
  FaBook,
  FaCamera,
  FaChartLine,
  FaLock,
  FaUserShield,
} from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4ede4] to-[#e7f0e4] px-6 py-16">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl font-bold text-[#2f3f3f]">
            About Mind Journal 🌿
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            A calm, secure, and personal space to track your emotions, write journals,
            and take care of your mental well-being.
          </p>
        </motion.div>

        {/* What is this app */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow mb-12"
        >
          <h2 className="text-2xl font-semibold mb-4 text-[#2f3f3f]">
            🌱 What is Mind Journal?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Mind Journal is a mental wellness web application designed to help users
            reflect on their daily life. It allows users to track moods using emojis,
            write journals with photos, and securely store their personal thoughts.
            Everything is private, simple, and designed with calmness in mind.
          </p>
        </motion.div>

        {/* Features */}
        <h2 className="text-3xl font-semibold text-center mb-10 text-[#2f3f3f]">
          ✨ Key Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Mood Tracker */}
          <FeatureCard
            icon={<FaSmile className="text-emerald-500" />}
            title="Emoji Mood Tracker"
            desc="Log your mood instantly using emojis. Each mood is saved with date and time, helping you understand emotional patterns."
          />

          {/* Journal */}
          <FeatureCard
            icon={<FaBook className="text-blue-500" />}
            title="Daily Journaling"
            desc="Write daily reflections, add notes, and tag activities like friends, family, exercise, or relaxation."
          />

          {/* Image Upload */}
          <FeatureCard
            icon={<FaCamera className="text-purple-500" />}
            title="Photo Journals"
            desc="Upload photos with your journal entries using ImageKit. Visual memories make journaling more meaningful."
          />

          {/* History */}
          <FeatureCard
            icon={<FaChartLine className="text-orange-500" />}
            title="Mood & Journal History"
            desc="View your past moods and journal entries anytime. All entries are sorted by date for easy reflection."
          />

          {/* Auth */}
          <FeatureCard
            icon={<FaLock className="text-red-500" />}
            title="Secure Authentication"
            desc="JWT-based authentication ensures your data is protected. Only you can access your journals and moods."
          />

          {/* Privacy */}
          <FeatureCard
            icon={<FaUserShield className="text-indigo-500" />}
            title="Privacy First"
            desc="All data is stored securely in MongoDB and linked to your account. No one else can see your content."
          />
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow"
        >
          <h2 className="text-2xl font-semibold mb-4 text-[#2f3f3f]">
            🛠 Tech Stack
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
            <li>⚛️ React + Framer Motion</li>
            <li>🎨 Tailwind CSS</li>
            <li>🟢 Node.js & Express</li>
            <li>🍃 MongoDB & Mongoose</li>
            <li>🔐 JWT Authentication</li>
            <li>🖼 ImageKit for image uploads</li>
          </ul>
        </motion.div>

        {/* Footer note */}
        <p className="text-center text-sm text-gray-500 mt-12">
          Built with ❤️ to promote self-reflection and mental well-being.
        </p>
      </div>
    </div>
  );
}

/* Reusable Feature Card */
function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow"
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 text-[#2f3f3f]">
        {title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
}

