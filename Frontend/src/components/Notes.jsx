import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Outlet, useLocation, useOutletContext } from "react-router-dom";
import {
  NotebookPen,
  FileQuestion,
  BriefcaseBusiness,
  Plus,
  CalendarDays,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

const noteSections = [
  { to: "general", label: "General Notes", Icon: NotebookPen },
  { to: "questions", label: "Question Notes", Icon: FileQuestion },
  { to: "interview", label: "Interview Notes", Icon: BriefcaseBusiness },
];

const getSectionForType = (name = "") => {
  const value = name.toLowerCase();
  if (value.includes("general")) return "general";
  if (value.includes("question")) return "questions";
  if (value.includes("interview")) return "interview";
  return value.trim().replace(/\s+/g, "-");
};

const getErrorMessage = (error, fallback) =>
  error.response?.data?.message || fallback;

const formatDate = (value) => {
  if (!value) return "Recently updated";
  return new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

export default function Notes() {
  const location = useLocation();
  const section = location.pathname.split("/").filter(Boolean).at(-1) || "general";
  const [notes, setNotes] = useState([]);
  const [noteTypes, setNoteTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [form, setForm] = useState({ type_id: "", source_id: "", title: "", content: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const loadNotes = useCallback(async () => {
    setIsLoading(true);
    setError("");
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Sign in to view and manage your notes.");
      setIsLoading(false);
      return;
    }

    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [notesResponse, typesResponse] = await Promise.all([
        axios.get("http://localhost:8080/notes", { headers }),
        axios.get("http://localhost:8080/notes/types", { headers }),
      ]);
      setNotes(notesResponse.data);
      setNoteTypes(typesResponse.data);
    } catch (requestError) {
      console.error("Failed to load notes:", requestError);
      setError(getErrorMessage(requestError, "Could not load your notes."));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const activeType = noteTypes.find(
    (type) => getSectionForType(type.type_name) === section
  );

  const openCreateEditor = () => {
    setEditingNote(null);
    setForm({
      type_id: activeType ? String(activeType.type_id) : "",
      source_id: "",
      title: "",
      content: "",
    });
    setError("");
    setEditorOpen(true);
  };

  const openEditEditor = (note) => {
    setEditingNote(note);
    setForm({
      type_id: String(note.type_id),
      source_id: note.source_id ? String(note.source_id) : "",
      title: note.title,
      content: note.content,
    });
    setError("");
    setEditorOpen(true);
  };

  const saveNote = async (event) => {
    event.preventDefault();
    if (!form.type_id) {
      setError("This note category is unavailable. Please refresh and try again.");
      return;
    }
    if ((Number(form.type_id) === 1 && !form.title.trim()) || !form.content.trim()) {
      setError("Enter a title for general notes and note content before saving.");
      return;
    }

    setIsSaving(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const payload = {
        ...form,
        type_id: Number(form.type_id),
        source_id: form.source_id ? Number(form.source_id) : null,
        title: form.title.trim(),
        content: form.content.trim(),
      };

      if (editingNote) {
        await axios.put(
          `http://localhost:8080/notes/${editingNote.note_id}`,
          payload,
          config
        );
      } else {
        await axios.post("http://localhost:8080/notes", payload, config);
      }

      setEditorOpen(false);
      setEditingNote(null);
      await loadNotes();
    } catch (requestError) {
      console.error("Failed to save note:", requestError);
      setError(getErrorMessage(requestError, "Could not save your note."));
    } finally {
      setIsSaving(false);
    }
  };

  const deleteNote = async (note) => {
    if (!window.confirm(`Delete “${note.title}”? This cannot be undone.`)) return;

    setDeletingId(note.note_id);
    setError("");
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/notes/${note.note_id}?type_id=${note.type_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes((current) => current.filter((item) => item.note_id !== note.note_id));
    } catch (requestError) {
      console.error("Failed to delete note:", requestError);
      setError(getErrorMessage(requestError, "Could not delete your note."));
    } finally {
      setDeletingId(null);
    }
  };

  const context = { notes, noteTypes, isLoading, error, openEditEditor, deleteNote, deletingId };

  return (
    <div className="relative flex h-full flex-col rounded-2xl border border-mist-700 bg-mist-950 p-6 text-white">
      <div className="w-full">
        <div className="mb-6">
          <h1 className="text-4xl font-bold">My Notes</h1>
        </div>

        <nav aria-label="Note categories" className="mb-6 flex flex-wrap gap-3 rounded-xl border border-mist-700 bg-mist-900 px-5 py-3">
          {noteSections.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg border border-mist-700 px-5 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                  isActive
                    ? "bg-amber-500 font-semibold text-black"
                    : "text-gray-300 hover:bg-mist-800 hover:text-white"
                }`
              }
            >
              <Icon size={18} aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex min-h-0 w-full flex-1">
        <Outlet context={context} />
      </div>

      {error && notes.length > 0 && !editorOpen && (
        <p className="absolute bottom-4 left-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300" role="alert">
          {error}
        </p>
      )}

      {section === "general" && <button
        type="button"
        onClick={openCreateEditor}
        className="absolute bottom-8 right-8 flex cursor-pointer items-center gap-2 rounded-full bg-amber-500 px-4 py-3 text-sm font-semibold text-black transition hover:bg-amber-400"
      >
        <Plus size={18} aria-hidden="true" />
        <span>Add Note</span>
      </button>}

      {editorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-zinc-950/70 px-4 py-8 backdrop-blur-sm" onMouseDown={(event) => {
          if (event.target === event.currentTarget && !isSaving) setEditorOpen(false);
        }}>
          <form onSubmit={saveNote} style={{ width: "40vw", minWidth: "min(360px, calc(100vw - 2rem))", maxWidth: "calc(100vw - 2rem)" }} className="mx-auto w-full rounded-2xl border border-mist-700 bg-zinc-950 p-6 shadow-2xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">{editingNote ? "Edit note" : "Add a note"}</h2>
                <p className="mt-1 text-sm text-gray-400">Keep an idea or solution handy for later.</p>
              </div>
              <button type="button" onClick={() => setEditorOpen(false)} disabled={isSaving} aria-label="Close note editor" className="rounded-lg p-2 text-gray-400 transition hover:bg-mist-800 hover:text-white disabled:opacity-50">
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            {error && <p className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300" role="alert">{error}</p>}

            <div className="space-y-4">
              <div>
                <label htmlFor="note-title" className="mb-2 block text-sm font-medium text-gray-300">Title</label>
                <input id="note-title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} maxLength={200} required={Number(form.type_id) === 1} disabled={isSaving || Number(form.type_id) !== 1} placeholder="Give your note a title" className="w-full rounded-lg border border-mist-700 bg-mist-900 px-3 py-3 text-sm text-gray-100 outline-none placeholder:text-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 disabled:opacity-60" />
              </div>

              <div>
                <label htmlFor="note-content" className="mb-2 block text-sm font-medium text-gray-300">Note</label>
                <textarea id="note-content" value={form.content} onChange={(event) => setForm({ ...form, content: event.target.value })} required disabled={isSaving} rows={6} placeholder="Write your note here..." className="w-full resize-y rounded-lg border border-mist-700 bg-mist-900 px-3 py-3 text-sm leading-6 text-gray-100 outline-none placeholder:text-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 disabled:opacity-60" />
              </div>
            </div>

            <button type="submit" disabled={isSaving || noteTypes.length === 0} className="mt-5 flex w-full items-center justify-center rounded-lg bg-amber-500 px-4 py-3 text-sm font-semibold text-black transition hover:bg-amber-400 disabled:cursor-wait disabled:opacity-60">
              {isSaving ? "Saving..." : editingNote ? "Save changes" : "Save note"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export function NotesSection({ section }) {
  const { notes, isLoading, error, openEditEditor, deleteNote, deletingId } = useOutletContext();
  const sectionNotes = notes.filter((note) => getSectionForType(note.type_name) === section);

  if (isLoading) {
    return <div className="flex flex-1 items-center justify-center text-sm text-gray-400">Loading notes...</div>;
  }

  if (error && notes.length === 0) {
    return <div className="flex flex-1 items-center justify-center text-center text-sm text-red-300" role="alert">{error}</div>;
  }

  if (sectionNotes.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center py-16 text-center">
        <NotebookPen size={56} className="mb-5 text-amber-500 opacity-70" aria-hidden="true" />
        <h2 className="text-xl font-semibold">No {section === "questions" ? "question" : section} notes yet</h2>
        <p className="mt-2 text-sm text-gray-400">Use Add Note to create your first note in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid w-full flex-1 auto-rows-max content-start gap-5 overflow-y-auto pb-20 scrollbar-hide md:grid-cols-2 xl:grid-cols-3">
      {sectionNotes.map((note) => (
        <article key={note.note_id} className="rounded-xl border border-mist-700 bg-mist-900 p-5 transition-colors hover:border-amber-500/60">
          <div className="mb-4 flex items-start justify-between gap-3">
            <h2 className="text-lg font-semibold">{note.title}</h2>
            <span className="shrink-0 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400">{note.type_name}</span>
          </div>

          <p className="mb-6 whitespace-pre-wrap break-words text-sm leading-6 text-gray-400">{note.content}</p>

          <div className="flex items-center justify-between gap-3 border-t border-mist-800 pt-3">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <CalendarDays size={15} aria-hidden="true" />
              <span>{formatDate(note.updated_at || note.created_at)}</span>
            </div>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => openEditEditor(note)} aria-label={`Edit ${note.title}`} className="rounded-lg p-2 text-gray-400 transition hover:bg-mist-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500">
                <Pencil size={16} aria-hidden="true" />
              </button>
              <button type="button" onClick={() => deleteNote(note)} disabled={deletingId === note.note_id} aria-label={`Delete ${note.title}`} className="rounded-lg p-2 text-gray-400 transition hover:bg-red-500/10 hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 disabled:cursor-wait disabled:opacity-50">
                <Trash2 size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
