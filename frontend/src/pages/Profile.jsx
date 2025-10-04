export default function Profile({ user }) {
  if (!user)
    return (
      <div className="p-6 text-center text-gray-500">
        Please log in to view your profile.
      </div>
    );

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
        Profile Details
      </h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p className="mt-4 text-gray-500">Keep journaling and tracking your mood 🌈</p>
    </div>
  );
}
