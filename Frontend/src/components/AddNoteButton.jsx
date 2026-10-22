import { useState } from "react";
import api from "../api";
import { Check, LoaderCircle, NotebookPen, X } from "lucide-react";

export default function AddNoteButton({
  category,
  title,
  details,
  sourceId,
  className = "",
  label = "Add Notes",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadingTypes, setIsLoadingTypes] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [noteType, setNoteType] = useState(null);
  const [noteTitle, setNoteTitle] = useState(title || "");
  const [content, setContent] = useState(details || "");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const openEditor = async () => {
    setIsOpen(true);
    setIsLoadingTypes(true);
    setNoteType(null);
    setError("");
    setSaved(false);
    setNoteTitle(title || "");
    setContent(details || "");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Sign in to save a note.");
      setIsLoadingTypes(false);
      return;
    }

    try {
      const { data } = await api.get("/notes/types", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const matchingType = data.find((type) =>
        type.type_name.toLowerCase().includes(category.toLowerCase())
      );
      if (!matchingType) {
        setError(`The ${category} note category is not available.`);
      } else {
        setNoteType(matchingType);
      }
    } catch (requestError) {
      console.error("Failed to load note categories:", requestError);
      setError(requestError.response?.data?.message || "Could not prepare a note.");
    } finally {
      setIsLoadingTypes(false);
    }
  };

  const saveNote = async (event) => {
    event.preventDefault();
    if (!noteType || !content.trim()) {
      setError("Enter some notes before saving.");
      return;
    }

    setIsSaving(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/notes",
        {
          type_id: noteType.type_id,
          title: noteTitle.trim(),
          source_id: sourceId,
          content: content.trim(),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSaved(true);
    } catch (requestError) {
      console.error("Failed to save note:", requestError);
      setError(requestError.response?.data?.message || "Could not save your note.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <button type="button" onClick={openEditor} className={className}>
        <NotebookPen size={16} aria-hidden="true" />
        {label}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-zinc-950/70 px-4 py-8 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !isSaving) setIsOpen(false);
          }}
        >
          <div className="w-full max-w-md rounded-2xl border border-mist-700 bg-zinc-950 p-6 shadow-2xl">
            {saved ? (
              <div className="py-4 text-center">
                <Check size={34} className="mx-auto mb-3 text-green-400" aria-hidden="true" />
                <h2 className="text-lg font-semibold text-white">Note saved</h2>
                <p className="mt-2 text-sm text-gray-400">You can find it in {noteType.type_name}.</p>
                <button type="button" onClick={() => setIsOpen(false)} className="mt-5 rounded-lg bg-amber-500 px-5 py-2 text-sm font-semibold text-black transition hover:bg-amber-400">Done</button>
              </div>
            ) : (
              <form onSubmit={saveNote}>
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-white">Add note</h2>
                    <p className="mt-1 text-xs text-gray-400">Saved to {noteType?.type_name || `${category} notes`}.</p>
                  </div>
                  <button type="button" onClick={() => setIsOpen(false)} disabled={isSaving} aria-label="Close note editor" className="rounded-lg p-2 text-gray-400 transition hover:bg-mist-800 hover:text-white disabled:opacity-50">
                    <X size={18} aria-hidden="true" />
                  </button>
                </div>

                {error && <p className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300" role="alert">{error}</p>}

                <div className="space-y-4">
                  {category.toLowerCase() !== "general" && title && (
                    <div className="rounded-lg border border-mist-700 bg-mist-900 px-3 py-3">
                      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                        Selected {category.toLowerCase() === "interview" ? "interview question" : "question"}
                      </p>
                      <p className="text-sm leading-6 text-gray-200">{title}</p>
                    </div>
                  )}
                  {category.toLowerCase() === "general" && <div>
                    <label htmlFor="source-note-title" className="mb-2 block text-sm font-medium text-gray-300">Title</label>
                    <input id="source-note-title" value={noteTitle} maxLength={200} onChange={(event) => setNoteTitle(event.target.value)} disabled={isLoadingTypes || isSaving} required className="w-full rounded-lg border border-mist-700 bg-mist-900 px-3 py-3 text-sm text-gray-100 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 disabled:opacity-60" />
                  </div>}
                  <div>
                    <label htmlFor="source-note-content" className="mb-2 block text-sm font-medium text-gray-300">Your notes</label>
                    <textarea id="source-note-content" value={content} onChange={(event) => setContent(event.target.value)} disabled={isLoadingTypes || isSaving} rows={5} required className="w-full resize-y rounded-lg border border-mist-700 bg-mist-900 px-3 py-3 text-sm leading-6 text-gray-100 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 disabled:opacity-60" />
                  </div>
                </div>

                <button type="submit" disabled={isLoadingTypes || isSaving || !noteType} className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-3 text-sm font-semibold text-black transition hover:bg-amber-400 disabled:cursor-wait disabled:opacity-60">
                  {(isLoadingTypes || isSaving) && <LoaderCircle size={17} className="animate-spin" aria-hidden="true" />}
                  {isLoadingTypes ? "Loading..." : isSaving ? "Saving..." : "Save note"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
