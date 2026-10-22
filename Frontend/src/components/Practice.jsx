import { useCallback, useEffect, useRef, useState } from "react";
import api from "../api";
import { CalendarDays } from "lucide-react";
import AddNoteButton from "./AddNoteButton";
import PageLoading from "./PageLoading";

const requestConfig = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

const recommendationLabel = {
  new: "New",
  revision: "Revision",
  carry_forward: "Carry Forward",
};

const difficultyColors = {
  easy: "bg-green-400",
  medium: "bg-yellow-400",
  hard: "bg-red-400",
};

const formatPracticeDate = (value) => {
  if (!value) return "-";
  const date = new Date(`${String(value).slice(0, 10)}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysAgo = Math.floor((today - date) / 86400000);
  if (daysAgo <= 0) return "Today";
  if (daysAgo === 1) return "Yesterday";
  if (daysAgo < 7) return date.toLocaleDateString(undefined, { weekday: "long" });
  const weeksAgo = Math.floor(daysAgo / 7);
  return `${weeksAgo} ${weeksAgo === 1 ? "week" : "weeks"} ago`;
};

export default function Practice() {
  const [daily, setDaily] = useState({ questions: [], practice_date: null, message: null });
  const [history, setHistory] = useState([]);
  const [historyDate, setHistoryDate] = useState("");
  const [historyNotice, setHistoryNotice] = useState("");
  const historyDateInputRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [solvingQuestionIds, setSolvingQuestionIds] = useState(() => new Set());
  const [editWin, setEditWin] = useState(false);
  const [preferences, setPreferences] = useState(null);
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [loadingPreferences, setLoadingPreferences] = useState(false);
  const [savingPreferences, setSavingPreferences] = useState(false);
  const [preferencesError, setPreferencesError] = useState("");

  const loadDailyPractice = useCallback(async () => {
    setError("");
    try {
      const response = await api.get("/practice/today", requestConfig());
      setDaily(response.data);
      try {
        const historyResponse = await api.get("/practice/history", requestConfig());
        setHistory(historyResponse.data.questions || []);
      } catch (historyRequestError) {
        console.error("Error loading practice history:", historyRequestError);
      }
      try {
        const preferencesResponse = await api.get("/practice/preferences", requestConfig());
        setSelectedDifficulties(
          (preferencesResponse.data.difficulties || [])
            .filter((item) => item.selected)
            .map((item) => item.name)
        );
      } catch (preferencesRequestError) {
        console.error("Error loading selected practice difficulties:", preferencesRequestError);
      }
    } catch (requestError) {
      console.error("Error loading daily practice:", requestError);
      setError(requestError.response?.data?.message || "Could not load today's practice.");
    } finally {
      setLoading(false);
    }
  }, []);

  const markQuestionSolved = async (questionId, practiceDate) => {
    const solvingKey = `${practiceDate}:${questionId}`;
    setError("");
    setSolvingQuestionIds((current) => new Set(current).add(solvingKey));
    try {
      const response = await api.patch(
        `/practice/questions/${questionId}/solved`,
        { practice_date: practiceDate },
        requestConfig()
      );
      const updatedPracticeDates = new Set(response.data.updated_practice_dates || [practiceDate]);
      const updateQuestion = (item) =>
        Number(item.question_id) === Number(response.data.question_id)
        && updatedPracticeDates.has(item.practice_date)
          ? { ...item, solved: true, status: "solved" }
          : item;
      setDaily((current) => ({ ...current, questions: current.questions.map(updateQuestion) }));
      setHistory((current) => current.map(updateQuestion));
    } catch (requestError) {
      console.error("Error marking practice question solved:", requestError);
      setError(requestError.response?.data?.message || "Could not mark this question as solved.");
    } finally {
      setSolvingQuestionIds((current) => {
        const next = new Set(current);
        next.delete(solvingKey);
        return next;
      });
    }
  };

  useEffect(() => {
    loadDailyPractice();
    const refreshOnFocus = () => loadDailyPractice();
    window.addEventListener("focus", refreshOnFocus);
    return () => window.removeEventListener("focus", refreshOnFocus);
  }, [loadDailyPractice]);

  useEffect(() => {
    if (!historyNotice) return undefined;
    const timeoutId = window.setTimeout(() => setHistoryNotice(""), 3000);
    return () => window.clearTimeout(timeoutId);
  }, [historyNotice]);

  const loadPreferences = async () => {
    setLoadingPreferences(true);
    setPreferencesError("");
    try {
      const response = await api.get("/practice/preferences", requestConfig());
      setPreferences(response.data);
      setSelectedDifficulties(
        (response.data.difficulties || []).filter((item) => item.selected).map((item) => item.name)
      );
      setEditWin(true);
    } catch (requestError) {
      console.error("Error loading practice preferences:", requestError);
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
      const response = await api.put("/practice/preferences", {
        difficulties: preferences.difficulties.filter((item) => item.selected).map((item) => item.name),
        data_structures: preferences.data_structures.filter((item) => item.selected).map((item) => item.name),
        algorithms: preferences.algorithms.filter((item) => item.selected).map((item) => item.name),
      }, requestConfig());
      setSelectedDifficulties(preferences.difficulties.filter((item) => item.selected).map((item) => item.name));
      if (response.data.practice) setDaily(response.data.practice);
      setEditWin(false);
    } catch (requestError) {
      console.error("Error saving practice preferences:", requestError);
      const responseMessage = requestError.response?.data?.message;
      const details = requestError.response?.data?.details;
      setPreferencesError(details ? `${responseMessage} (${details})` : responseMessage || "Could not save your practice preferences.");
    } finally {
      setSavingPreferences(false);
    }
  };

  const filteredHistory = historyDate
    ? history.filter((item) => item.practice_date === historyDate)
    : [];
  const today = new Date();
  const todayValue = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const visibleQuestions = historyDate
    ? historyDate === daily.practice_date ? daily.questions : filteredHistory
    : daily.questions;

  if (editWin) {
    return (
      <section className="flex min-h-[620px] flex-col rounded-xl border border-mist-700 bg-mist-950 p-6 text-white">
        <h2 className="text-lg font-semibold">Practice Preferences</h2>
        <p className="mt-1 text-sm text-gray-400">Choose the topics you&apos;ve already learned. CodeNexus will generate practice questions only from these topics.</p>
        {loadingPreferences && <p role="status" className="mt-3 text-sm text-gray-400">Loading preferencesâ€¦</p>}
        {preferencesError && <p role="alert" className="mt-3 text-sm text-red-400">{preferencesError}</p>}
        {preferences && <>
          {[["difficulties", "Difficulty"], ["data_structures", "Data Structures"], ["algorithms", "Algorithm Topics"]].map(([category, title]) => (
            <div className="mt-7" key={category}>
              <h3 className="mb-3 text-sm font-medium text-gray-300">{title}</h3>
              <div className={category === "difficulties"
                ? "flex flex-wrap gap-x-6 gap-y-3"
                : "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"}>
                {preferences[category].map((item) => (
                  <label key={item.name} className={category === "difficulties"
                    ? "flex cursor-pointer items-center gap-2 text-sm text-gray-200"
                    : "flex min-w-0 cursor-pointer items-center gap-2 rounded-lg border border-mist-700 bg-mist-800 px-3 py-2 text-sm transition-colors hover:border-amber-500/60 has-[:checked]:border-amber-500/50 has-[:checked]:bg-amber-500/10"}>
                    <input type="checkbox" checked={Boolean(item.selected)} onChange={(event) => togglePreference(category, item.name, event.target.checked)} className="h-4 w-4 shrink-0 accent-amber-500" />
                    <span className="min-w-0">{item.name}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div className="mt-auto flex justify-end gap-3 pt-8">
            <button className="cursor-pointer rounded-lg border border-mist-700 px-4 py-2 text-sm text-gray-300 hover:bg-mist-800 disabled:cursor-not-allowed disabled:opacity-60" onClick={() => { setPreferencesError(""); setEditWin(false); }} disabled={savingPreferences}>Cancel</button>
            <button className="cursor-pointer rounded-lg border border-amber-500/40 bg-amber-500 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60" onClick={savePreferences} disabled={savingPreferences}>
              {savingPreferences ? "Savingâ€¦" : "Save Preferences"}
            </button>
          </div>
        </>}
      </section>
    );
  }

  if (loading) {
    return <PageLoading />;
  }

  return (
    <div className="flex min-h-full w-full flex-col rounded-2xl border border-gray-600 bg-zinc-950 p-6 text-white">
      {error && <p role="alert" className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">{error}</p>}
      {preferencesError && <p role="alert" className="mb-4 text-sm text-red-400">{preferencesError}</p>}
      {!loading && (
        <>
          {daily.message && daily.questions.length > 0 && <p className="mb-4 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-sm text-amber-200">{daily.message}</p>}
          <div className="mb-5 flex items-center justify-between rounded-xl border border-mist-700 bg-mist-900 px-6 py-4">
            <div className="flex flex-wrap items-center gap-8">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500">Difficulty</p>
                <div className="mt-2 flex min-h-5 items-center gap-2" aria-label={`Selected difficulties: ${selectedDifficulties.join(", ") || "none"}`}>
                  {selectedDifficulties.map((difficulty) => (
                    <span key={difficulty} title={difficulty} className={`h-3 w-3 rounded-full ${difficultyColors[difficulty.toLowerCase()] || "bg-gray-400"}`} />
                  ))}
                </div>
              </div>
              <div className="hidden h-10 w-px bg-mist-700 sm:block" />
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500">Last Added</p>
                <p className="mt-1 text-sm font-medium text-white">
                  {formatPracticeDate(daily.practice_date)}
                </p>
              </div>
            </div>
            <button
              className="cursor-pointer rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-400 transition-all duration-200 hover:border-amber-400 hover:bg-amber-500 hover:text-black disabled:cursor-not-allowed"
              onClick={loadPreferences}
              disabled={loadingPreferences}
            >
              {loadingPreferences ? "Loadingâ€¦" : "Edit"}
            </button>
          </div>

          <section className="mb-5 rounded-xl border border-mist-700 bg-mist-900 p-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-sm font-semibold text-white">Previous practice</h2>
              <div className="relative">
                <input
                  ref={historyDateInputRef}
                  type="date"
                  value={historyDate}
                  max={todayValue}
                  onChange={(event) => {
                    const date = event.target.value;
                    setHistoryDate(date);
                    setHistoryNotice(date && date !== daily.practice_date && !history.some((item) => item.practice_date === date)
                      ? `No practice questions were recorded for ${formatPracticeDate(date)}.`
                      : "");
                  }}
                  aria-label="Choose a previous practice date"
                  className="pointer-events-none absolute h-px w-px opacity-0"
                />
                <button
                  type="button"
                  onClick={() => {
                    const input = historyDateInputRef.current;
                    if (input?.showPicker) input.showPicker();
                    else input?.click();
                  }}
                  aria-label={historyDate ? `Selected date: ${formatPracticeDate(historyDate)}. Choose another date` : "Choose a previous practice date"}
                  title={historyDate ? formatPracticeDate(historyDate) : "Choose date"}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-mist-700 bg-mist-950 px-2.5 py-1.5 text-gray-300 hover:border-mist-500"
                >
                  <CalendarDays size={16} aria-hidden="true" />
                  {historyDate && <span className="text-xs">{formatPracticeDate(historyDate)}</span>}
                </button>
              </div>
            </div>
          </section>

          {visibleQuestions.length === 0 ? (
            <div role={historyDate ? "alert" : undefined} className={`flex min-h-[360px] w-full flex-col items-center justify-center rounded-2xl border p-6 text-center text-sm ${historyDate ? "border-red-500/30 bg-red-500/10 text-red-300" : "border-gray-600 bg-zinc-950 text-gray-400"}`}>
              {historyDate
                ? historyNotice || `No practice questions were recorded for ${formatPracticeDate(historyDate)}.`
                : daily.message || "No questions are available for today's practice."}
            </div>
          ) : (
            <div className="min-h-[360px] w-full space-y-2 rounded-2xl border border-gray-600 bg-zinc-950 p-4">
              {visibleQuestions.slice(0, 5).map((item, index) => {
                const practiceCompleted = item.status === "solved";
                const questionSolved = Boolean(item.solved);
                const questionUrl = item.platform?.toLowerCase().includes("leetcode") && item.slug
                  ? `https://leetcode.com/problems/${item.slug}/`
                  : item.slug;
                return (
                  <article key={`${item.practice_date}-${item.question_id}`} className="flex flex-col justify-between rounded-xl border border-mist-700 bg-mist-900 px-4 py-2 sm:flex-row sm:items-center sm:gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <input
                        type="checkbox"
                        checked={practiceCompleted}
                        disabled={solvingQuestionIds.has(`${item.practice_date}:${item.question_id}`)}
                        onChange={(event) => {
                          if (event.target.checked && !practiceCompleted) {
                            markQuestionSolved(item.question_id, item.practice_date);
                          }
                        }}
                        aria-label={practiceCompleted ? `${item.title} completed for this practice` : `Mark ${item.title} solved`}
                        className="h-4 w-4 cursor-pointer accent-amber-500 disabled:cursor-wait"
                      />
                      <span className="w-6 shrink-0 text-sm font-semibold text-gray-500">{index + 1}.</span>
                      <div className="min-w-0">
                        <h2 className="break-words text-base font-semibold leading-6 text-white">{item.title}</h2>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-400">
                          {item.leetcode_id != null && <span>#{item.leetcode_id}</span>}
                          {item.leetcode_id != null && <span aria-hidden="true">|</span>}
                          <span>{recommendationLabel[item.recommendation_type] || item.recommendation_type}</span>
                          <span aria-hidden="true">|</span>
                          {questionSolved ? <span className="text-green-400">Solved</span> : <span className="text-gray-500">Unsolved</span>}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 flex shrink-0 flex-wrap items-center gap-2 sm:mt-0">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.difficulty === "Easy" ? "bg-green-500/20 text-green-400" : item.difficulty === "Medium" ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"}`}>{item.difficulty}</span>
                      {questionUrl && <a href={questionUrl} target="_blank" rel="noopener noreferrer" className="cursor-pointer rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-medium text-black hover:bg-amber-400">Solve</a>}
                      <AddNoteButton
                        category="question"
                        sourceId={item.question_id}
                        title={item.title}
                        details=""
                        className="flex cursor-pointer items-center gap-2 rounded-lg border border-mist-700 bg-mist-800 px-3 py-1.5 text-xs text-white transition hover:bg-mist-700"
                      />
                    </div>
                  </article>
                );
              })}
            </div>
          )}
          <footer className="mt-6 flex shrink-0 flex-wrap items-center justify-end gap-x-5 gap-y-2 pt-4 text-xs text-gray-400">
            <span className="font-medium">Difficulty key</span>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {[["Easy", "bg-green-400"], ["Medium", "bg-yellow-400"], ["Hard", "bg-red-400"]].map(([label, color]) => (
                <span key={label} className="inline-flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${color}`} aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
