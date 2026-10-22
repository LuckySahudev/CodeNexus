import { useEffect, useState } from "react";
import axios from "axios";
import { ExternalLink, Trash2, Bookmark as BookmarkIcon } from "lucide-react";
import AddNoteButton from "./AddNoteButton";
import PageLoading from "./PageLoading";

const getQuestionId = (item) => item.question_id ?? item.id;

const getLeetCodeSlug = (item) =>
  item.slug ??
  item.leetcode_slug ??
  String(item.title ?? "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [error, setError] = useState("");

  const loadBookmarks = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get("http://localhost:8080/bookmarks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBookmarks(response.data);
    } catch (requestError) {
      console.error("Failed to load bookmarks:", requestError);
      setError(
        requestError.response?.data?.message || "Could not load bookmarks. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookmarks();
  }, []);

  const removeBookmark = async (questionId) => {
    setRemovingId(questionId);
    setError("");

    try {
      await axios.delete(`http://localhost:8080/bookmarks/${questionId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBookmarks((current) => current.filter((item) => getQuestionId(item) !== questionId));
    } catch (requestError) {
      console.error("Failed to remove bookmark:", requestError);
      setError(
        requestError.response?.data?.message || "Could not remove bookmark. Please try again.",
      );
    } finally {
      setRemovingId(null);
    }
  };

  if (loading) {
    return <PageLoading />;
  }

  return (
    <div className="flex min-h-full w-full flex-col rounded-2xl border border-mist-700 bg-mist-950 px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">Bookmarked Questions</h1>
        <p className="mt-2 text-lg text-gray-400">
          Quickly access your saved questions and revision notes.
        </p>
      </div>

      {error && bookmarks.length > 0 && (
        <p className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-red-400" role="alert">
          {error}
        </p>
      )}

      {error && bookmarks.length === 0 ? (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-5">
          <p className="text-red-400" role="alert">{error}</p>
          <button
            type="button"
            onClick={loadBookmarks}
            className="mt-4 rounded-lg bg-amber-500 px-4 py-2 font-medium text-black transition hover:bg-amber-400"
          >
            Try again
          </button>
        </div>
      ) : bookmarks.length === 0 ? (
        <div className="flex min-h-72 flex-1 flex-col items-center justify-center rounded-xl border border-mist-700 bg-mist-900 px-6 py-12 text-center">
          <BookmarkIcon size={56} className="mb-5 text-amber-400" />
          <h2 className="text-2xl font-semibold text-white">No Bookmarks Yet</h2>
          <p className="mt-2 text-gray-400">
            Bookmark questions in Learn DSA to keep them handy for revision.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarks.map((item, index) => {
            const questionId = getQuestionId(item);
            const leetcodeId = item.leetcodeId ?? item.leetcodeid ?? item.leetcode_id ?? questionId;
            const slug = getLeetCodeSlug(item);

            return (
              <article
                key={questionId}
                className="flex flex-col justify-between gap-4 rounded-xl border border-mist-700 bg-mist-900 px-5 py-4 sm:flex-row sm:items-center"
              >
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold text-white">
                    {index + 1}. {item.title}
                  </h2>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                    <span className="text-gray-400">#{leetcodeId}</span>
                    {item.topic && <span className="text-gray-400">{item.topic}</span>}
                    {item.difficulty && (
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
                    )}
                    <span className={item.solved ? "text-green-400" : "text-gray-400"}>
                      {item.solved ? "✓ Solved" : "Unsolved"}
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-3">
                  <a
                    href={`https://leetcode.com/problems/${slug}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-base font-medium text-black transition hover:bg-amber-400"
                  >
                    Solve
                    <ExternalLink size={16} />
                  </a>
                  <AddNoteButton
                    category="question"
                    sourceId={item.question_id}
                    title={item.title}
                    details=""
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-mist-700 bg-mist-800 px-4 py-2 text-sm text-white transition hover:bg-mist-700"
                  />
                  <button
                    type="button"
                    onClick={() => removeBookmark(questionId)}
                    disabled={removingId === questionId}
                    aria-label={`Remove ${item.title} from bookmarks`}
                    className="flex cursor-pointer items-center justify-center rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-red-400 transition hover:border-red-400 hover:bg-red-500/25 hover:text-red-300 disabled:cursor-wait disabled:opacity-50"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
