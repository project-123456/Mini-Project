import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-primary px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">MindJournal ✨</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-accent">Home</Link>
        <Link to="/journals" className="hover:text-accent">Journals</Link>
        <Link to="/moods" className="hover:text-accent">Mood Tracker</Link>
        <Link to="/login" className="hover:text-accent">Login</Link>
        <Link to="/register" className="hover:text-accent">Register</Link>
      </div>
    </nav>
  );
}
