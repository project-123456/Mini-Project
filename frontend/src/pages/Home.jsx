import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Home({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);
  const leaves = [
    { left: "10%", delay: 0 },
    { left: "40%", delay: 2 },
    { left: "70%", delay: 4 },
  ];

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden text-[#3b3b3b] font-['Poppins']">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(135deg, #f4ede4, #e3f0da)",
            "linear-gradient(135deg, #f7f0ea, #dde8d8)",
            "linear-gradient(135deg, #e7f0e4, #f4ede4)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Soft Floating Bubbles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white/25 rounded-full blur-3xl"
          style={{
            width: `${80 + i * 10}px`,
            height: `${80 + i * 10}px`,
            top: `${10 + i * 10}%`,
            left: `${5 + i * 15}%`,
          }}
          animate={{
            y: [0, 25, 0],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}

      {/* 🍃 Floating Leaves Animation */}
      {leaves.map((leaf, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl opacity-70"
          style={{ left: leaf.left, top: "-5%" }}
          animate={{
            y: ["-10%", "110%"],
            x: ["0%", i % 2 === 0 ? "10%" : "-10%"],
            rotate: [0, i % 2 === 0 ? 30 : -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            delay: leaf.delay,
            ease: "easeInOut",
          }}
        >
          🍃
        </motion.div>
      ))}

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center z-10 px-6"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#2f3f3f] drop-shadow-sm">
          Welcome to <span className="text-[#6a8c68]">MindJournal 🌿</span>
        </h1>

        <p className="text-lg md:text-xl mb-10 text-[#4b4b4b] max-w-2xl mx-auto leading-relaxed">
          A <span className="italic text-[#6b8e7a]">haven of serenity</span> to unwind, reflect, and grow.  
          Take a deep breath, write your thoughts, and let your soul heal 💫
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/register"
            className="bg-[#6a8c68] text-white px-8 py-3 rounded-full font-medium shadow-md hover:bg-[#789b74] hover:scale-105 transition-all duration-300"
          >
            Get Started 🌸
          </Link>
          <Link
            to="/login"
            className="border border-[#6a8c68] text-[#6a8c68] px-8 py-3 rounded-full font-medium hover:bg-[#6a8c68] hover:text-white hover:scale-105 transition-all duration-300"
          >
            Login 💚
          </Link>
        </div>
      </motion.div>

      {/* Subtle light overlay for glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-transparent via-[#ffffff25] to-transparent"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
