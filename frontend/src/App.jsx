import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Insights from "./components/Insights";
import FloatingChatbot from "./components/FloatingChatbot";

import Dashboard from "./components/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import MoodTracker from "./components/MoodTracker";
import JournalForm from "./components/JournalForm";
import About from "./pages/About";
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
  const token = localStorage.getItem("token");


  useEffect(() => {
  if (!token) {
    setUser(null);
    return;
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
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  loadData();
}, [token]); // ✅ THIS FIXES NAME ISSUE



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
        <Route path="/about" element={<About user={user}/>} />

        <Route
          path="/journals"
          element={
            <div className="max-w-4xl mx-auto p-6">
              <JournalForm onSubmit={handleAddJournal} />
              <JournalList journals={journals} />
              
            </div>
          }
        />
        <Route path="/journalBot" element={<JournalBot />} />

        <Route
         path="/insights"
          element={
            <Insights
              moods={moods}
              journals={journals}
            />
          }
      />


        

        <Route
          path="/moods"
          element={<MoodTracker token={token} setMoods={setMoods} moods={moods} />}
        />
      </Routes>

      {/* ✅ EXACT YAHAN ADD KARNA HAI */}
      <FloatingChatbot />

    </Router>
  );
}

export default App;
