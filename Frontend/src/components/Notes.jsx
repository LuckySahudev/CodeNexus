import { useState } from "react";
import {
  NotebookPen,
  FileQuestion,
  BriefcaseBusiness,
  Plus,
  CalendarDays,
} from "lucide-react";

export default function Notes() {
  const [mode, setMode] = useState("general");

  const generalNotes = [
    {
      id: 1,
      title: "Sliding Window",
      date: "24 Jul 2026",
      content:
        "Sliding Window is useful for subarray problems. Keep two pointers and adjust the window based on the condition.",
    },
    {
      id: 2,
      title: "Binary Search",
      date: "23 Jul 2026",
      content:
        "Always identify whether the search space is sorted. Use mid = low + (high-low)/2.",
    },
    {
      id: 3,
      title: "Prefix Sum",
      date: "21 Jul 2026",
      content:
        "Prefix Sum helps answer range sum queries in O(1) after preprocessing.",
    },
  ];

  const questionNotes = [
    {
      id: 1,
      title: "Two Sum",
      question: "LeetCode #1",
      date: "22 Jul 2026",
      content:
        "Used HashMap for O(n). Remember to check the complement before inserting.",
    },
    {
      id: 2,
      title: "Maximum Subarray",
      question: "LeetCode #53",
      date: "21 Jul 2026",
      content:
        "Kadane's Algorithm. Reset current sum whenever it becomes negative.",
    },
    {
      id: 3,
      title: "Product of Array Except Self",
      question: "LeetCode #238",
      date: "20 Jul 2026",
      content:
        "Solved using prefix and suffix product arrays without division.",
    },
  ];

  const interviewNotes = [
    {
      id: 1,
      title: "HR Question",
      date: "19 Jul 2026",
      content:
        "Tell me about yourself. Keep it under 90 seconds and focus on projects.",
    },
    {
      id: 2,
      title: "DBMS",
      date: "18 Jul 2026",
      content:
        "Difference between clustered and non-clustered indexes is frequently asked.",
    },
    {
      id: 3,
      title: "Operating System",
      date: "17 Jul 2026",
      content:
        "Prepare Deadlock, Paging, Scheduling Algorithms and Virtual Memory.",
    },
  ];

  const display =
    mode === "general"
      ? generalNotes
      : mode === "question"
        ? questionNotes
        : interviewNotes;

  return (
    <div className="rounded-2xl border border-mist-700 flex-col h-full bg-mist-950 text-white p-6">
      <div className="mx-auto max-w-7xl ">
        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold">My Notes</h1>
        </div>

        {/* Tabs */}
        <div className="mb-6  flex  flex-wrap gap-5 rounded-xl border border-mist-700 bg-mist-900 px-5 py-3">
          <button
            onClick={() => setMode("general")}
            className={`flex items-center gap-2 rounded-lg border border-mist-700 px-5 py-2 text-base transition-all ${
              mode === "general"
                ? "bg-amber-500 font-semibold text-black"
                : "text-gray-300 hover:bg-mist-800"
            }`}
          >
            <NotebookPen size={18} />
            <span>General Notes</span>
          </button>

          <button
            onClick={() => setMode("question")}
            className={`flex items-center gap-2 rounded-lg border border-mist-700 px-5 py-2 text-base transition-all ${
              mode === "question"
                ? "bg-amber-500 font-semibold text-black"
                : "text-gray-300 hover:bg-mist-800"
            }`}
          >
            <FileQuestion size={18} />
            <span>Question Notes</span>
          </button>

          <button
            onClick={() => setMode("interview")}
            className={`flex items-center gap-2 rounded-lg border border-mist-700 px-5 py-2 text-base transition-all ${
              mode === "interview"
                ? "bg-amber-500 font-semibold text-black"
                : "text-gray-300 hover:bg-mist-800"
            }`}
          >
            <BriefcaseBusiness size={18} />
            <span>Interview Notes</span>
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className=" flex-1 grid gap-6 md:grid-cols-2 xl:grid-cols-3 overflow-y-auto scrollbar-hide ">
        {display.map((note) => (
          <div
            key={note.id}
            className="rounded-xl border border-mist-700 bg-mist-900 p-6 transition-all duration-300  hover:border-amber-500"
          >
            <div className="mb-4 flex items-start justify-between">
              <h2 className="text-xl font-semibold">{note.title}</h2>

              <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400">
                {mode === "general"
                  ? "General"
                  : mode === "question"
                    ? "Question"
                    : "Interview"}
              </span>
            </div>

            {note.question && (
              <div className="mb-4 inline-block rounded-lg bg-mist-800 px-3 py-1 text-sm text-amber-400">
                {note.question}
              </div>
            )}

            <p className="mb-6 text-gray-400">{note.content}</p>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CalendarDays size={16} />
              {note.date}
            </div>
          </div>
        ))}

        {/* Empty State */}
        {display.length === 0 && (
          <div className="mt-20 text-center">
            <NotebookPen
              size={80}
              className="mx-auto mb-5 text-amber-500 opacity-70"
            />

            <h2 className="text-2xl font-semibold">No Notes Found</h2>

            <p className="mt-2 text-gray-400">
              Click the Add Note button to create your first note.
            </p>
          </div>
        )}
      </div>

      {/* Floating Button */}
      <button className="fixed bottom-8 right-8 flex items-center gap-3 rounded-full bg-amber-500 px-6 py-4 font-semibold text-black shadow-xl transition-all duration-300 hover:scale-105 hover:bg-amber-400">
        <Plus size={22} />
        <span>Add Note</span>
      </button>
    </div>
  );
}
