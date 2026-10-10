const pool = require("../config/db");

exports.getProgress = async (req, res) => {
  try {
    const userNumId = req.user.num_id;

    const [difficultyResult, recentActivityResult, dataStructureResult, algorithmResult, summaryResult] =
      await Promise.all([
        pool.query(
          `SELECT
             d.name,
             COALESCE(
               ROUND(100.0 * COUNT(DISTINCT sq.question_id) /
                 NULLIF(COUNT(DISTINCT q.question_id), 0)),
               0
             )::int AS progress
           FROM difficulties d
           LEFT JOIN questions q ON q.difficulty::text = d.name
           LEFT JOIN solved_questions sq
             ON sq.question_id = q.question_id AND sq.user_num_id = $1
           GROUP BY d.id, d.name
           ORDER BY d.id`,
          [userNumId]
        ),
        pool.query(
          `SELECT q.question_id, q.title, sq.solved_at, 'Solved' AS status
           FROM solved_questions sq
           JOIN questions q ON q.question_id = sq.question_id
           WHERE sq.user_num_id = $1
           ORDER BY sq.solved_at DESC NULLS LAST, q.question_id DESC
           LIMIT 5`,
          [userNumId]
        ),
        pool.query(
          `SELECT
             ds.id,
             ds.name,
             COALESCE(
               ROUND(100.0 * COUNT(DISTINCT sq.question_id) /
                 NULLIF(COUNT(DISTINCT qdt.question_id), 0)),
               0
             )::int AS progress
           FROM data_structures ds
           LEFT JOIN question_ds_type qdt
             ON qdt.ds_type = ds.id
           LEFT JOIN solved_questions sq
             ON sq.question_id = qdt.question_id AND sq.user_num_id = $1
           GROUP BY ds.id, ds.name
           ORDER BY ds.id`,
          [userNumId]
        ),
        pool.query(
          `SELECT
             a.id,
             a.name,
             COALESCE(
               ROUND(100.0 * COUNT(DISTINCT sq.question_id) /
                 NULLIF(COUNT(DISTINCT qat.question_id), 0)),
               0
             )::int AS progress
           FROM algorithms a
           LEFT JOIN question_algo_type qat
             ON qat.algo_type = a.id
           LEFT JOIN solved_questions sq
             ON sq.question_id = qat.question_id AND sq.user_num_id = $1
           GROUP BY a.id, a.name
           ORDER BY a.id`,
          [userNumId]
        ),
        pool.query(
          `SELECT
             (SELECT COUNT(*)::int FROM questions) AS total_questions,
             (SELECT COUNT(DISTINCT sq.question_id)::int
              FROM solved_questions sq
              JOIN questions q ON q.question_id = sq.question_id
              WHERE sq.user_num_id = $1) AS solved_questions`,
          [userNumId]
        ),
      ]);

    const totalQuestions = summaryResult.rows[0].total_questions;
    const solvedQuestions = summaryResult.rows[0].solved_questions;

    const toNamedProgress = (rows) =>
      rows.map(({ name, progress }) => ({ name, progress }));

    res.json({
      summary: {
        solvedQuestions,
        totalQuestions,
        remainingQuestions: Math.max(totalQuestions - solvedQuestions, 0),
        completion: totalQuestions
          ? Math.round((solvedQuestions / totalQuestions) * 100)
          : 0,
      },
      difficultyBreakdown: toNamedProgress(difficultyResult.rows),
      recentActivity: recentActivityResult.rows.map(({ title, status, solved_at }) => ({
        title,
        status,
        solvedAt: solved_at,
      })),
      dataStructures: toNamedProgress(dataStructureResult.rows),
      algorithms: toNamedProgress(algorithmResult.rows),
    });
  } catch (error) {
    console.error("Error fetching progress:", error);
    res.status(500).json({ message: "Could not fetch progress." });
  }
};
