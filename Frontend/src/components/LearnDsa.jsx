import { useLayoutEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Database,
  BrainCircuit,
  Bookmark,
} from "lucide-react";
import { useEffect } from "react";
import api from "../api";
import AddNoteButton from "./AddNoteButton";
import PageLoading from "./PageLoading";

export default function LearnDsa() {
  const [loading, setLoading] = useState(true);
  const [innerLoading, setInnerLoading] = useState(true);
  const [dataStructureTitles, setDataStructureTitles] = useState([]);
  const [algorithmTitles, setAlgorithmTitles] = useState([]);
  const [mode, setMode] = useState("data");
  const [openSection, setOpenSection] = useState(-1);
  const [activeContentSection, setActiveContentSection] = useState("description");
  const titles = mode === "data" ? dataStructureTitles : algorithmTitles;
  const [questions, setQuestions] = useState([]);
  const [topicDescription, setTopicDescription] = useState(null);
  const [topicExamples, setTopicExamples] = useState([]);
  const [examplesError, setExamplesError] = useState("");
  const [topicInterviewQuestions, setTopicInterviewQuestions] = useState([]);
  const [interviewQuestionsError, setInterviewQuestionsError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [bookmarkedIds, setBookmarkedIds] = useState(() => new Set());
  const [bookmarksReady, setBookmarksReady] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState({});
  const [bookmarkError, setBookmarkError] = useState("");
  const [solvedLoading, setSolvedLoading] = useState({});
  const [solvedError, setSolvedError] = useState("");
  const topicHeaderRefs = useRef([]);
  const fetchSequenceRef = useRef(0);

  const scrollTopicToOffset = (index) => {
    const topicHeader = topicHeaderRefs.current[index];
    const scrollContainer = topicHeader?.closest(".overflow-y-scroll");
    if (!topicHeader || !scrollContainer) return;

    const targetScrollTop =
      scrollContainer.scrollTop +
      topicHeader.getBoundingClientRect().top -
      scrollContainer.getBoundingClientRect().top -
      50;

    scrollContainer.scrollTo({
      top: Math.max(0, targetScrollTop),
      behavior: "smooth",
    });
  };

  useLayoutEffect(() => {
    if (openSection >= 0) {
      scrollTopicToOffset(openSection);
    }
  }, [openSection, innerLoading]);

  useEffect(() => {
    api.get("/bookmarks", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(({ data }) => {
      setBookmarkedIds(new Set(data.map((item) => Number(item.question_id))));
    }).catch((error) => {
      console.error("Failed to load bookmarks:", error);
    }).finally(() => {
      setBookmarksReady(true);
    });
  }, []);

  const toggleBookmark = async (questionId) => {
    const isBookmarked = bookmarkedIds.has(Number(questionId));
    setBookmarkError("");
    setBookmarkLoading((current) => ({ ...current, [questionId]: true }));

    try {
      if (isBookmarked) {
        await api.delete(`/bookmarks/${questionId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      } else {
        await api.post("/bookmarks", {
          question_id: questionId,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      }

      setBookmarkedIds((current) => {
        const updated = new Set(current);
        if (isBookmarked) updated.delete(Number(questionId));
        else updated.add(Number(questionId));
        return updated;
      });
    } catch (error) {
      console.error("Failed to update bookmark:", error);
      setBookmarkError("Could not update bookmark. Please try again.");
    } finally {
      setBookmarkLoading((current) => ({ ...current, [questionId]: false }));
    }
  };

  const toggleSolved = async (item) => {
    const questionId = Number(item.question_id ?? item.id);
    if (!Number.isInteger(questionId) || questionId <= 0 || solvedLoading[questionId]) return;

    const nextSolved = !item.learn_solved;
    setSolvedError("");
    setSolvedLoading((current) => ({ ...current, [questionId]: true }));
    setQuestions((current) => current.map((question) =>
      Number(question.question_id ?? question.id) === questionId
        ? {
            ...question,
            learn_solved: nextSolved,
            solved: nextSolved ? true : question.solved,
          }
        : question
    ));

    try {
      const { data } = await api.post(
        "/solvedquestions",
        {
          action: nextSolved ? "create" : "delete",
          question_id: questionId,
          mode: mode === "data" ? "data" : "algorithm",
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
      );
      setQuestions((current) => current.map((question) =>
        Number(question.question_id ?? question.id) === questionId
          ? {
              ...question,
              learn_solved: data.learn_solved,
              solved: nextSolved ? true : question.solved,
            }
          : question
      ));
    } catch (error) {
      console.error("Failed to update solved question:", error);
      setQuestions((current) => current.map((question) =>
        Number(question.question_id ?? question.id) === questionId
          ? {
              ...question,
              learn_solved: Boolean(item.learn_solved),
              solved: Boolean(item.solved),
            }
          : question
      ));
      setSolvedError(error.response?.data?.message || "Could not update solved status. Please try again.");
    } finally {
      setSolvedLoading((current) => ({ ...current, [questionId]: false }));
    }
  };

  const getDsTitles = async () => {
    const responce = await api.get(
      "/datastructure/",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }
    );
    const data = await responce.data;
    return data;
  };

  const getAlgoTitles = async () => {
    const responce = await api.get("/algorithm/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });
    const data = await responce.data;
    return data;
  };

  const getQuestions = async (topicId, mode) => {
    const response = await api.get(
      `/${
        mode === "data" ? "datastructure" : "algorithm"
      }/questions`,
      {
        params: mode === "data" ? { ds_id: topicId } : { algo_id: topicId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );


    const data = await response.data;
    return data;
  };

  const getTopicDescription = async (topicId, mode) => {
    const type = mode === "data" ? "datastructure" : "algorithm";
    const { data } = await api.get(
      `/${type}/description/${topicId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return data;
  };

  const getTopicExamples = async (topicId, mode) => {
    const type = mode === "data" ? "datastructure" : "algorithm";
    const { data } = await api.get(
      `/${type}/examples/${topicId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return data;
  };

  const getTopicInterviewQuestions = async (topicId, mode) => {
    const type = mode === "data" ? "datastructure" : "algorithm";
    const { data } = await api.get(
      `/${type}/interview-question/${topicId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
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
    return <PageLoading />;
  }

  return (
    <div className="min-h-full w-full px-6 py-8 bg-zinc-950 rounded-2xl border border-mist-700">
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
            fetchSequenceRef.current += 1;
            setMode("data");
            setOpenSection(-1);
            setInnerLoading(false);
          }}
          className={`flex cursor-pointer items-center gap-2 rounded-lg border border-mist-700 px-5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
            mode === "data"
              ? "bg-amber-500/15 text-amber-300 hover:bg-amber-500/25"
              : "text-gray-300 hover:bg-mist-800 hover:text-white"
          }`}
        >
          <Database size={20} strokeWidth={2.2} />
          <span>Data Structures</span>
        </button>

        <button
          onClick={() => {
            fetchSequenceRef.current += 1;
            setMode("algorithm");
            setOpenSection(-1);
            setInnerLoading(false);
          }}
          className={`flex cursor-pointer items-center gap-2 rounded-lg border border-mist-700 px-5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
            mode === "algorithm"
              ? "bg-amber-500/15 text-amber-300 hover:bg-amber-500/25"
              : "text-gray-300 hover:bg-mist-800 hover:text-white"
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
                ref={(element) => { topicHeaderRefs.current[index] = element; }}
                aria-expanded={isOpen}
                aria-controls={`learn-topic-${mode}-${title.id}`}
                onClick={async () => {
                  // Closing
                  if (isOpen) {
                    fetchSequenceRef.current += 1;
                    setOpenSection(-1);
                    setInnerLoading(false);
                    setQuestions([]);
                    setTopicDescription(null);
                    setTopicExamples([]);
                    setExamplesError("");
                    setTopicInterviewQuestions([]);
                    setInterviewQuestionsError("");
                    setDescriptionError("");
                    return;
                  }

                  // Opening
                  const fetchSequence = ++fetchSequenceRef.current;
                  setOpenSection(index);
                  topicHeaderRefs.current[index]?.focus({ preventScroll: true });
                  scrollTopicToOffset(index);
                  setActiveContentSection("description");
                  setInnerLoading(true);
                  setTopicDescription(null);
                  setTopicExamples([]);
                  setExamplesError("");
                  setTopicInterviewQuestions([]);
                  setInterviewQuestionsError("");
                  setDescriptionError("");

                  const [questionsResult, descriptionResult, examplesResult, interviewQuestionsResult] = await Promise.allSettled([
                    getQuestions(title.id, mode),
                    mode === "data"
                      ? getTopicDescription(title.id, mode)
                      : getTopicDescription(title.id, mode).catch((error) => {
                          if (title.topic_description) {
                            return {
                              description: title.topic_description,
                              things_to_remember: title.things_to_remember,
                            };
                          }
                          throw error;
                        }),
                    getTopicExamples(title.id, mode),
                    getTopicInterviewQuestions(title.id, mode),
                  ]);

                  if (fetchSequence !== fetchSequenceRef.current) return;

                  if (questionsResult.status === "fulfilled") {
                    setQuestions(questionsResult.value);
                  } else {
                    console.error("Failed to fetch questions:", questionsResult.reason);
                    setQuestions([]);
                  }

                  if (descriptionResult.status === "fulfilled" && descriptionResult.value.description) {
                    setTopicDescription(descriptionResult.value);
                  } else {
                    console.error("Failed to fetch description:", descriptionResult.reason);
                    setDescriptionError(
                      descriptionResult.reason.response?.data?.message ||
                        "Could not load this description. Please try again."
                    );
                  }

                  if (examplesResult.status === "fulfilled") {
                    setTopicExamples(examplesResult.value);
                  } else {
                    console.error("Failed to fetch examples:", examplesResult.reason);
                    setTopicExamples([]);
                    setExamplesError(
                      examplesResult.reason.response?.data?.message ||
                        "Could not load examples. Check that the backend is running the latest routes."
                    );
                  }

                  if (interviewQuestionsResult.status === "fulfilled") {
                    setTopicInterviewQuestions(interviewQuestionsResult.value);
                  } else {
                    console.error("Failed to fetch interview questions:", interviewQuestionsResult.reason);
                    setTopicInterviewQuestions([]);
                    setInterviewQuestionsError(
                      interviewQuestionsResult.reason.response?.data?.message ||
                        "Could not load interview questions. Check that the backend is running the latest routes."
                    );
                  }

                  setInnerLoading(false);
                }}
                className={`flex w-full cursor-pointer items-center justify-between px-6 py-5 transition-colors hover:bg-mist-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-500 ${isOpen ? "bg-mist-800" : ""}`}
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
                <div id={`learn-topic-${mode}-${title.id}`} className="border-t border-mist-700">
                  <div className="flex flex-wrap gap-2 border-b border-mist-700 px-4 py-3">
                    {["description", "questions", "interview questions"].map((section) => (
                      <button
                        key={section}
                        type="button"
                        onClick={() => setActiveContentSection(section)}
                        className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                          activeContentSection === section
                            ? "bg-amber-500/15 text-amber-300 hover:bg-amber-500/25"
                            : "text-gray-300 hover:bg-mist-800 hover:text-white"
                        }`}
                      >
                        {section}
                      </button>
                    ))}
                  </div>

                  {activeContentSection === "description" && (
                    <div className="p-5 text-gray-300">
                      {descriptionError ? (
                        <p className="text-sm text-red-400" role="alert">{descriptionError}</p>
                      ) : topicDescription?.description ? (
                        <div className="space-y-6">
                          <p className="whitespace-pre-line text-sm leading-6">{topicDescription.description}</p>
                          {topicDescription.things_to_remember && (
                            <section className="rounded-xl border border-mist-700 bg-mist-900 p-4">
                              <h3 className="mb-2 font-semibold text-amber-400">Things to remember</h3>
                              <div className="space-y-1 text-sm leading-6 text-gray-300">
                                {topicDescription.things_to_remember
                                  .split(/(?<=\.)\s*/)
                                  .filter((item) => item.trim())
                                  .map((item, index) => <p key={index}>{item.trim()}</p>)}
                              </div>
                            </section>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-500">Description for {title.name} is not available yet.</p>
                      )}
                      <section className="mt-6 space-y-3">
                        <h3 className="font-semibold text-amber-400">Examples</h3>
                        {examplesError ? (
                          <p className="text-sm text-red-400" role="alert">{examplesError}</p>
                        ) : topicExamples.length > 0 ? (
                          topicExamples.map((item, exampleIndex) => (
                            <article key={item.example_id} className="rounded-xl border border-mist-700 bg-mist-900 p-4">
                              <h4 className="mb-2 text-sm font-medium text-white">{item.title || `Example ${exampleIndex + 1}`}</h4>
                              <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-6 text-gray-300">{item.example}</pre>
                              {item.explanation && <p className="mt-3 whitespace-pre-line text-sm leading-6 text-gray-400">{item.explanation}</p>}
                            </article>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500">No examples have been added for this topic yet.</p>
                        )}
                      </section>
                    </div>
                  )}

                  {activeContentSection === "interview questions" && (
                    <div className="space-y-3 p-4">
                      {interviewQuestionsError ? (
                        <p className="text-sm text-red-400" role="alert">{interviewQuestionsError}</p>
                      ) : topicInterviewQuestions.length > 0 ? (
                        topicInterviewQuestions.map((item, questionIndex) => (
                          <article key={item.question_id} className="rounded-xl border border-mist-700 bg-mist-900 p-4">
                            <div className="flex items-start justify-between gap-4">
                              <h3 className="text-sm font-medium text-white">{questionIndex + 1}. {item.question}</h3>
                              {item.difficulty && <span className="shrink-0 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-medium text-amber-400">{item.difficulty}</span>}
                            </div>
                            {item.answer && <p className="mt-3 whitespace-pre-line text-sm leading-6 text-gray-400">{item.answer}</p>}
                            <div className="mt-4 flex justify-end">
                              <AddNoteButton
                                category="interview"
                                sourceId={item.question_id}
                                title={item.question}
                                details=""
                                className="flex cursor-pointer items-center gap-2 rounded-lg border border-mist-700 bg-mist-800 px-3 py-2 text-xs text-white transition hover:bg-mist-700"
                              />
                            </div>
                          </article>
                        ))
                      ) : (
                        <p className="p-2 text-gray-500">Interview questions for {title.name} are not available yet.</p>
                      )}
                    </div>
                  )}

                  {activeContentSection === "questions" && <div className="space-y-3 p-4">
                  {bookmarkError && (
                    <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400" role="alert">
                      {bookmarkError}
                    </p>
                  )}
                  {solvedError && (
                    <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400" role="alert">
                      {solvedError}
                    </p>
                  )}
                  {questions.map((item, index) => {
                    const questionId = Number(item.question_id ?? item.id);
                    const isSavingSolved = Boolean(solvedLoading[questionId]);
                    const leetcodeId = item.leetcode_id ?? item.leetcodeId ?? item.leetcodeid;
                    const platform = item.platform ?? "LeetCode";

                    return (
                    <div
                      key={item.question_id ?? item.id}
                      className="flex flex-col gap-4 rounded-xl border border-mist-700 bg-mist-900 p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      {/* Left */}
                      <div className="flex min-w-0 items-start gap-3 sm:items-center">
                        <input
                          checked={Boolean(item.learn_solved)}
                          onChange={() => toggleSolved(item)}
                          disabled={isSavingSolved}
                          type="checkbox"
                          className="h-4 w-4 cursor-pointer accent-amber-500 disabled:cursor-wait disabled:opacity-50"
                        />

                        <span className="w-6 shrink-0 text-sm font-semibold text-gray-500">
                          {index + 1}.
                        </span>

                        <div className="min-w-0">
                          <h2 className="break-words text-base font-semibold leading-6 text-white">
                            {item.title}
                          </h2>

                          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400">
                            <span>{platform}</span>

                            {leetcodeId != null && <span>#{leetcodeId}</span>}




                            {item.solved ? (
                              <span className="text-green-400">✓ Solved</span>
                            ) : (
                              <span className="text-gray-500">Unsolved</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right */}
                      <div className="flex flex-wrap items-center gap-3 sm:shrink-0">
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
                          className="cursor-pointer rounded-lg border border-amber-500/30 bg-amber-500/15 px-4 py-2 text-sm font-medium text-amber-300 transition-colors hover:border-amber-500/50 hover:bg-amber-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                        >
                          Solve
                        </a>

                        <AddNoteButton
                          category="question"
                          sourceId={item.question_id ?? item.id}
                          title={item.title}
                          details=""
                          className="flex cursor-pointer items-center gap-2 rounded-lg border border-mist-700 bg-mist-800 px-4 py-2 text-sm text-white transition hover:bg-mist-700"
                        />

                        <button
                          type="button"
                          onClick={() => toggleBookmark(item.question_id ?? item.id)}
                          disabled={!bookmarksReady || Boolean(bookmarkLoading[item.question_id ?? item.id])}
                          aria-label={bookmarkedIds.has(Number(item.question_id ?? item.id))
                            ? `Remove ${item.title} from bookmarks`
                            : `Bookmark ${item.title}`}
                          aria-pressed={bookmarkedIds.has(Number(item.question_id ?? item.id))}
                          title={bookmarkedIds.has(Number(item.question_id ?? item.id))
                            ? "Remove bookmark"
                            : "Bookmark question"}
                          className="cursor-pointer rounded-lg border border-mist-700 bg-mist-800 p-2 text-gray-300 transition hover:bg-mist-700 disabled:cursor-wait disabled:opacity-50"
                        >
                          <Bookmark
                            size={18}
                            className={bookmarkedIds.has(Number(item.question_id ?? item.id))
                              ? "fill-amber-400 text-amber-400"
                              : ""}
                          />
                        </button>
                      </div>
                    </div>
                    );
                  })}
                  </div>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
