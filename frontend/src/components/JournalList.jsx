
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import JournalForm from "./JournalForm";

export default function JournalList({
  journals = [],
  onAddJournal,
}) {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const filteredJournals = useMemo(() => {
    const query = search.trim().toLowerCase();

    return [...journals]
      .filter((journal) => {
        const text = [
          journal.title || "",
          journal.content || "",
          ...(journal.tags || []),
        ]
          .join(" ")
          .toLowerCase();

        return text.includes(query);
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      );
  }, [journals, search]);

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const openForm = () => {
    setError("");
    setShowForm(true);
  };

  const handleSave = async (data) => {
    if (saving) return;

    try {
      setSaving(true);
      setError("");

      if (typeof onAddJournal !== "function") {
        throw new Error(
          "Save function connected nahi hai. App.jsx ka /journals route check karo."
        );
      }

      const savedJournal = await onAddJournal(data);

      if (!savedJournal || !savedJournal._id) {
        throw new Error(
          savedJournal?.message || "Journal save nahi hua."
        );
      }

      setShowForm(false);
    } catch (err) {
      setError(err.message || "Journal save nahi ho paya.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8f5ee] text-[#3b3028]">
      {/* Sidebar */}
      <aside className="flex w-40 shrink-0 flex-col bg-[#302018] px-3 py-6 text-[#eee1d0] sm:w-60 sm:px-5">
        <h2 className="mb-10 text-lg font-bold sm:text-xl">
          🌿 MindJournal
        </h2>

        <nav className="space-y-3">
          <Link
            to="/dashboard"
            className="block rounded-lg px-3 py-3 hover:bg-[#493125]"
          >
            🏠 Dashboard
          </Link>

          <Link
            to="/journals"
            className="block rounded-lg bg-[#a84f32] px-3 py-3 text-white"
          >
            📔 Journal
          </Link>

          <Link
            to="/moods"
            className="block rounded-lg px-3 py-3 hover:bg-[#493125]"
          >
            ☺ Mood Tracker
          </Link>
        </nav>

        <p className="mt-auto pt-10 text-sm text-[#c7b5a3]">
          Every thought matters 🌱
        </p>
      </aside>

      {/* Main content */}
      <main className="min-w-0 flex-1 px-4 py-7 sm:px-8 lg:px-12">
        <header className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold">
              Journal
            </h1>

            <p className="mt-2 text-sm text-[#897a6c]">
              Your personal space for thoughts and reflections.
            </p>
          </div>

          <button
            type="button"
            onClick={openForm}
            className="rounded-lg bg-[#a84f32] px-4 py-3 text-sm font-semibold text-white hover:bg-[#8e3f27]"
          >
            + New Entry
          </button>
        </header>

        {/* New journal form */}
        {showForm && (
          <section className="mb-7 rounded-2xl border border-[#e8dfd2] bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="font-serif text-xl font-semibold">
                New Journal Entry
              </h2>

              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setError("");
                }}
                disabled={saving}
                className="rounded-lg px-3 py-2 text-sm hover:bg-[#f4eee6] disabled:opacity-50"
              >
                Close ✕
              </button>
            </div>

            <JournalForm onSubmit={handleSave} />

            {saving && (
              <p className="mt-3 text-sm text-[#897a6c]">
                Saving your journal...
              </p>
            )}

            {error && (
              <p className="mt-3 text-sm text-red-600">
                {error}
              </p>
            )}
          </section>
        )}

        {/* Search */}
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search your journal..."
          className="mb-6 w-full rounded-xl border border-[#e5dbce] bg-white px-4 py-3 outline-none focus:border-[#a84f32]"
        />

        {/* Journal entries */}
        {filteredJournals.length > 0 ? (
          <div className="space-y-3">
            {filteredJournals.map((journal) => (
              <article
                key={journal._id}
                className="rounded-2xl border border-[#e8dfd2] bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
              >
                <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                  <h2 className="font-serif text-lg font-semibold">
                    {journal.title || "Daily Journal"}
                  </h2>

                  <span className="text-xs text-[#897a6c]">
                    {formatDate(journal.createdAt)}
                  </span>
                </div>

                <p className="whitespace-pre-wrap break-words text-sm leading-6 text-[#6f6257]">
                  {(journal.content || "").length > 240
                    ? `${journal.content.slice(0, 240)}...`
                    : journal.content}
                </p>

                {journal.image && (
                  <img
                    src={journal.image}
                    alt="Journal attachment"
                    className="mt-4 max-h-64 max-w-full rounded-xl object-cover"
                  />
                )}

                {journal.tags?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {journal.tags.map((tag, index) => (
                      <span
                        key={`${tag}-${index}`}
                        className="rounded-full bg-[#f5e9df] px-3 py-1 text-xs text-[#8e4a32]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedJournal(journal)}
                  className="mt-4 text-sm font-semibold text-[#a84f32] hover:underline"
                >
                  Read full entry →
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#e8dfd2] bg-white px-5 py-16 text-center">
            <div className="mb-3 text-4xl">📔</div>

            <h2 className="font-serif text-xl font-semibold">
              {search
                ? "No matching entries"
                : "Your story starts here"}
            </h2>

            <p className="mt-2 text-sm text-[#897a6c]">
              {search
                ? "Try another search term."
                : "Write down your thoughts and save your first entry."}
            </p>

            {!search && (
              <button
                type="button"
                onClick={openForm}
                className="mt-5 rounded-lg bg-[#a84f32] px-5 py-3 text-sm font-semibold text-white hover:bg-[#8e3f27]"
              >
                + Write your first entry
              </button>
            )}
          </div>
        )}

        {/* Read full entry */}
        {selectedJournal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setSelectedJournal(null)}
          >
            <div
              role="dialog"
              aria-modal="true"
              className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-[#fffdf8] p-6 shadow-xl sm:p-8"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold">
                    {selectedJournal.title || "Daily Journal"}
                  </h2>

                  <p className="mt-2 text-sm text-[#897a6c]">
                    {formatDate(selectedJournal.createdAt)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedJournal(null)}
                  className="rounded-lg px-3 py-2 hover:bg-[#f0e8dc]"
                >
                  ✕
                </button>
              </div>

              <p className="whitespace-pre-wrap break-words leading-7 text-[#51453b]">
                {selectedJournal.content}
              </p>

              {selectedJournal.image && (
                <img
                  src={selectedJournal.image}
                  alt="Journal attachment"
                  className="mt-5 max-h-80 rounded-xl object-contain"
                />
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}



