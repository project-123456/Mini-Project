
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Insights from "./components/Insights";
import FloatingChatbot from "./components/ChatBot";
import WellnessDashboard from "./components/WellnessDashboard";
import Dashboard from "./components/Dashboard";

import WellnessSupport from "./pages/WellnessSupport";


import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";

import MoodTracker from "./components/MoodTracker";
import JournalList from "./components/JournalList";
import JournalBot from "./components/JournalBot";

import {
  addJournal,
  getJournals,
  getMoods,
  getUserProfile,
} from "./utils/api";

function App() {
  const [user, setUser] = useState(null);
  const [journals, setJournals] = useState([]);
  const [moods, setMoods] = useState([]);
  const [authChecked, setAuthChecked] = useState(false);

  // Load the logged-in user's data.
  useEffect(() => {
    let active = true;

    const loadData = async () => {
      const currentToken = localStorage.getItem("token");

      if (!currentToken) {
        if (active) {
          setUser(null);
          setJournals([]);
          setMoods([]);
          setAuthChecked(true);
        }
        return;
      }

      try {
        const profile = await getUserProfile(currentToken);

        if (!active) return;

        if (!profile || profile.message) {
          localStorage.removeItem("token");
          setUser(null);
          setJournals([]);
          setMoods([]);
          return;
        }

        setUser(profile);

        // Load journals and moods independently.
        const [journalResult, moodResult] = await Promise.allSettled([
          getJournals(currentToken),
          getMoods(currentToken),
        ]);

        if (!active) return;

        if (journalResult.status === "fulfilled") {
          const result = journalResult.value;
          setJournals(Array.isArray(result) ? result : []);
        } else {
          console.error("Failed to load journals:", journalResult.reason);
        }

        if (moodResult.status === "fulfilled") {
          const result = moodResult.value;
          setMoods(Array.isArray(result) ? result : []);
        } else {
          console.error("Failed to load moods:", moodResult.reason);
        }
      } catch (error) {
        console.error("Failed to load profile:", error.message);
        if (active) {
          setUser(null);
          setJournals([]);
          setMoods([]);
          localStorage.removeItem("token");
        }
      } finally {
        if (active) setAuthChecked(true);
      }
    };

    setAuthChecked(false);
    loadData();

    return () => {
      active = false;
    };
  }, []);

  // Save a journal through the backend API.
  const handleAddJournal = async (data) => {
    const currentToken = localStorage.getItem("token");

    if (!currentToken) {
      throw new Error("Please log in before saving your journal.");
    }

    const savedJournal = await addJournal(data, currentToken);

    if (!savedJournal || !savedJournal._id) {
      throw new Error(
        savedJournal?.message || "Journal could not be saved."
      );
    }

    setJournals((previous) => [
      savedJournal,
      ...previous.filter((item) => item._id !== savedJournal._id),
    ]);

    return savedJournal;
  };

  // Update state after login.
  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setAuthChecked(true);
  };

  // Clear the session on logout.
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setJournals([]);
    setMoods([]);
    setAuthChecked(true);
  };

  return (
    <Router>
      <Navbar user={user} setUser={handleLogout} />

      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={<Home user={user} />}
        />

        {/* Main dashboard */}
        <Route
          path="/dashboard"
          element={
            <WellnessDashboard
              user={user}
              token={localStorage.getItem("token")}
              moods={moods}
              setMoods={setMoods}
              journals={journals}
              onAddJournal={handleAddJournal}
            />
          }
        />

        {/* Dashboard preview */}
        <Route
          path="/dashboard-preview"
          element={<Dashboard user={user || { name: "Laxmi" }} />}
        />

        <Route
          path="/wellness-support"
          element={<WellnessSupport />}
        />

        {/* Login and registration */}
        <Route
          path="/login"
          element={<Login setUser={handleLogin} />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Profile and About */}
        <Route
          path="/profile"
          element={<Profile user={user} />}
        />

        <Route
          path="/about"
          element={<About user={user} />}
        />

        {/* Journal page */}
        <Route
          path="/journals"
          element={
            <JournalList
              journals={journals}
              onAddJournal={handleAddJournal}
            />
          }
        />

        {/* Journal chatbot */}
        <Route
          path="/journalBot"
          element={<JournalBot />}
        />

        {/* Insights */}
        <Route
          path="/insights"
          element={
            <Insights
              moods={moods}
              journals={journals}
            />
          }
        />

        {/* Mood tracker */}
        <Route
          path="/moods"
          element={
            <MoodTracker
              token={localStorage.getItem("token")}
              moods={moods}
              setMoods={setMoods}
            />
          }
        />

        {/* Fallback */}
        <Route
          path="*"
          element={
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-6 text-center">
              <h1 className="font-serif text-3xl text-[#35463a]">
                Page not found 🌿
              </h1>

              <button
                type="button"
                onClick={() => {
                  window.location.href = "/";
                }}
                className="rounded-full bg-[#607e63] px-6 py-3 text-white"
              >
                Back to home
              </button>
            </div>
          }
        />
      </Routes>

      <FloatingChatbot />
    </Router>
  );
}

export default App;


