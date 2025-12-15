import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSmile, FaBook, FaChartLine } from "react-icons/fa";
import JournalBot from "./JournalBot";


export default function Dashboard({ user }) {
  const navigate = useNavigate();
  const location = useLocation();


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef2f7] via-[#f7f8fc] to-[#eef2f7] p-6">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* ===== Header ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-2"
        >
          <h1 className="text-4xl font-semibold text-gray-800">
            Welcome back, {location.state?.name || user?.div || "Laxmi"} 🌿

          </h1>
          <p className="text-gray-500 max-w-xl">
            Take a deep breath. This space is for your thoughts, feelings, and growth.
          </p>
        </motion.div>

        {/* ===== Focus Card ===== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#6a8c68] to-[#88b28a] text-white p-8 shadow-xl"
        >
          <div className="relative z-10">
            <h2 className="text-2xl font-medium">
              How are you feeling today?
            </h2>
            <p className="opacity-90 mt-1">
              A quick check-in can make a big difference.
            </p>

            <button
              onClick={() => navigate("/moods")}
              className="mt-6 bg-white text-[#3a5f4b] px-6 py-3 rounded-full font-medium hover:scale-105 transition"
            >
              Check in now →
            </button>
          </div>

          {/* decorative blur */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
        </motion.div>

        {/* ===== Action Cards ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Mood Tracker */}
          <motion.div
            whileHover={{ y: -6 }}
            className="cursor-pointer rounded-3xl bg-white/70 backdrop-blur-xl shadow-lg p-6"
            onClick={() => navigate("/moods")}


          >
            <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center mb-4">
              <FaSmile className="text-yellow-500 text-xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Mood Tracker
            </h3>
            <p className="text-gray-500 mt-1">
              Track emotions and understand patterns.
            </p>
          </motion.div>

          {/* Journal */}
          <motion.div
            whileHover={{ y: -6 }}
            className="cursor-pointer rounded-3xl bg-white/70 backdrop-blur-xl shadow-lg p-6"
            onClick={() => navigate("/journals")}

          >
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center mb-4">
              <FaBook className="text-blue-500 text-xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Journal
            </h3>
            <p className="text-gray-500 mt-1">
              Write freely. Reflect honestly.
            </p>
          </motion.div>

          {/* Insights (future-ready) */}
          <motion.div
            whileHover={{ y: -6 }}
            className="cursor-pointer rounded-3xl bg-white/70 backdrop-blur-xl shadow-lg p-6 opacity-90"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center mb-4">
              <FaChartLine className="text-purple-500 text-xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Insights
            </h3>
            <p className="text-gray-500 mt-1">
              Coming soon — patterns & trends.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
