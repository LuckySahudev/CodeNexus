import { ExternalLink, NotebookPen, Trash2, Bookmark } from "lucide-react";

const bookmarkedQuestions = [
  {
    id: 1001,
    title: "Two Sum",
    difficulty: "Easy",
    topic: "HashMap",
    solved: true,
  },
  {
    id: 1015,
    title: "Merge Intervals",
    difficulty: "Medium",
    topic: "Intervals",
    solved: false,
  },
  {
    id: 1032,
    title: "Trapping Rain Water",
    difficulty: "Hard",
    topic: "Two Pointer",
    solved: false,
  },
];

export default function Bookmarks() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-8 rounded-2xl bg-mist-950 border border-mist-700">
      {/* Header */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">Bookmarked Questions</h1>

        <p className="mt-2 text-lg text-gray-400">
          Quickly access your saved questions and revision notes.
        </p>
      </div>

      {/* Empty State */}

      {bookmarkedQuestions.length === 0 ? (
        <div className="flex h-[60vh] flex-col items-center justify-center rounded-xl border border-mist-700 bg-mist-900">
          <Bookmark size={70} className="mb-5 text-amber-400" />

          <h2 className="text-2xl font-semibold text-white">
            No Bookmarks Yet
          </h2>

          <p className="mt-2 text-gray-400">
            Bookmark your favorite questions while practicing.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarkedQuestions.map((item, index) => (
            <div
              key={item.id}
              className="rounded-xl border flex justify-between   border-mist-700 bg-mist-900 px-5 py-4 transition-all \ hover:bg-mist-800"
            >
              {/* Question */}

              <div>
                <h2 className="text-lg font-semibold text-white">
                {index + 1}. {item.title}
              </h2>

              {/* Details */}

              <div className=" flex flex-wrap items-center gap-3 text-sm">
                <span className="text-gray-400">#{item.id}</span>

                <span className="text-gray-600">•</span>

                <span className="text-gray-400">{item.topic}</span>

                <span className="text-gray-600">•</span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    item.difficulty === "Easy"
                      ? "bg-green-500/15 text-green-400"
                      : item.difficulty === "Medium"
                        ? "bg-yellow-500/15 text-yellow-400"
                        : "bg-red-500/15 text-red-400"
                  }`}
                >
                  {item.difficulty}
                </span>

                <span className="text-gray-600">•</span>

                {item.solved ? (
                  <span className="text-green-400">✓ Solved</span>
                ) : (
                  <span className="text-gray-400">Unsolved</span>
                )}
              </div>

              </div>

              
              {/* Buttons */}



              <div className=" flex flex-wrap items-center gap-3">
                <button className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-base font-medium text-black transition hover:bg-amber-400">
                  Solve
                  <ExternalLink size={16} />
                </button>

                <button className="flex items-center gap-2 rounded-lg border border-mist-700 bg-mist-800 px-4 py-2 text-base text-white transition hover:bg-mist-700">
                  Add Notes
                  <NotebookPen size={16} />
                </button>

                <button className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-base text-red-400 transition hover:bg-red-500/20">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
