import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/"); // वापस HomePage पर भेज दो
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold text-gray-800">
        MindJournal <span className="text-purple-500">✨</span>
      </h1>

      <div className="space-x-6">
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="text-gray-700 hover:text-purple-600 font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-gray-700 hover:text-purple-600 font-medium"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/"
              className="text-gray-700 hover:text-purple-600 font-medium"
            >
              Home
            </Link>
            <Link
              to="/journals"
              className="text-gray-700 hover:text-purple-600 font-medium"
            >
              Journals
            </Link>
            <Link
              to="/mood-tracker"
              className="text-gray-700 hover:text-purple-600 font-medium"
            >
              Mood Tracker
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-red-500 font-medium"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
