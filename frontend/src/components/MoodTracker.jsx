

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { logMood } from "../utils/api";

const MOOD_OPTIONS = [
  { label: "Happy", emoji: "😊", value: 5, color: "#f6c85f" },
  { label: "Calm", emoji: "😌", value: 4, color: "#8ec9ad" },
  { label: "Neutral", emoji: "😐", value: 3, color: "#b8c8e8" },
  { label: "Sad", emoji: "😔", value: 2, color: "#a6b8ed" },
  { label: "Angry", emoji: "😠", value: 1, color: "#f19a9a" },
];

const getDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getMood = (entry) => {
  if (typeof entry === "string") {
    return MOOD_OPTIONS.find(
      (mood) => mood.label.toLowerCase() === entry.toLowerCase()
    );
  }

  if (entry && typeof entry === "object") {
    const value = entry.mood || entry.label || entry.name || entry.emotion;
    return MOOD_OPTIONS.find(
      (mood) => mood.label.toLowerCase() === String(value || "").toLowerCase()
    );
  }

  return undefined;
};

export default function MoodTracker({ moods = [], setMoods, token }) {
  const [selectedMood, setSelectedMood] = useState(null);
  const [notice, setNotice] = useState("");

  const today = new Date();
  const todayKey = getDateKey(today);

  const moodEntries = useMemo(() => {
    if (!Array.isArray(moods)) return [];

    return moods
      .map((entry) => {
        const rawDate = entry.date || entry.createdAt || entry.updatedAt;
        if (!rawDate) return null;

        const date = new Date(rawDate);
        if (Number.isNaN(date.getTime())) return null;

        return {
          ...entry,
          dateKey: getDateKey(date),
          parsedMood: getMood(entry),
        };
      })
      .filter(Boolean);
  }, [moods]);

  const todayEntry = moodEntries.find((entry) => entry.dateKey === todayKey);
  const todayMood = todayEntry?.parsedMood;

  const week = useMemo(() => {
    const day = today.getDay();
    const mondayOffset = day === 0 ? -6 : 1 - day;
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);

    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);

      const key = getDateKey(date);
      const entry = moodEntries.find((item) => item.dateKey === key);

      return {
        key,
        label: date.toLocaleDateString("en-US", { weekday: "short" }),
        mood: entry?.parsedMood,
        date,
      };
    });
  }, [moodEntries]);

  const recentDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (6 - index));

      const key = getDateKey(date);
      const entry = moodEntries.find((item) => item.dateKey === key);

      return {
        key,
        date,
        mood: entry?.parsedMood,
      };
    });
  }, [moodEntries]);

  const loggedThisWeek = week.filter((day) => day.mood).length;
  const average = week.filter((day) => day.mood).length
    ? (
        week.reduce((sum, day) => sum + (day.mood?.value || 0), 0) /
        loggedThisWeek
      ).toFixed(1)
    : null;

      
