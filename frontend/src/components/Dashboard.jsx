
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaSmile, FaBook, FaChartLine, FaLeaf,
  FaArrowRight, FaPen, FaHeart, FaRegClock
} from "react-icons/fa";
import JournalBot from "./JournalBot";

const card =
  "rounded-[26px] border border-white/80 bg-white/75 backdrop-blur-xl shadow-[0_8px_35px_rgba(48,75,53,0.07)]";

export default function Dashboard({ user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const name = location.state?.name || user?.name || "Laxmi";

  return (
    <main className="min-h-screen overflow-hidden bg-[#f6f5ef] px-4 py-5 text-[#35463a] sm:px-7 lg:px-10">
      <div className="mx-auto max-w-[1400px] space-y-7">

        {/* Navigation */}
        <header className={`${card} flex flex-wrap items-center justify-between gap-4 px-5 py-4`}>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-xl font-semibold tracking-tight"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#e7eee1] text-[#638466]">
              <FaLeaf />
            </span>
            MindJournal<span className="text-[#91a78b]">.</span>
          </button>

          <nav className="flex flex-wrap items-center gap-2 text-sm">
            <button
              onClick={() => navigate("/dashboard")}
              className="rounded-full bg-[#607e63] px-5 py-2.5 text-white"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/moods")}
              className="rounded-full px-4 py-2.5 text-[#657064] transition hover:bg-[#edf1e8]"
            >
              Mood tracker
            </button>
            <button
              onClick={() => navigate("/journals")}
              className="rounded-full px-4 py-2.5 text-[#657064] transition hover:bg-[#edf1e8]"
            >
              Journal
            </button>
          </nav>

          <div className="flex items-center gap-3 rounded-full bg-[#f1f2eb] px-4 py-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dce7d5]">
              <FaHeart className="text-[#648366]" />
            </span>
            <div>
              <p className="text-sm font-semibold">{name}</p>
              <p className="text-xs text-[#899184]">Your wellness space</p>
            </div>
          </div>
        </header>

        {/* Welcome section */}
        <section className="grid items-center gap-7 py-4 lg:grid-cols-[1.1fr_0.9fr] lg:py-7">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#81917a]">
              <span className="h-px w-8 bg-[#a9b9a0]" />
              Your personal wellness space
            </p>

            <h1 className="max-w-2xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              A calmer mind,
              <br />
              a <span className="italic text-[#789477]">brighter you.</span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-[#7a8276]">
              Welcome back, {name}. Take a little pause, listen to yourself,
              and make room for the feelings that matter.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/moods")}
                className="flex items-center gap-3 rounded-full bg-[#58775d] px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-[#58775d]/15 transition hover:-translate-y-0.5 hover:bg-[#47674d]"
              >
                Check in with yourself <FaArrowRight />
              </button>
              <button
                onClick={() => navigate("/journals")}
                className="rounded-full border border-[#d8dfd2] bg-white/70 px-6 py-3.5 text-sm font-medium transition hover:bg-white"
              >
                <FaPen className="mr-2 inline" /> Write a journal
              </button>
            </div>

            <p className="mt-7 text-sm text-[#879080]">
              ✿ &nbsp; Small steps count. Be gentle with yourself today.
            </p>
          </motion.div>

          {/* Decorative nature panel; no external image dependency */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative flex min-h-[280px] items-end overflow-hidden rounded-[32px] border border-white bg-gradient-to-br from-[#e7ebd9] via-[#c6d6b9] to-[#829d7d] p-7 shadow-sm sm:min-h-[340px]"
          >
            <div className="absolute -right-10 -top-12 h-56 w-56 rounded-full bg-[#fff9dd]/70 blur-2xl" />
            <div className="absolute -bottom-24 -left-8 h-64 w-[120%] rotate-[-8deg] rounded-[50%] bg-[#718f70]/60" />
            <div className="absolute -bottom-32 left-16 h-64 w-[120%] rotate-[8deg] rounded-[50%] bg-[#4e7357]/55" />
            <span className="absolute right-9 top-10 text-6xl text-white/70">✳</span>
            <div className="relative z-10 max-w-sm rounded-2xl border border-white/50 bg-white/35 p-5 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.2em] text-[#4c684e]">
                A gentle reminder
              </p>
              <p className="mt-3 font-serif text-2xl italic leading-snug text-[#314c38]">
                “You don't have to bloom every day.”
              </p>
              <p className="mt-3 text-sm text-[#47634b]">
                Rest, reflect, and grow at your own pace. 🌿
              </p>
            </div>
          </motion.div>
        </section>

        {/* Main dashboard grid */}
        <section className="grid gap-5 lg:grid-cols-12">

          {/* Voice / Journal card */}
          <motion.div
            whileHover={{ y: -3 }}
            className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#637f64] to-[#344f3c] p-6 text-white shadow-lg lg:col-span-5"
          >
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs">
                  YOUR DAILY SPACE
                </span>
                <FaBook className="text-xl text-white/80" />
              </div>
              <h2 className="mt-6 font-serif text-3xl">I'm listening.</h2>
              <p className="mt-2 text-sm leading-6 text-white/75">
                Your thoughts deserve a place to land.
              </p>

              <div className="my-7 flex h-14 items-center justify-center gap-1">
                {[18, 30, 22, 42, 27, 48, 20, 36, 52, 25, 40, 17, 31, 45, 22, 35, 18, 28, 43, 24, 34, 16].map((height, i) => (
                  <span
                    key={i}
                    className="w-1 rounded-full bg-white/75"
                    style={{ height: `${height}px` }}
                  />
                ))}
              </div>

              <button
                onClick={() => navigate("/journals")}
                className="w-full rounded-2xl bg-white px-5 py-4 text-left text-[#3e5942] transition hover:bg-[#f0f4ec]"
              >
                <span className="flex items-center justify-between gap-3">
                  <span>
                    <span className="block font-semibold">Write your thoughts</span>
                    <span className="mt-1 block text-xs text-[#849080]">
                      Open your personal journal
                    </span>
                  </span>
                  <FaArrowRight />
                </span>
              </button>

              <button
                onClick={() => navigate("/moods")}
                className="mt-3 w-full rounded-full border border-white/35 px-5 py-3 text-sm transition hover:bg-white/10"
              >
                Explore voice & mood features
              </button>
            </div>
          </motion.div>

          {/* Mood card */}
          <motion.div
            whileHover={{ y: -3 }}
            onClick={() => navigate("/moods")}
            className={`${card} cursor-pointer p-6 lg:col-span-4`}
          >
            <div className="flex items-start justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf1e5]">
                <FaSmile className="text-xl text-[#708d6c]" />
              </span>
              <span className="rounded-full bg-[#f2f4ed] px-3 py-1 text-xs text-[#81917a]">
                Daily check-in
              </span>
            </div>
            <h2 className="mt-5 text-xl font-semibold">Mood tracker</h2>
            <p className="mt-2 text-sm leading-6 text-[#879083]">
              Notice your feelings without judging them.
            </p>
            <div className="mt-6 flex justify-between gap-2">
              {[
                ["😊", "Good"],
                ["😌", "Calm"],
                ["😐", "Okay"],
                ["😔", "Low"],
                ["😣", "Hard"],
              ].map(([emoji, label]) => (
                <div key={label} className="text-center">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f3ec] text-xl">
                    {emoji}
                  </span>
                  <span className="mt-2 block text-[10px] text-[#858d7e]">{label}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-[#edf0e8] pt-4 text-sm">
              <span className="text-[#849080]">Ready for a check-in?</span>
              <FaArrowRight className="text-[#68866a]" />
            </div>
          </motion.div>

          {/* Wellness insight */}
          <motion.div
            whileHover={{ y: -3 }}
            className={`${card} p-6 lg:col-span-3`}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f7edda]">
              <FaHeart className="text-xl text-[#b58b53]" />
            </span>
            <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-[#9a9a7f]">
              A little reminder
            </p>
            <h2 className="mt-3 font-serif text-2xl leading-snug">
              You are allowed to take it slow.
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#879083]">
              One moment at a time is enough. Your well-being matters.
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs text-[#849080]">
              <FaRegClock /> Take a mindful pause
            </div>
          </motion.div>
        </section>

        {/* Recent journal and insights links */}
        <section className={`${card} p-6 sm:p-8`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b9a82]">
                Your reflections
              </p>
              <h2 className="mt-2 font-serif text-3xl">Recent journal entries</h2>
              <p className="mt-2 text-sm text-[#879083]">
                Every entry is a little piece of your journey.
              </p>
            </div>
            <button
              onClick={() => navigate("/journals")}
              className="rounded-full border border-[#dce3d7] px-5 py-3 text-sm transition hover:bg-[#f0f3eb]"
            >
              Open journal <FaArrowRight className="ml-2 inline" />
            </button>
          </div>

          <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#d7dfd1] bg-[#f8f8f3] px-5 py-10 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e9efe2] text-[#728d6f]">
              <FaBook />
            </span>
            <p className="mt-3 font-medium">Your story starts here</p>
            <p className="mt-1 text-sm text-[#879083]">
              Open your journal to write your first reflection.
            </p>
            <button
              onClick={() => navigate("/journals")}
              className="mt-4 rounded-full bg-[#607e63] px-5 py-2.5 text-sm text-white transition hover:bg-[#4c6a50]"
            >
              Write an entry
            </button>
          </div>
        </section>

        {/* Existing chatbot */}
        <section className="pb-5">
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b9a82]">
              Here for you
            </p>
            <h2 className="mt-2 font-serif text-3xl">A space to talk</h2>
          </div>
          <div className={`${card} p-3 sm:p-5`}>
            <JournalBot />
          </div>
        </section>

        <footer className="pb-4 text-center text-xs text-[#92988b]">
          Made with care for your well-being · MindJournal 🌿
        </footer>
      </div>
    </main>
  );
}
