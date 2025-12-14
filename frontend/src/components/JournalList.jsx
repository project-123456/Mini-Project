import { motion } from "framer-motion";

export default function JournalList({ journals }) {
  if (!journals?.length)
    return (
      <p className="text-center text-gray-400 mt-6">
        No entries yet 🌱
      </p>
    );

  return (
    <div className="mt-8 space-y-4">
      {journals.map((j) => (
        <motion.div
          key={j._id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 backdrop-blur-md rounded-2xl p-5 shadow"
        >
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">
              {new Date(j.createdAt).toDateString()}
            </span>
          </div>

          {/* Activities */}
          {j.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {j.tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 text-xs bg-emerald-100 text-emerald-700 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Note */}
          {j.content && (
            <p className="mt-3 text-gray-700 leading-relaxed">
              {j.content}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
}
