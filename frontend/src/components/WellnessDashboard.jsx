
import { Link } from "react-router-dom";
import MoodTracker from "./MoodTracker";
import JournalForm from "./JournalForm";
import JournalList from "./JournalList";

export default function WellnessDashboard({
  user,
  token,
  moods,
  setMoods,
  journals,
  onAddJournal,
}) {
  return (
    <main className="min-h-screen bg-emerald-50/50 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <section className="mb-8 rounded-3xl bg-gradient-to-r from-emerald-700 to-green-500 p-8 text-white shadow-lg">
          <p className="mb-2 text-sm text-emerald-50">
            YOUR PERSONAL WELLNESS SPACE
          </p>

          <h1 className="text-3xl font-bold">
            Welcome back{user?.name ? `, ${user.name}` : ""} 🌿
          </h1>

          <p className="mt-2">
            Track your mood, express your thoughts, and take a breath.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/moods"
              className="rounded-full bg-white px-5 py-2 font-medium text-emerald-800"
            >
              Check your mood
            </Link>

            <Link
              to="/journals"
              className="rounded-full border border-white px-5 py-2"
            >
              Open journal
            </Link>

            <Link
              to="/insights"
              className="rounded-full border border-white px-5 py-2"
            >
              View insights
            </Link>
          </div>
        </section>

        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <span className="text-2xl">😊</span>
            <h2 className="mt-3 font-semibold">Mood Tracker</h2>
            <p className="mt-1 text-sm text-gray-500">
              Record and understand your feelings.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <span className="text-2xl">📔</span>
            <h2 className="mt-3 font-semibold">Journal</h2>
            <p className="mt-1 text-sm text-gray-500">
              Write about your day and reflect.
            </p>
            <p className="mt-3 text-sm">
              Total entries: {journals.length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <span className="text-2xl">📊</span>
            <h2 className="mt-3 font-semibold">Mood History</h2>
            <p className="mt-1 text-sm text-gray-500">
              Recorded moods: {moods.length}
            </p>
          </div>
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">
              How are you feeling?
            </h2>

            <MoodTracker
              token={token}
              moods={moods}
              setMoods={setMoods}
            />
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">
              Write about your day ✍️
            </h2>

            <JournalForm onSubmit={onAddJournal} />
          </div>
        </section>

        <section className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">
            Recent Journal Entries
          </h2>

          <JournalList journals={journals} />
        </section>
      </div>
    </main>
  );
}
