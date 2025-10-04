export default function JournalList({ journals }) {
  if (!journals?.length)
    return <p className="text-gray-400">No journals yet. Start writing ✍️</p>;

  return (
    <div className="grid gap-4 mt-4">
      {journals.map((journal) => (
        <div
          key={journal._id}
          className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
        >
          <h3 className="text-xl font-semibold text-indigo-600">
            {journal.title}
          </h3>
          <p className="text-gray-600 mt-2">{journal.content}</p>
          <p className="text-sm text-gray-400 mt-2">
            {new Date(journal.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
