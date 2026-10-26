
import React from "react";
import { Link } from "react-router-dom";

export default function WellnessSupport() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/dashboard"
          className="mb-5 inline-block text-sm font-semibold text-indigo-600 hover:underline"
        >
          ← Back to Dashboard
        </Link>

        <section className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-2xl font-semibold text-slate-800">
              Wellness Support 💚
            </h1>
            <span className="rounded-full bg-pink-50 px-3 py-1 text-xs text-pink-600">
              ♥ Support
            </span>
          </div>

          <p className="mt-2 text-slate-500">
            Take care of yourself. You are not alone.
          </p>

          <img
            src="/AI.image.jpeg"
            alt="AI Wellness Assistant"
            className="mt-5 h-64 w-full rounded-2xl object-cover"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />

          <p className="mt-4 text-sm font-medium text-violet-600">
            ✨ Your AI Wellness Assistant
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            You are not alone ♡
          </h2>

          <p className="mt-2 leading-6 text-slate-500">
            Share your feelings, explore self-care ideas, and find support
            whenever you need it.
          </p>

          <div className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">
            <div className="rounded-xl bg-violet-50 p-4">
              <span className="text-2xl">💬</span>
              <p className="mt-1">AI Chat</p>
            </div>
            <div className="rounded-xl bg-amber-50 p-4">
              <span className="text-2xl">🌼</span>
              <p className="mt-1">Guidance</p>
            </div>
            <div className="rounded-xl bg-pink-50 p-4">
              <span className="text-2xl">💗</span>
              <p className="mt-1">Self-care</p>
            </div>
          </div>

          <Link
            to="/chatbot"
            className="mt-5 block rounded-full bg-indigo-600 px-4 py-3 text-center font-semibold text-white hover:bg-indigo-700"
          >
            💬 Start AI Chat Support →
          </Link>

          <p className="mt-2 text-center text-xs text-slate-400">
            Open your AI wellness chat
          </p>

          <a
            href="https://www.google.com/search?q=qualified+mental+health+therapist+near+me"
            target="_blank"
            rel="noreferrer"
            className="mt-4 block rounded-full bg-green-600 px-4 py-3 text-center font-semibold text-white hover:bg-green-700"
          >
            📞 Find a Real Therapist →
          </a>

          <p className="mt-4 text-xs leading-5 text-slate-500">
            AI support is not a substitute for professional therapy.
            If you are in crisis, contact local emergency services.
          </p>
        </section>
      </div>
    </main>
  );
}