const handleSelectMood = async (mood) => {
  const currentToken = token || localStorage.getItem("token");

  if (!currentToken) {
    setNotice("Please log in to save your mood.");
    return;
  }

  if (typeof setMoods !== "function") {
    setNotice("Mood update function is not connected.");
    return;
  }

  try {
    const savedMood = await logMood(
      { mood: mood.label.toLowerCase() },
      currentToken
    );

    setSelectedMood(mood);

    setMoods((previousMoods) => {
      const today = new Date().toDateString();

      const otherMoods = previousMoods.filter((entry) => {
        const entryDate = new Date(
          entry.createdAt || entry.date || entry.updatedAt
        ).toDateString();

        return entryDate !== today;
      });

      return [savedMood, ...otherMoods];
    });

    setNotice("Your mood has been saved successfully!");
  } catch (error) {
    console.error("Mood save error:", error);
    setNotice(error.message || "Unable to save mood.");
  }
};



  

  return (
    <div className="min-h-screen bg-[#e6f5ef] p-3 sm:p-6 lg:p-8">
      <div className="mx-auto flex min-h-[calc(100vh-48px)] max-w-7xl overflow-hidden rounded-3xl border border-white bg-white shadow-xl">
        {/* Sidebar */}
        <aside className="hidden w-52 shrink-0 flex-col border-r border-slate-100 bg-white p-5 md:flex">
          <Link to="/" className="mb-9 text-lg font-bold text-slate-800">
            🌿 MindJournal
          </Link>

          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
            Menu
          </p>

          <nav className="space-y-2 text-sm">
            <Link
              to="/dashboard"
              className="block rounded-xl px-3 py-3 text-slate-600 hover:bg-slate-50"
            >
              ▦ Dashboard
            </Link>

            <Link
              to="/moods"
              className="block rounded-xl bg-indigo-50 px-3 py-3 font-semibold text-indigo-700"
            >
              ☺ Mood Tracker
            </Link>

            <Link
              to="/journals"
              className="block rounded-xl px-3 py-3 text-slate-600 hover:bg-slate-50"
            >
              ▤ Journal
            </Link>

            <Link
              to="/insights"
              className="block rounded-xl px-3 py-3 text-slate-600 hover:bg-slate-50"
            >
              ✧ Insights
            </Link>
          </nav>

          <div className="mt-auto rounded-2xl bg-[#eef8f3] p-4">
            <p className="font-semibold text-slate-700">Need a moment?</p>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              Take a breath. You don't need to solve everything today.
            </p>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1 bg-[#fcfdfd] p-4 sm:p-6 lg:p-8">
          <header className="mb-7 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Mood Tracker
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Understand yourself better, one day at a time.
              </p>
            </div>

            <span className="rounded-xl border border-slate-100 bg-white px-3 py-2 text-xs text-slate-500">
              {today.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </header>

          {/* Today's mood and week */}
          <section className="grid gap-4 xl:grid-cols-[1.1fr_2fr]">
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <h2 className="font-semibold text-slate-800">Today's Mood</h2>
              <p className="mt-1 text-xs text-slate-500">
                How are you feeling right now?
              </p>

              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f4f6fb] text-3xl">
                  {todayMood?.emoji || selectedMood?.emoji || "🙂"}
                </div>
                <div>
                  <p className="font-semibold text-slate-700">
                    {todayMood?.label || selectedMood?.label || "Check in today"}
                  </p>
                  <p className="text-xs text-slate-400">
                    {todayMood ? "Mood recorded" : "Choose how you feel"}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {MOOD_OPTIONS.map((mood) => (
                  <button
                    key={mood.label}
                    type="button"
                    onClick={() => handleSelectMood(mood)}
                    aria-label={`Select ${mood.label} mood`}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border text-xl transition hover:scale-105 ${
                      selectedMood?.label === mood.label
                        ? "border-indigo-500 ring-2 ring-indigo-100"
                        : "border-slate-100"
                    }`}
                    style={{ backgroundColor: `${mood.color}35` }}
                  >
                    {mood.emoji}
                  </button>
                ))}
              </div>

              {notice && (
                <p className="mt-3 text-xs leading-5 text-amber-700">
                  {notice}
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h2 className="font-semibold text-slate-800">
                    Weekly Mood Trend
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Your mood check-ins this week.
                  </p>
                </div>

                <span className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs text-indigo-700">
                  This week
                </span>
              </div>

              <div className="mt-6 grid grid-cols-7 gap-1 sm:gap-3">
                {week.map((day) => (
                  <div
                    key={day.key}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full text-lg sm:h-11 sm:w-11"
                      style={{
                        backgroundColor: day.mood
                          ? `${day.mood.color}45`
                          : "#f1f5f9",
                      }}
                    >
                      {day.mood?.emoji || "·"}
                    </div>
                    <span className="text-xs text-slate-500">
                      {day.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl bg-[#f5f8ff] px-4 py-3 text-sm text-slate-600">
                {loggedThisWeek} of 7 days recorded
                {average ? ` · Average mood score: ${average}/5` : ""}
              </div>
            </div>
          </section>

          {/* Daily trend and insight */}
          <section className="mt-5 grid gap-4 xl:grid-cols-[2fr_1fr]">
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <h2 className="font-semibold text-slate-800">
                Daily Mood Trend
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Your recorded moods over the last seven days.
              </p>

              <div className="mt-6 flex h-48 items-end justify-around gap-2 border-b border-slate-100 pb-2">
                {recentDays.map((day) => {
                  const score = day.mood?.value || 0;
                  const height = score ? `${score * 20}%` : "4px";

                  return (
                    <div
                      key={day.key}
                      className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                    >
                      <div className="flex h-full w-full items-end justify-center">
                        <div
                          title={
                            day.mood
                              ? `${day.mood.label}: ${score}/5`
                              : "No mood recorded"
                          }
                          className="w-full max-w-8 rounded-t-lg transition-all"
                          style={{
                            height,
                            minHeight: "4px",
                            backgroundColor: day.mood
                              ? day.mood.color
                              : "#edf1f6",
                          }}
                        />
                      </div>

                      <span className="text-[10px] text-slate-400">
                        {day.date.toLocaleDateString("en-US", {
                          day: "2-digit",
                        })}
                      </span>
                    </div>
                  );
                })}
              </div>

              <p className="mt-4 text-xs leading-5 text-slate-500">
                Record your mood each day to build a more useful trend.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <h2 className="font-semibold text-slate-800">Your Daily Insight</h2>
              <p className="mt-1 text-xs text-slate-500">
                Small steps for your wellbeing.
              </p>

              <div className="mt-5 space-y-3">
                <div className="rounded-xl bg-[#f0f8f4] p-4">
                  <p className="font-medium text-slate-700">
                    🌿 Take a mindful break
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Pause for a few minutes and notice your breathing.
                  </p>
                </div>

                <div className="rounded-xl bg-[#f3f2ff] p-4">
                  <p className="font-medium text-slate-700">
                    📔 Reflect on your day
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Writing down a thought can help you understand your feelings.
                  </p>
                  <Link
                    to="/journals"
                    className="mt-2 inline-block text-xs font-semibold text-indigo-700 hover:underline"
                  >
                    Open Journal →
                  </Link>
                </div>

                <div className="rounded-xl bg-[#fff5eb] p-4">
                  <p className="font-medium text-slate-700">
                    💧 Care for yourself
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Drink water, stretch, or take a short walk if you can.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <p className="mt-6 text-center text-xs text-slate-400">
            Every feeling matters. Be kind to yourself 💚
          </p>
        </main>
      </div>
    </div>
  );
}
