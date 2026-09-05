const pool = require("../config/db")

exports.getQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const que = await pool.query(
      "SELECT * FROM questions WHERE question_id = $1",
      [id]
    );
    res.json(que.rows);
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
      `SELECT * FROM questions_of_learn_data_structure($1,$2)`,
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
      `SELECT * FROM questions_of_learn_algorithm($1,$2)`,
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
    const { question_id, action } = req.body;

    if (!question_id || !["create", "delete"].includes(action)) {
      return res.status(400).json({ message: "A question id and valid action are required." });
    }

    if (action === "create") {
      await pool.query(
        `INSERT INTO solved_questions (question_id, user_num_id)
         SELECT $1, $2
         WHERE NOT EXISTS (
           SELECT 1 FROM solved_questions
           WHERE question_id = $1 AND user_num_id = $2
         )`,
        [question_id, req.user.num_id]
      );
      return res.status(201).json({ message: "Question marked as solved." });
    }

    if (action === "delete") {
      await pool.query(
        `DELETE FROM solved_questions WHERE question_id = $1 AND user_num_id = $2`,
        [question_id, req.user.num_id]
      );
      return res.status(200).json({ message: "Question unmarked as solved." });
    }
  } catch (error) {
    console.error("Error managing solved questions:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}
