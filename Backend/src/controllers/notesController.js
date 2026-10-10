const pool = require("../config/db");

const noteKinds = {
  1: { name: "General", table: "general_notes", sourceColumn: null },
  2: { name: "Question", table: "question_notes", sourceColumn: "question_id" },
  3: { name: "Interview", table: "interview_question_notes", sourceColumn: "interview_question_id" },
};

const parseFields = (body) => {
  const typeId = Number(body.type_id);
  const kind = noteKinds[typeId];
  const content = typeof body.content === "string" ? body.content.trim() : "";
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const sourceId = Number(body.source_id);
  if (!kind) return { error: "Choose a valid note category." };
  if (!content) return { error: "Note content is required." };
  if (typeId === 1 && (!title || title.length > 200)) {
    return { error: "Title is required and must be 200 characters or fewer." };
  }
  if (kind.sourceColumn && (!Number.isSafeInteger(sourceId) || sourceId <= 0)) {
    return { error: "A valid source question is required." };
  }
  return { typeId, kind, content, title, sourceId };
};

exports.getNoteTypes = async (_req, res) => res.json(
  Object.entries(noteKinds).map(([type_id, kind]) => ({ type_id: Number(type_id), type_name: kind.name }))
);

exports.getNotes = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT note_id, type_id, type_name, source_id, title, content, created_at, updated_at
       FROM (
         SELECT note_id, 1 AS type_id, 'General' AS type_name, NULL::bigint AS source_id,
                title, content, created_at, updated_at
         FROM general_notes WHERE user_id = $1
         UNION ALL
         SELECT n.note_id, 2, 'Question', n.question_id, q.title, n.content, n.created_at, n.updated_at
         FROM question_notes n JOIN questions q ON q.question_id = n.question_id WHERE n.user_id = $1
         UNION ALL
         SELECT n.note_id, 3, 'Interview', n.interview_question_id, iq.question, n.content, n.created_at, n.updated_at
         FROM interview_question_notes n JOIN interview_questions iq ON iq.interview_question_id = n.interview_question_id WHERE n.user_id = $1
       ) notes
       ORDER BY updated_at DESC NULLS LAST, note_id DESC`,
      [req.user.num_id]
    );
    return res.json(result.rows);
  } catch (error) {
    console.error("Error fetching notes:", error);
    return res.status(500).json({ message: "Could not fetch notes." });
  }
};

exports.createNote = async (req, res) => {
  const fields = parseFields(req.body);
  if (fields.error) return res.status(400).json({ message: fields.error });
  try {
    const { typeId, kind, content, title, sourceId } = fields;
    const query = typeId === 1
      ? pool.query(`INSERT INTO general_notes (user_id, title, content) VALUES ($1, $2, $3) RETURNING note_id, created_at, updated_at`, [req.user.num_id, title, content])
      : pool.query(`INSERT INTO ${kind.table} (user_id, ${kind.sourceColumn}, content) VALUES ($1, $2, $3) RETURNING note_id, created_at, updated_at`, [req.user.num_id, sourceId, content]);
    const result = await query;
    return res.status(201).json({ note_id: result.rows[0].note_id, type_id: typeId, content, title: typeId === 1 ? title : undefined, source_id: typeId === 1 ? null : sourceId, ...result.rows[0] });
  } catch (error) {
    if (error.code === "23503") return res.status(400).json({ message: "The selected source question does not exist." });
    console.error("Error creating note:", error);
    return res.status(500).json({ message: "Could not create note." });
  }
};

exports.updateNote = async (req, res) => {
  const noteId = Number(req.params.noteId);
  const fields = parseFields(req.body);
  if (!Number.isSafeInteger(noteId) || noteId <= 0) return res.status(400).json({ message: "A valid note id is required." });
  if (fields.error) return res.status(400).json({ message: fields.error });
  try {
    const { typeId, kind, content, title } = fields;
    const result = typeId === 1
      ? await pool.query(`UPDATE general_notes SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP WHERE note_id = $3 AND user_id = $4 RETURNING note_id`, [title, content, noteId, req.user.num_id])
      : await pool.query(`UPDATE ${kind.table} SET content = $1, updated_at = CURRENT_TIMESTAMP WHERE note_id = $2 AND user_id = $3 RETURNING note_id`, [content, noteId, req.user.num_id]);
    if (!result.rowCount) return res.status(404).json({ message: "Note not found." });
    return res.json({ note_id: noteId, type_id: typeId, title, content });
  } catch (error) {
    console.error("Error updating note:", error);
    return res.status(500).json({ message: "Could not update note." });
  }
};

exports.deleteNote = async (req, res) => {
  const noteId = Number(req.params.noteId);
  const kind = noteKinds[Number(req.query.type_id)];
  if (!Number.isSafeInteger(noteId) || noteId <= 0 || !kind) return res.status(400).json({ message: "A valid note id and category are required." });
  try {
    const result = await pool.query(`DELETE FROM ${kind.table} WHERE note_id = $1 AND user_id = $2`, [noteId, req.user.num_id]);
    if (!result.rowCount) return res.status(404).json({ message: "Note not found." });
    return res.status(204).end();
  } catch (error) {
    console.error("Error deleting note:", error);
    return res.status(500).json({ message: "Could not delete note." });
  }
};
