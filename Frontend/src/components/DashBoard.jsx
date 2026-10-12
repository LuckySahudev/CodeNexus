import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BookOpen, Code2, Trophy, Flame, PlayCircle, Target } from "lucide-react";

const emptyDashboard = {
  summary: { solvedQuestions: 0, remainingQuestions: 0, completion: 0 },
  streak: { current: 0, longest: 0 },
  continueLearning: null,
  lastPractice: null,
  dailyGoal: { completed: 0, target: 5, remaining: 5, progress: 0 },
  weeklyActivity: [],
};

export default function Dashboard({ userName }) {
  const [dashboard, setDashboard] = useState(emptyDashboard);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please log in to view your dashboard.");
      const { data } = await axios.get("http://localhost:8080/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDashboard({ ...emptyDashboard, ...data });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          requestError.message ||
          "Could not load your dashboard.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  if (loading) {
    return (
      <div className="flex min-h-full w-full items-center justify-center rounded-2xl border border-mist-700 bg-mist-950 px-6 py-8">
        <div className="flex items-center justify-center py-20" role="status">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-600 border-t-amber-500" />
          <span className="ml-4 text-gray-400">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-full w-full rounded-2xl border border-mist-700 bg-mist-950 px-6 py-8">
        <p className="text-red-400" role="alert">{error}</p>
        <button
          type="button"
          onClick={loadDashboard}
          className="mt-4 rounded-lg bg-amber-500 px-4 py-2 font-medium text-black transition hover:bg-amber-400"
        >
          Try again
        </button>
      </div>
    );
  }

  const { summary, streak, lastPractice, dailyGoal, weeklyActivity } = dashboard;

  return (
    <div className="min-h-full w-full rounded-2xl border border-mist-700 bg-mist-950 px-6 py-8 text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Welcome back{userName ? `, ${userName}` : ""} {"\u{1F44B}"}</h1>
        <p className="mt-2 text-sm text-gray-400">Continue your DSA journey and get ready for coding interviews.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <Card icon={<BookOpen />} title="Solved" value={summary.solvedQuestions} />
            <Card icon={<Target />} title="Remaining" value={summary.remainingQuestions} />
            <Card icon={<Flame />} title="Daily Streak" value={`${streak.current} ${streak.current === 1 ? "Day" : "Days"}`} />
            <Card icon={<Trophy />} title="Completion" value={`${summary.completion}%`} />
      </div>

      <div className="my-8 grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
        <section className="flex min-h-52 min-w-0 flex-col rounded-xl border border-mist-700 bg-mist-900 p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Continue Learning</h2>
            <PlayCircle className="shrink-0" size={20} />
          </div>
          <div className="mt-4 flex flex-1 flex-col items-start">
            {dashboard.continueLearning ? (
              <>
                <p className="break-words text-base font-medium">{dashboard.continueLearning.title}</p>
                <p className="mt-1 text-sm text-gray-400">Last watched: {dashboard.continueLearning.lastWatched || "Recently"}</p>
              </>
            ) : (
              <p className="text-sm text-gray-400">Choose a topic and continue learning.</p>
            )}
            <Link to="/dev/learndsa" className="mt-auto inline-flex min-h-10 items-center rounded-lg border border-blue-600 px-4 py-2 text-sm text-blue-400 transition hover:bg-blue-600/10">Browse topics</Link>
          </div>
        </section>

        <section className="flex min-h-52 min-w-0 flex-col rounded-xl border border-mist-700 bg-mist-900 p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Last Practice</h2>
            <Code2 className="shrink-0" size={20} />
          </div>
          <div className="mt-4 flex flex-1 flex-col items-start">
            <p className="break-words text-base font-medium">{lastPractice?.title || "No practice yet"}</p>
            <p className="mt-1 text-sm text-gray-400">
              {lastPractice?.solvedAt ? `Solved ${new Date(lastPractice.solvedAt).toLocaleDateString()}` : "Solve a question to see it here."}
            </p>
            <Link to="/dev/practice" className="mt-auto inline-flex min-h-10 items-center rounded-lg border border-green-600 px-4 py-2 text-sm text-green-400 transition hover:bg-green-600/10">Practice</Link>
          </div>
        </section>

        <section className="flex min-h-52 min-w-0 flex-col rounded-xl border border-mist-700 bg-mist-900 p-5">
          <h2 className="text-lg font-semibold">Today&apos;s Goal</h2>
          <div className="mt-4 flex flex-1 flex-col items-start">
            <p className="text-base font-bold">{dailyGoal.completed} / {dailyGoal.target} questions</p>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-zinc-800" role="progressbar" aria-valuemin={0} aria-valuemax={dailyGoal.target} aria-valuenow={dailyGoal.completed}>
              <div className="h-full rounded-full bg-amber-500 transition-all" style={{ width: `${dailyGoal.progress}%` }} />
            </div>
            <p className="mt-2 text-sm text-gray-400">
              {dailyGoal.remaining ? `Solve ${dailyGoal.remaining} more ${dailyGoal.remaining === 1 ? "question" : "questions"} today.` : "Daily goal complete. Great work!"}
            </p>
            <Link to="/dev/progress" className="mt-auto inline-flex min-h-10 items-center rounded-lg border border-amber-600 px-4 py-2 text-sm text-amber-400 transition hover:bg-amber-600/10">See Progress</Link>
          </div>
        </section>
      </div>

      <section className="mt-8 rounded-xl border border-mist-700 bg-mist-900 p-5 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-xl font-semibold">Weekly Activity</h2>
            <p className="mt-1 text-sm text-gray-400">Questions solved each day over the last 7 days</p>
          </div>
          <p className="text-sm text-gray-400">{weeklyActivity.reduce((total, day) => total + Number(day.solved || 0), 0)} solved this week</p>
        </div>
        {weeklyActivity.length ? (
          <div className="mt-5 flex h-64 items-stretch gap-2 rounded-lg border border-mist-700 p-3 sm:gap-4 sm:p-5">
            {weeklyActivity.map(({ date, solved }) => {
              const maxSolved = Math.max(...weeklyActivity.map((day) => Number(day.solved) || 0), 1);
              const count = Number(solved) || 0;
              const dayLabel = new Date(`${date}T12:00:00`).toLocaleDateString(undefined, { weekday: "short" });
              return (
                <div key={date} className="flex min-w-0 flex-1 flex-col items-center justify-end gap-2">
                  <span className="text-sm font-medium tabular-nums text-gray-300">{count}</span>
                  <div className="flex w-full flex-1 items-end justify-center">
                    <div className="w-full max-w-12 rounded-t-md bg-amber-500 transition-all" style={{ height: `${count === 0 ? 3 : Math.max((count / maxSolved) * 100, 8)}%` }} title={`${count} ${count === 1 ? "question" : "questions"} solved`} />
                  </div>
                  <span className="text-xs text-gray-400 sm:text-sm">{dayLabel}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="mt-5 text-sm text-gray-400">No activity data for this week.</p>
        )}
      </section>
    </div>
  );
}

function Card({ icon, title, value }) {
  return (
    <div className="rounded-xl border border-mist-700 bg-mist-900 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xl text-gray-400">{title}</p>
          <h2 className="text-xl font-bold text-amber-500">{value}</h2>
        </div>
        <div className="p-3">{icon}</div>
      </div>
    </div>
  );
}
