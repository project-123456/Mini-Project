
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Home({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#faf8f3] text-[#263d32]">
      {/* Navigation */}
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-12">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-3xl">🌿</span>
          <span className="text-2xl font-semibold tracking-tight">
            MindJournal
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-sm text-[#68766b] md:flex">
          <a href="#about" className="transition hover:text-[#285c45]">
            About
          </a>
          <a href="#features" className="transition hover:text-[#285c45]">
            Our Space
          </a>
          <Link to="/login" className="transition hover:text-[#285c45]">
            Login
          </Link>
        </div>

        <Link
          to="/register"
          className="rounded-full bg-[#285c45] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#194632]"
        >
          Get started <span aria-hidden="true">↗</span>
        </Link>
      </nav>

      {/* Hero */}
      <section
        id="about"
        className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-16 pt-8 md:grid-cols-2 md:px-12 md:pb-24 md:pt-12"
      >
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <p className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#71876d]">
            <span className="h-px w-8 bg-[#91a98b]" />
            Your personal wellness space
          </p>

          <h1 className="max-w-xl font-serif text-5xl leading-[1.12] tracking-tight text-[#263d32] sm:text-6xl lg:text-7xl">
            A calmer mind,
            <br />
            a <span className="italic text-[#789477]">brighter</span> you.
          </h1>

          <p className="mt-6 max-w-md text-base leading-8 text-[#70786f] md:text-lg">
            A little space just for you. Pause, express your feelings,
            and find beauty in the small moments of everyday life.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/register"
              className="rounded-full bg-[#285c45] px-7 py-4 text-sm font-medium text-white shadow-sm transition hover:-translate-y-1 hover:bg-[#194632]"
            >
              Begin your journey <span className="ml-2">→</span>
            </Link>

            <Link
              to="/login"
              className="rounded-full border border-[#d6ded1] px-7 py-4 text-sm font-medium text-[#385944] transition hover:bg-[#edf1e8]"
            >
              Welcome back
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-3">
            <div className="flex -space-x-2">
              <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#faf8f3] bg-[#f2dfcf]">🌷</span>
              <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#faf8f3] bg-[#dce9d9]">🍃</span>
              <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#faf8f3] bg-[#f1e5bd]">☀️</span>
            </div>
            <p className="text-xs leading-5 text-[#7a8177]">
              Take a breath.
              <br />
              You deserve a moment for yourself.
            </p>
          </div>
        </motion.div>

        {/* Calm visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative mx-auto w-full max-w-lg"
        >
          <div className="absolute -right-4 -top-5 h-28 w-28 rounded-full bg-[#e8e9d5] blur-2xl" />
          <div className="absolute -bottom-5 -left-5 h-32 w-32 rounded-full bg-[#f4dfd1] blur-2xl" />

          <div className="relative overflow-hidden rounded-[48%_48%_24px_24px] border-[8px] border-white bg-[#e8eee1] shadow-[0_24px_70px_-30px_rgba(43,76,54,0.3)]">
            <img
              src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1000&q=85"
              alt="A peaceful sunrise over a green landscape"
              className="h-[390px] w-full object-cover sm:h-[470px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c382d]/65 via-transparent to-[#ffffff]/10" />

            <div className="absolute left-7 top-8 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-xs text-[#385944] backdrop-blur-md">
              ✦ A moment to slow down
            </div>

            <div className="absolute bottom-8 left-7 right-7 text-white">
              <p className="font-serif text-3xl italic leading-snug">
                "Small steps make brighter days."
              </p>
              <p className="mt-3 text-sm text-white/85">
                Your journey, your pace. 🌿
              </p>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-5 top-1/3 grid h-16 w-16 place-items-center rounded-2xl border border-white bg-white/90 text-3xl shadow-lg sm:-left-8"
          >
            🍃
          </motion.div>

          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-2 bottom-20 rounded-2xl border border-white bg-white/90 px-4 py-3 shadow-lg sm:-right-5"
          >
            <span className="text-sm text-[#536a56]">Today is a new beginning</span>
            <div className="mt-1 text-xs text-[#91a18d]">Breathe · Reflect · Grow</div>
          </motion.div>
        </motion.div>
      </section>

      {/* Minimal feature strip */}
      <section
        id="features"
        className="border-t border-[#e8e8de] bg-white/60"
      >
        <div className="mx-auto grid max-w-7xl gap-7 px-6 py-9 sm:grid-cols-3 md:px-12 md:py-12">
          <div className="flex items-start gap-4">
            <span className="text-2xl">☁️</span>
            <div>
              <h2 className="font-medium">Check in with yourself</h2>
              <p className="mt-1 text-sm leading-6 text-[#82877e]">
                Give your feelings a little space.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="text-2xl">📖</span>
            <div>
              <h2 className="font-medium">Write without judgement</h2>
              <p className="mt-1 text-sm leading-6 text-[#82877e]">
                Keep your thoughts and memories together.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="text-2xl">🌱</span>
            <div>
              <h2 className="font-medium">Notice your growth</h2>
              <p className="mt-1 text-sm leading-6 text-[#82877e]">
                Reflect on your journey, one day at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="px-6 py-5 text-center text-xs text-[#92978e]">
        Made with care, for your wellbeing. ♡
      </footer>
    </main>
  );
}


