import { NotebookPen } from "lucide-react";
import { useState } from "react";
import axios from "axios";

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
  const [editWin, setEditWin] = useState(false);
  const [preferences, setPreferences] = useState(null);
  const [loadingPreferences, setLoadingPreferences] = useState(false);
  const [savingPreferences, setSavingPreferences] = useState(false);
  const [preferencesError, setPreferencesError] = useState("");

  const requestConfig = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  const loadPreferences = async () => {
    setLoadingPreferences(true);
    setPreferencesError("");
    try {
      const response = await axios.get(
        "http://localhost:8080/practice/preferences",
        requestConfig
      );
      setPreferences(response.data);
      setEditWin(true);
    } catch (error) {
      console.error("Error loading practice preferences:", error);
      setPreferencesError("Could not load your practice preferences.");
    } finally {
      setLoadingPreferences(false);
    }
  };

  const togglePreference = (category, itemName, selected) => {
    setPreferences((current) => ({
      ...current,
      [category]: current[category].map((item) =>
        item.name === itemName ? { ...item, selected } : item
      ),
    }));
  };

  const savePreferences = async () => {
    setSavingPreferences(true);
    setPreferencesError("");
    try {
      await axios.put(
        "http://localhost:8080/practice/preferences",
        {
          difficulties: preferences.difficulties.filter((item) => item.selected).map((item) => item.name),
          data_structures: preferences.data_structures.filter((item) => item.selected).map((item) => item.name),
          algorithms: preferences.algorithms.filter((item) => item.selected).map((item) => item.name),
        },
        requestConfig
      );
      setEditWin(false);
    } catch (error) {
      console.error("Error saving practice preferences:", error);
      setPreferencesError(error.response?.data?.message || "Could not save your practice preferences.");
    } finally {
      setSavingPreferences(false);
    }
  };

  return (
    <>
      {editWin ? (
        <div className="rounded-xl border border-mist-700 bg-mist-950 p-6">
          <h2 className="text-lg font-semibold text-white">
            Practice Preferences
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Choose the topics you've already learned. CodeNexus will generate
            practice questions only from these topics.
          </p>

          {loadingPreferences && <p role="status" className="mt-3 text-sm text-gray-400">Loading saved preferences…</p>}
          {preferencesError && <p role="alert" className="mt-3 text-sm text-red-400">{preferencesError}</p>}

          {preferences && <>
          {/* Difficulty */}
          <div className="mt-8">
            <h3 className="mb-3 text-sm font-medium text-gray-300">
              Difficulty
            </h3>

            <div className="flex flex-wrap gap-6">
              {preferences.difficulties.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input type="checkbox" checked={item.selected} onChange={(event) => togglePreference("difficulties", item.name, event.target.checked)} className="cursor-pointer h-4 w-4 accent-amber-500" />
                  <span>{item.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Data Structures */}
          <div className="mt-8">
            <h3 className="mb-3 text-sm font-medium text-gray-300">
              Data Structures
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {preferences.data_structures.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-2 rounded-lg border border-mist-700 bg-mist-800 px-3 py-2 hover:border-amber-500 cursor-pointer"
                >
                  <input type="checkbox" checked={item.selected} onChange={(event) => togglePreference("data_structures", item.name, event.target.checked)} className="accent-amber-500" />
                  <span className="text-sm">{item.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Algorithm Topics */}
          <div className="mt-8">
            <h3 className="mb-3 text-sm font-medium text-gray-300">
              Algorithm Topics
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {preferences.algorithms.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-2 rounded-lg border border-mist-700 bg-mist-800 px-3 py-2 hover:border-amber-500 cursor-pointer"
                >
                  <input type="checkbox" checked={item.selected} onChange={(event) => togglePreference("algorithms", item.name, event.target.checked)} className="accent-amber-500" />
                  <span className="text-sm">{item.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button
              className="rounded-lg border border-mist-700 px-4  py-2 text-sm font-medium text-gray-300 hover:bg-mist-800"
              onClick={() => {
                setPreferencesError("");
                setEditWin(false);
              }}
            >
              Cancel
            </button>

            <button
              className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-400 transition-all duration-200 hover:border-amber-400 hover:bg-amber-500 hover:text-black"
              onClick={savePreferences}
              disabled={savingPreferences}
            >
              {savingPreferences ? "Saving…" : "Save Preferences"}
            </button>
          </div>
          </>}
        </div>
      ) : (
        <div className=" bg-zinc-950 rounded-2xl border border-gray-600 text-white p-6 ">
          {/* Search & Filters */}

          <div className="my-5 flex items-center justify-between rounded-xl border border-mist-700 bg-mist-900 px-6 py-4">
            <div className="flex flex-wrap items-center gap-8">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Difficulty
                </p>
                <p className="mt-1 font-medium text-amber-400">Easy</p>
              </div>

              <div className="h-10 w-px bg-mist-700"></div>

              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Last Added
                </p>
                <p className="mt-1 font-medium text-white">Array</p>
              </div>
            </div>

            <button
              className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-400 transition-all duration-200 hover:border-amber-400 hover:bg-amber-500 hover:text-black"
              onClick={loadPreferences}
              disabled={loadingPreferences}
            >
              {loadingPreferences ? "Loading…" : "Edit"}
            </button>
          </div>
          {preferencesError && <p role="alert" className="mb-4 text-sm text-red-400">{preferencesError}</p>}

          {/* Question List */}
          <div className="space-y-3  bg-zinc-950 rounded-2xl border border-gray-600 text-white p-6">
            {questions.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl border border-mist-700 bg-mist-900 px-5 py-2 transition hover:border-mist-500 "
              >
                {/* Left */}
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-amber-500 cursor-pointer"
                  />

                  <span className="w-8 text-sm font-semibold text-gray-500">
                    {index + 1}.
                  </span>

                  <div>
                    <h2 className="font-medium text-xl text-white">
                      {item.title}
                    </h2>

                    <div className=" flex items-center gap-3 text-sm text-gray-400">
                      <span>#{item.leetcodeId}</span>

                      <span>•</span>

                      <span>{item.topic}</span>

                      <span>•</span>

                      {item.solved ? (
                        <span className="text-green-400">✓ Solved</span>
                      ) : (
                        <span className="text-gray-500">Unsolved</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      item.difficulty === "Easy"
                        ? "bg-green-500/20 text-green-400"
                        : item.difficulty === "Medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {item.difficulty}
                  </span>

                  
                  <a
                    href={`https://leetcode.com/problems/${item.slug}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg text-sm bg-amber-500 px-4 py-2 font-medium text-black transition hover:bg-amber-400"
                  >
                    Solve
                  </a>

                  <button className="flex items-center gap-2 rounded-lg border border-mist-700 bg-mist-800 px-4 py-2 text-base text-white transition hover:bg-mist-700">
                    Add Notes
                    <NotebookPen size={16} />
                  </button>

                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
