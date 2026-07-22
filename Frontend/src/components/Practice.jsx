import { Search, Flame, ExternalLink } from "lucide-react";

const questions = [
  {
    id: 1001,
    title: "Two Sum",
    difficulty: "Easy",
    topic: "HashMap",
    solved: true,
  },
  {
    id: 1002,
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    topic: "Array",
    solved: false,
  },
  {
    id: 1003,
    title: "Contains Duplicate",
    difficulty: "Easy",
    topic: "HashSet",
    solved: true,
  },
  {
    id: 1004,
    title: "Product of Array Except Self",
    difficulty: "Medium",
    topic: "Prefix Sum",
    solved: false,
  },
  {
    id: 1005,
    title: "Maximum Subarray",
    difficulty: "Medium",
    topic: "Kadane",
    solved: false,
  },
];

export default function Practice() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Practice Questions
        </h1>

        <p className="text-zinc-400 mt-2">
          Solve curated DSA questions and track your progress.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">

        <div className="flex-1 relative">

          <Search
            className="absolute left-4 top-3.5 text-zinc-500"
            size={18}
          />

          <input
            placeholder="Search questions..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3 pl-11 pr-4 outline-none focus:border-blue-500"
          />

        </div>

        <select className="bg-zinc-900 border border-zinc-800 rounded-lg px-4">
          <option>All Difficulty</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <select className="bg-zinc-900 border border-zinc-800 rounded-lg px-4">
          <option>All Topics</option>
          <option>Array</option>
          <option>String</option>
          <option>HashMap</option>
          <option>Sliding Window</option>
        </select>

      </div>

      {/* Daily Challenge */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8">

        <div className="flex justify-between items-center">

          <div>

            <div className="flex items-center gap-2 text-orange-400">
              <Flame size={18} />
              <span>Today's Challenge</span>
            </div>

            <h2 className="text-2xl font-semibold mt-3">
              Best Time to Buy and Sell Stock
            </h2>

            <p className="text-zinc-400 mt-2">
              Difficulty: Easy • Estimated Time: 15 min
            </p>

          </div>

          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium">
            Solve Now
          </button>

        </div>

      </div>

      {/* Question Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-zinc-800">

            <tr>

              <th className="text-left p-4">#</th>

              <th className="text-left p-4">
                Question
              </th>

              <th className="text-left p-4">
                Difficulty
              </th>

              <th className="text-left p-4">
                Topic
              </th>

              <th className="text-left p-4">
                Status
              </th>

              <th className="text-center p-4">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {questions.map((q) => (

              <tr
                key={q.id}
                className="border-t border-zinc-800 hover:bg-zinc-800/50 transition"
              >

                <td className="p-4">
                  {q.id}
                </td>

                <td className="p-4 font-medium">
                  {q.title}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm
                    ${
                      q.difficulty === "Easy"
                        ? "bg-green-500/20 text-green-400"
                        : q.difficulty === "Medium"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {q.difficulty}
                  </span>

                </td>

                <td className="p-4">
                  {q.topic}
                </td>

                <td className="p-4">

                  {q.solved ? (
                    <span className="text-green-400">
                      ✅ Solved
                    </span>
                  ) : (
                    <span className="text-zinc-400">
                      ⭕ Unsolved
                    </span>
                  )}

                </td>

                <td className="p-4 text-center">

                  <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">

                    Solve

                    <ExternalLink size={16} />

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}