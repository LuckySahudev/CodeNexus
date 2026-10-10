const pool = require("../config/db");

exports.getBookmarks = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT q.*, b.created_at AS bookmarked_at,
              EXISTS (
                SELECT 1
                FROM solved_questions sq
                WHERE sq.question_id = q.question_id
                  AND sq.user_num_id = $1
              ) AS solved
       FROM bookmark b
       JOIN questions q ON q.question_id = b.question_id
       WHERE b.user_id = $1
       ORDER BY b.created_at DESC, q.question_id DESC`,
      [req.user.num_id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    res.status(500).json({ message: "Could not fetch bookmarks." });
  }
};

exports.addBookmark = async (req, res) => {
  const questionId = Number(req.body.question_id);
  if (!Number.isSafeInteger(questionId) || questionId <= 0) {
    return res.status(400).json({ message: "A valid question id is required." });
  }

  try {
    const result = await pool.query(
      `INSERT INTO bookmark (user_id, question_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id, question_id) DO NOTHING
       RETURNING question_id`,
      [req.user.num_id, questionId]
    );

    if (result.rowCount === 0) {
      return res.status(200).json({ message: "Question is already bookmarked." });
    }

    return res.status(201).json({ message: "Question bookmarked." });
  } catch (error) {
    if (error.code === "23503") {
      return res.status(404).json({ message: "Question not found." });
    }

    console.error("Error adding bookmark:", error);
    return res.status(500).json({ message: "Could not add bookmark." });
  }
};

exports.removeBookmark = async (req, res) => {
  const questionId = Number(req.params.questionId);
  if (!Number.isSafeInteger(questionId) || questionId <= 0) {
    return res.status(400).json({ message: "A valid question id is required." });
  }

  try {
    await pool.query(
      "DELETE FROM bookmark WHERE user_id = $1 AND question_id = $2",
      [req.user.num_id, questionId]
    );

    return res.status(200).json({ message: "Bookmark removed." });
  } catch (error) {
    console.error("Error removing bookmark:", error);
    return res.status(500).json({ message: "Could not remove bookmark." });
  }
};
