const pool = require("../config/db");

const getInterviewQuestions = async (req, res, table, idColumn) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT iq.interview_question_id AS question_id,
              iq.question, iq.answer, iq.difficulty
       FROM ${table} AS topic_questions
       JOIN interview_questions AS iq
         ON iq.interview_question_id = topic_questions.interview_question_id
       WHERE topic_questions.${idColumn} = $1
       ORDER BY iq.interview_question_id`,
      [id]
    );

    return res.json(result.rows);
  } catch (error) {
    console.error("Error fetching interview questions:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

exports.getDataStructureInterviewQuestions = (req, res) =>
  getInterviewQuestions(req, res, "ds_interview_questions", "ds_id");

exports.getAlgorithmInterviewQuestions = (req, res) =>
  getInterviewQuestions(req, res, "algo_interview_questions", "algo_id");
