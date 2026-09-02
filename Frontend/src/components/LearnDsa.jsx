import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Database,
  BrainCircuit,
  NotebookPen,
} from "lucide-react";
import { useEffect } from "react";

export default function LearnDsa() {
  const [loading, setLoading] = useState(true);
  const [innerLoading, setInnerLoading] = useState(true);
  const [dataStructureTitles, setDataStructureTitles] = useState([]);
  const [algorithmTitles, setAlgorithmTitles] = useState([]);
  const [mode, setMode] = useState("data");
  const [openSection, setOpenSection] = useState(-1);
  const titles = mode === "data" ? dataStructureTitles : algorithmTitles;
  const [questions, setQuestions] = useState([]);

  const getDsTitles = async () => {
    const responce = await fetch("http://localhost:8080/datastructure/");
    const data = await responce.json();
    return data;
  };

  const getAlgoTitles = async () => {
    const responce = await fetch("http://localhost:8080/algorithm/");
    const data = await responce.json();
    return data;
  };

  const getQuestions = async (idx, mode) => {
    const response = await fetch(
      `http://localhost:8080/${
        mode === "data" ? "dsaquestions" : "algoquestions"
      }/${idx + 1}`,
    );

    const data = await response.json();
    return data;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [dsTitles, algoTitles] = await Promise.all([
          getDsTitles(),
          getAlgoTitles(),
        ]);

        setDataStructureTitles(dsTitles);
        setAlgorithmTitles(algoTitles);
      } catch (error) {
        console.error("Failed to fetch titles:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Loading in front
  if (loading) {
    return (
      <div className="h-full flex justify-center items-center px-6 py-8 bg-zinc-950 rounded-2xl border border-mist-700">
        <div className="flex items-center justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-600 border-t-amber-500"></div>
          <span className="ml-4 text-gray-400">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 bg-zinc-950 rounded-2xl border border-mist-700 ">
      {/* Heading */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">Learn DSA</h1>

        <p className="mt-2 text-gray-400 text-lg ">
          Learn Data Structures and Algorithms topic by topic.
        </p>
      </div>

      {/* Toggle */}

      <div className="mb-8 flex px-4 py-3 gap-3 rounded-xl border border-mist-700 bg-mist-900 p-1">
        <button
          onClick={() => {
            setMode("data");
            setOpenSection(-1);
          }}
          className={`flex items-center gap-2 rounded-lg border border-mist-700 px-5 py-2 text-base transition-all ${
            mode === "data"
              ? "bg-amber-500 font-semibold text-black"
              : "text-gray-300 hover:bg-mist-800"
          }`}
        >
          <Database size={20} strokeWidth={2.2} />
          <span>Data Structures</span>
        </button>

        <button
          onClick={() => {
            setMode("algorithm");
            setOpenSection(-1);
          }}
          className={`flex items-center gap-2 rounded-lg border border-mist-700 px-5 py-2 text-base transition-all ${
            mode === "algorithm"
              ? "bg-amber-500 font-semibold text-black"
              : "text-gray-300 hover:bg-mist-800"
          }`}
        >
          <BrainCircuit size={20} strokeWidth={2.2} />
          <span>Algorithms</span>
        </button>
      </div>

      {/* Accordion */}

      <div className="space-y-3 ">
        {titles.map((title, index) => {
          // map variables // title is a object that have title details
          const isOpen = openSection === index;
          return (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-mist-700 bg-mist-900"
            >
              {/* Header */}

              <button
                onClick={async () => {
                  // Closing
                  if (isOpen) {
                    setOpenSection(-1);
                    setQuestions([]);
                    return;
                  }

                  // Opening
                  setOpenSection(index);
                  setInnerLoading(true);

                  const data = await getQuestions(index, mode);

                  setQuestions(data);
                  setInnerLoading(false);
                }}
                className="flex w-full items-center justify-between px-6 py-5 transition hover:bg-mist-800"
              >
                <div className="text-left">
                  <h2 className="text-xl font-semibold text-white">
                    {title.name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-400">
                    {title.question_count}
                  </p>
                </div>

                <div className="flex gap-5">
                  {innerLoading && index === openSection ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-600 border-t-amber-500" />
                  ) : isOpen ? (
                    <ChevronDown size={22} className="text-gray-400" />
                  ) : (
                    <ChevronRight size={22} className="text-gray-400" />
                  )}
                </div>
              </button>

              {/* Question List */}

              {isOpen && !innerLoading && (
                <div className="space-y-3 border-t border-mist-700 p-4">
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
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
