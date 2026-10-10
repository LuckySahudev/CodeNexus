import { useEffect, useState } from "react";
import axios from "axios";
import { Activity, BrainCircuit, CheckCircle2, Database } from "lucide-react";

const emptyProgress = {
  summary: {
    solvedQuestions: 0,
    totalQuestions: 0,
    remainingQuestions: 0,
    completion: 0,
  },
  difficultyBreakdown: [],
  recentActivity: [],
  dataStructures: [],
  algorithms: [],
};

export default function Progress() {
  const [progress, setProgress] = useState(emptyProgress);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProgress = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get("http://localhost:8080/progress", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setProgress({ ...emptyProgress, ...response.data });
    } catch (requestError) {
      console.error("Error loading progress:", requestError);
      setError(
        requestError.response?.data?.message ||
          "Could not load your progress. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProgress();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-full w-full items-center justify-center rounded-2xl border border-mist-700 bg-mist-950 px-6 py-8">
        <div className="flex items-center justify-center py-20" role="status">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-600 border-t-amber-500" />
          <span className="ml-4 text-gray-400">Loading progress...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-full w-full rounded-2xl border border-mist-700 bg-mist-950 px-6 py-8">
        <p className="text-red-400" role="alert">
          {error}
        </p>
        <button
          type="button"
          onClick={loadProgress}
          className="mt-4 rounded-lg bg-amber-500 px-4 py-2 font-medium text-black transition hover:bg-amber-400"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-full w-full rounded-2xl border border-mist-700 bg-mist-950 px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-white">Your Progress</h1>
        <p className="mt-2 text-sm text-gray-400">
          Track your coding journey and stay interview ready.
        </p>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-2">
        <div className="flex flex-col items-stretch gap-3">
          <section className="w-full rounded-xl border border-mist-700 bg-mist-900 p-5">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Overall Progress
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                  Questions completed
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold leading-none text-amber-400">
                  {progress.summary.completion}%
                </p>
              </div>
            </div>
            <div
              className="h-2 overflow-hidden rounded-full bg-mist-800"
              role="progressbar"
              aria-label="Overall question completion"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress.summary.completion}
            >
              <div
                className="h-full rounded-full bg-amber-500 transition-all duration-500"
                style={{ width: `${progress.summary.completion}%` }}
              />
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm">
              <p className="text-gray-300">
                <span className="font-semibold text-white">
                  {progress.summary.solvedQuestions}
                </span>{" "}
                of {progress.summary.totalQuestions} solved
              </p>
              <p className="text-gray-400">
                {progress.summary.remainingQuestions} remaining
              </p>
            </div>
          </section>

          <section className="w-full rounded-xl border border-mist-700 bg-mist-900 p-5">
            <h2 className="mb-4 text-lg font-semibold text-white">
              Difficulty Breakdown
            </h2>
            {progress.difficultyBreakdown.length ? (
              <div className="space-y-4">
                {progress.difficultyBreakdown.map((item) => (
                  <ProgressBar
                    key={item.name}
                    label={item.name}
                    value={item.progress}
                  />
                ))}
              </div>
            ) : (
              <EmptyMessage>No difficulty data available.</EmptyMessage>
            )}
          </section>
        </div>

        <section className="self-start rounded-xl border border-mist-700 bg-mist-900 p-5">
          <div className="mb-4 flex items-center gap-3">
            <Activity size={20} className="text-amber-400" />
            <h2 className="text-lg font-semibold text-white">
              Recent Activity
            </h2>
          </div>
          {progress.recentActivity.length ? (
            <div className="space-y-3">
              {progress.recentActivity.map((item) => (
                <div
                  key={`${item.title}-${item.solvedAt}`}
                  className="flex items-center justify-between gap-4 rounded-lg border border-mist-700 bg-mist-800 px-4 py-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <CheckCircle2
                      size={18}
                      className="shrink-0 text-amber-400"
                    />
                    <span className="truncate text-sm font-medium text-gray-200">{item.title}</span>
                  </div>
                  <span className="shrink-0 text-sm text-gray-400">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <EmptyMessage>You have not solved any questions yet.</EmptyMessage>
          )}
        </section>
      </div>

      <div className="mt-8 grid items-stretch gap-6 lg:grid-cols-2">
        <ProgressSection
          title="Data Structures"
          icon={<Database size={22} className="text-amber-400" />}
          items={progress.dataStructures}
        />
        <ProgressSection
          title="Algorithms"
          icon={<BrainCircuit size={22} className="text-amber-400" />}
          items={progress.algorithms}
        />
      </div>
    </div>
  );
}

function ProgressSection({ title, icon, items }) {
  return (
    <section className="h-full rounded-xl border border-mist-700 bg-mist-900 p-5">
      <div className="mb-4 flex items-center gap-3">
        {icon}
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>
      {items.length ? (
        <div className="max-h-[400px] space-y-4 overflow-y-auto scrollbar-hide">
          {items.map((item) => (
            <ProgressBar
              key={item.name}
              label={item.name}
              value={item.progress}
            />
          ))}
        </div>
      ) : (
        <EmptyMessage>No {title.toLowerCase()} data available.</EmptyMessage>
      )}
    </section>
  );
}

function ProgressBar({ label, value = 0 }) {
  const percentage = Math.min(100, Math.max(0, Number(value) || 0));

  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-gray-200">{label}</span>
        <span className="shrink-0 text-sm text-gray-400">{percentage}%</span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-mist-800">
        <div
          className="h-full rounded-full bg-amber-500 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function EmptyMessage({ children }) {
  return <p className="py-4 text-sm text-gray-400">{children}</p>;
}
