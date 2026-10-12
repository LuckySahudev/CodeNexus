const pool = require("../config/db")

const withSolvedState = async (rows, userNumId, learnTable = null) => {
  if (!rows.length) return rows;

  const normalizedRows = rows.map((row) => ({
    ...row,
    question_id: row.question_id ?? row.id,
  }));
  const questionIds = normalizedRows.map((row) => row.question_id);
  const learnSolvedQuery = learnTable
    ? `SELECT question_id FROM ${learnTable} WHERE user_num_id = $1 AND question_id = ANY($2::int[])`
    : `SELECT question_id FROM learn_ds_solved_questions
       WHERE user_num_id = $1 AND question_id = ANY($2::int[])
       UNION
       SELECT question_id FROM learn_algo_solved_questions
       WHERE user_num_id = $1 AND question_id = ANY($2::int[])`;
  const [solvedResult, learnSolvedResult] = await Promise.all([
    pool.query(
    `SELECT question_id
     FROM solved_questions
     WHERE user_num_id = $1 AND question_id = ANY($2::int[])`,
    [userNumId, questionIds]
    ),
    pool.query(learnSolvedQuery, [userNumId, questionIds]),
  ]);
  const solvedIds = new Set(solvedResult.rows.map((row) => Number(row.question_id)));
  const learnSolvedIds = new Set(learnSolvedResult.rows.map((row) => Number(row.question_id)));

  return normalizedRows.map((row) => ({
    ...row,
    solved: solvedIds.has(Number(row.question_id)),
    learn_solved: learnSolvedIds.has(Number(row.question_id)),
  }));
};

exports.getQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const que = await pool.query(
      "SELECT * FROM questions WHERE question_id = $1",
      [id]
    );
    res.json(await withSolvedState(que.rows, req.user.num_id));
  } catch (error) {
    console.error("Error fetching question:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

exports.getDsaQuestions = async (req, res) => {
  const ds_id = req.query.ds_id;
  try
  {
    if (!ds_id) {
      return res.status(400).json({ message: "Data structure id is required." });
    }

    const que = await pool.query(
      `WITH questions AS (
         SELECT DISTINCT ON (question_id) *
         FROM questions_of_learn_data_structure($1, $2)
         ORDER BY question_id
       )
       SELECT q.*,
              (sq.question_id IS NOT NULL) AS solved,
              (learn_sq.question_id IS NOT NULL) AS learn_solved
       FROM questions q
       LEFT JOIN (
         SELECT DISTINCT question_id
         FROM solved_questions
         WHERE user_num_id = $2
       ) sq ON sq.question_id = q.question_id
       LEFT JOIN learn_ds_solved_questions learn_sq
         ON learn_sq.user_num_id = $2
        AND learn_sq.question_id = q.question_id`,
      [ds_id, req.user.num_id]
    );
    res.json(que.rows);
  } 
  catch (error) {
    console.error("Error fetching data structure questions:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

exports.getAlgoQuestion = async (req, res) => {
  const algo_id = req.query.algo_id;

  try
  {
    if (!algo_id) {
      return res.status(400).json({ message: "Algorithm id is required." });
    }

    const que = await pool.query(
      `WITH questions AS (
         SELECT DISTINCT ON (question_id) *
         FROM questions_of_learn_algorithm($1, $2)
         ORDER BY question_id
       )
       SELECT q.*,
              (sq.question_id IS NOT NULL) AS solved,
              (learn_sq.question_id IS NOT NULL) AS learn_solved
       FROM questions q
       LEFT JOIN (
         SELECT DISTINCT question_id
         FROM solved_questions
         WHERE user_num_id = $2
       ) sq ON sq.question_id = q.question_id
       LEFT JOIN learn_algo_solved_questions learn_sq
         ON learn_sq.user_num_id = $2
        AND learn_sq.question_id = q.question_id`,
      [algo_id, req.user.num_id]
    );
    res.json(que.rows);
  } 
  catch (error) {
    console.error("Error fetching algorithm questions:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

exports.manageSolveQuestions = async (req, res) => {
  try {
    const { question_id, action, mode } = req.body;
    const questionId = Number(question_id);
    const learnTableByMode = {
      data: "learn_ds_solved_questions",
      algorithm: "learn_algo_solved_questions",
    };
    const learnTable = learnTableByMode[mode];

    if (!Number.isInteger(questionId) || questionId <= 0 || !["create", "delete"].includes(action) || !learnTable) {
      return res.status(400).json({ message: "A question id, learning mode, and valid action are required." });
    }

    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      if (action === "create") {
        await client.query(
          `INSERT INTO ${learnTable} (user_num_id, question_id)
           VALUES ($1, $2)
           ON CONFLICT (user_num_id, question_id) DO NOTHING`,
          [req.user.num_id, questionId]
        );
        await client.query("COMMIT");
        return res.status(200).json({ learn_solved: true, question_id: questionId });
      }

      await client.query(
        `DELETE FROM ${learnTable} WHERE question_id = $1 AND user_num_id = $2`,
        [questionId, req.user.num_id]
      );
      await client.query("COMMIT");
      return res.status(200).json({ learn_solved: false, question_id: questionId });
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error managing solved questions:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}


