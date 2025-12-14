import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import MoodTracker from "./components/MoodTracker";
import JournalForm from "./components/JournalForm";
import JournalList from "./components/JournalList";
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
  const token = localStorage.getItem("token");


  useEffect(() => {
  if (!token) {
    setUser(null);
    return; // ⛔ STOP HERE
  }

  const loadData = async () => {
    try {
      const profile = await getUserProfile(token);
      setUser(profile);

      const journalsData = await getJournals(token);
      setJournals(journalsData);

      const moodsData = await getMoods(token);
      setMoods(moodsData);
    } catch (err) {
      console.error("AUTH FAILED, CLEARING TOKEN");
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  loadData();
}, []); // 👈 IMPORTANT: empty dependency


  // Add new journal
  const handleAddJournal = async (data) => {
    const newJournal = await addJournal(data, token);
    if (newJournal?._id) setJournals([newJournal, ...journals]);
  };

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user}/>} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route
          path="/journals"
          element={
            <div className="max-w-4xl mx-auto p-6">
              <JournalForm onSubmit={handleAddJournal} />
              <JournalList journals={journals} />
            </div>
          }
        />
        <Route
          path="/moods"
          element={<MoodTracker token={token} setMoods={setMoods} moods={moods} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
