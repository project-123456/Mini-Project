import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
      <h1
        onClick={() => navigate(user ? "/dashboard" : "/")}
        className="text-2xl font-bold cursor-pointer"
      >
        MindJournal ✨
      </h1>

      <div className="space-x-6">
        {!user ? (
          <>
            <Link to="/login" className="font-medium">
              Login
            </Link>
            <Link to="/register" className="font-medium">
              Create Account
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="font-medium">
              Dashboard
            </Link>
            <Link to="/journals" className="font-medium">
              Journals
            </Link>

            <Link to="/journalBot" className="font-medium">
              JournalBot
            </Link>

            <Link to="/moods" className="font-medium">
              Mood Tracker
            </Link>

            <Link to="/insights">Insights</Link>

            <button
              onClick={handleLogout}
              className="text-red-500 font-medium"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
