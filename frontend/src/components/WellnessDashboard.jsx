
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaLeaf,
  FaBook,
  FaSmile,
  FaChartLine,
  FaMicrophone,
  FaArrowRight,
  FaPause,
  FaRegClock,
  FaHeart,
} from "react-icons/fa";

export default function WellnessDashboard({
  user,
  moods = [],
  journals = [],
  onAddJournal,
}) {
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [recording, setRecording] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  const name =
    user?.name || user?.fullName || user?.username || "Friend";

  const safeMoods = Array.isArray(moods) ? moods : [];
  const safeJournals = Array.isArray(journals) ? journals : [];
  const recent = safeJournals.slice(0, 3);
  const progress = Math.min(100, safeMoods.length * 15);

  async function saveJournal() {
    if (!text.trim()) {
      setNotice("Please write your thoughts first.");
      return;
    }

    if (typeof onAddJournal !== "function") {
      setNotice("Journal saving is not connected yet.");
      return;
    }

    try {
      setSaving(true);
      setNotice("");

      await onAddJournal({
        title: "My Daily Reflection",
        content: text.trim(),
        text: text.trim(),
      });

      setText("");
      setNotice("Your reflection has been saved 💜");
    } catch (error) {
      setNotice(error?.message || "Unable to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  function toggleVoice() {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setNotice(
        "Voice typing is not supported in this browser. Please type instead."
      );
      return;
    }

    if (recording) {
      window.__mindJournalRecognition?.stop();
      setRecording(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (event) => {
      let words = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          words += event.results[i][0].transcript + " ";
        }
      }

      if (words) {
        setText((previous) => previous + words);
      }
    };

    recognition.onend = () => setRecording(false);

    recognition.onerror = () => {
      setRecording(false);
      setNotice("Microphone unavailable. Check browser permission.");
    };

    window.__mindJournalRecognition = recognition;
    recognition.start();
    setRecording(true);
    setNotice("Listening... Speak your thoughts.");
  }

  return (
    <main className="min-h-screen bg-[#faf7fc] px-3 py-4 text-[#272044] sm:px-6">
      <div className="mx-auto max-w-7xl">

        {/* Navigation */}
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#eee7f4] bg-white px-4 py-3 shadow-sm">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-lg font-bold text-[#5546a0]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eee9ff]">
              <FaLeaf />
            </span>
            MindJournal <span className="text-amber-400">✦</span>
          </Link>

          <nav className="flex flex-wrap items-center gap-3 text-sm text-[#77718d]">
            <Link to="/dashboard" className="font-semibold text-[#5546a0]">
              Dashboard
            </Link>
            <Link to="/about" className="hover:text-[#5546a0]">
              About
            </Link>
            <Link to="/journals" className="hover:text-[#5546a0]">
              Journals
            </Link>
            <Link to="/moods" className="hover:text-[#5546a0]">
              Mood Tracker
            </Link>
            <Link to="/profile" className="hover:text-[#5546a0]">
              Profile
            </Link>
          </nav>
        </header>

        {/* Welcome Section */}
        <section className="mb-4 grid items-center gap-4 rounded-3xl border border-[#eee7f4] bg-white p-5 shadow-sm md:grid-cols-2 md:p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b79cc]">
              Your personal wellness space
            </p>

            <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
              Don't worry 👋
            </h1>

            <p className="mt-2 text-base text-[#77718d]">
              AI Journal is listening...
            </p>

            <p className="mt-2 max-w-lg text-sm leading-6 text-[#77718d]">
              Welcome back, {name}. Take a breath, express your feelings,
              and find beauty in everyday life.
            </p>

            <button
              onClick={() => navigate("/journals")}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#7060c8] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5849ad]"
            >
              Begin your journey <FaArrowRight />
            </button>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-[#eee9ff] to-[#dce7ff] p-3">
            <div className="flex min-h-28 flex-col justify-center rounded-xl bg-gradient-to-r from-[#4169df] to-[#5544b7] p-5 text-white">
              <p className="text-lg font-semibold italic">
                Your feelings matter.
              </p>
              <p className="mt-2 text-sm text-white/85">
                Take your time. One step at a time.
              </p>
            </div>
          </div>
        </section>

        {/* Main Dashboard Cards */}
        <section className="grid items-stretch gap-4 lg:grid-cols-2">

          {/* AI Journal */}
          <div className="flex flex-col rounded-3xl bg-gradient-to-br from-[#4169df] to-[#6650bd] p-5 text-white shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">AI Journal</h2>
                <p className="mt-1 text-sm text-white/80">
                  Let your story unfold.
                </p>
              </div>

              <button
                onClick={toggleVoice}
                aria-label={recording ? "Stop voice typing" : "Start voice typing"}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#5546a0] hover:bg-[#eee9ff]"
              >
                {recording ? <FaPause /> : <FaMicrophone />}
              </button>
            </div>

            <div className="my-5 flex h-12 items-center justify-center gap-1 overflow-hidden">
              {Array.from({ length: 27 }, (_, i) => (
                <span
                  key={i}
                  className="w-1 rounded-full bg-white/90"
                  style={{
                    height: `${12 + ((i * 17 + 13) % 30)}px`,
                  }}
                />
              ))}
            </div>

            <label htmlFor="journal-thoughts" className="mb-2 text-sm font-medium">
              {recording ? "Listening to your voice..." : "Write your thoughts"}
            </label>

            <textarea
              id="journal-thoughts"
              value={text}
              onChange={(event) => setText(event.target.value)}
              rows={4}
              placeholder="How are you feeling today?"
              className="w-full resize-y rounded-2xl border border-white/60 bg-white p-4 text-sm leading-6 text-[#41395d] outline-none placeholder:text-[#a39bb5] focus:ring-2 focus:ring-[#dcd3ff]"
            />

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => navigate("/journalBot")}
                className="rounded-full border border-white/70 px-4 py-2 text-sm hover:bg-white/10"
              >
                💬 AI Chat
              </button>

              <button
                onClick={saveJournal}
                disabled={saving}
                className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#55449d] disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Journal →"}
              </button>
            </div>

            {notice && (
              <p role="status" className="mt-3 text-xs leading-5 text-white">
                {notice}
              </p>
            )}

            <p className="mt-3 text-xs text-white/80">
              Your feelings matter. Take your time 💜
            </p>
          </div>

          {/* Mood Tracker and Wellness Summary */}
          <div className="flex flex-col gap-4">

            <Link
              to="/moods"
              className="block rounded-3xl border border-[#eee7f4] bg-white p-5 shadow-sm transition hover:border-[#cfc4f4]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Mood Tracker</h2>
                  <p className="mt-1 text-sm text-[#9a94a8]">
                    Your recorded mood check-ins
                  </p>
                </div>

                <FaSmile className="text-xl text-[#8977d6]" />
              </div>

              <p className="mt-4 text-3xl font-semibold text-[#7060c8]">
                {safeMoods.length}
                <span className="ml-2 text-sm font-normal text-[#9a94a8]">
                  entries
                </span>
              </p>

              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-[#eeeaf7]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#b8aaf1] to-[#7060c8]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p className="mt-3 text-sm text-[#77718d]">
                Keep checking in with yourself 💜
              </p>

              <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[#7060c8]">
                Open Mood Tracker <FaArrowRight />
              </span>
            </Link>

            {/* Wellness summary */}
            <div className="flex-1 rounded-3xl border border-[#eee7f4] bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Your Wellness</h2>
                  <p className="mt-1 text-sm text-[#9a94a8]">
                    Small steps add up.
                  </p>
                </div>
                <FaChartLine className="text-xl text-[#8977d6]" />
              </div>

              <div className="mt-5 grid grid-cols-7 gap-2">
                {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                  <div key={index} className="text-center">
                    <div
                      className={`mx-auto mb-2 h-7 w-7 rounded-full ${
                        index < Math.min(safeMoods.length, 7)
                          ? "bg-[#8977d6]"
                          : "bg-[#eeeaf7]"
                      }`}
                    />
                    <span className="text-xs text-[#9a94a8]">{day}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/insights"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#7060c8]"
              >
                View insights <FaArrowRight />
              </Link>
            </div>

            {/* Small support link - separate from Mood Tracker */}
            <Link
              to="/wellness-support"
              className="flex items-center justify-between gap-3 rounded-2xl border border-[#eee7f4] bg-gradient-to-r from-[#fffaf9] to-[#f3efff] p-4 shadow-sm transition hover:border-[#cfc4f4]"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eee9ff] text-[#7060c8]">
                  <FaHeart />
                </span>
                <div>
                  <h3 className="text-sm font-semibold">Need some support?</h3>
                  <p className="mt-1 text-xs text-[#81758e]">
                    Explore wellness resources.
                  </p>
                </div>
              </div>
              <FaArrowRight className="shrink-0 text-[#7060c8]" />
            </Link>

          </div>
        </section>

        {/* Recent Journals - full width */}
        <section className="mt-4 rounded-3xl border border-[#eee7f4] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold">Recent Journals</h2>
              <p className="mt-1 text-sm text-[#9a94a8]">
                Revisit your latest reflections.
              </p>
            </div>

            <Link
              to="/journals"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#7060c8]"
            >
              View all <FaArrowRight />
            </Link>
          </div>

          {recent.length > 0 ? (
            <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {recent.map((journal, index) => (
                <Link
                  key={journal._id || journal.id || index}
                  to="/journals"
                  className="min-w-0 rounded-2xl border border-[#f0ecf5] bg-[#fdfcff] p-4 transition hover:border-[#cfc4f4]"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eee9ff] text-[#7060c8]">
                      <FaBook />
                    </span>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-semibold text-[#49415f]">
                        {journal.title || "My Reflection"}
                      </h3>

                      <p className="mt-2 line-clamp-2 break-words text-xs leading-5 text-[#81758e]">
                        {journal.content || journal.text || "Personal journal entry"}
                      </p>

                      <p className="mt-3 flex items-center gap-2 text-xs text-[#a29aad]">
                        <FaRegClock />
                        {journal.createdAt
                          ? new Date(journal.createdAt).toLocaleDateString()
                          : "Journal entry"}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-7 text-center">
              <FaBook className="mx-auto text-2xl text-[#a99be0]" />
              <p className="mt-3 text-sm text-[#77718d]">
                Your reflections will appear here.
              </p>
              <Link
                to="/journals"
                className="mt-2 inline-block text-sm font-medium text-[#7060c8]"
              >
                Write your first journal →
              </Link>
            </div>
          )}
        </section>

        <footer className="py-4 text-center text-xs text-[#a29aad]">
          Made with care for your wellbeing 💜
        </footer>
      </div>
    </main>
  );
}
