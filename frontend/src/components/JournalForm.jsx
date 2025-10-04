import { useState } from "react";

export default function JournalForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-dark p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Write a Journal ✍️</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-3 p-2 rounded bg-gray-800 text-white"
      />
      <textarea
        placeholder="How was your day?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full mb-3 p-2 rounded bg-gray-800 text-white"
      />
      <button type="submit" className="bg-primary px-4 py-2 rounded text-white hover:bg-indigo-700">
        Save
      </button>
    </form>
  );
}
