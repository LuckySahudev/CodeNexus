const pool = require("../config/db")

exports.getQuestion = async (req, res) => {
  console.log(req.params.id)
  const que = await pool.query(
    `SELECT * FROM questions WHERE question_id = ${req.params.id}`
  )
  res.json(que.rows);
}

exports.getDsaQuestions = async (req, res) => {
  console.log(req.params.id)
  const que = await pool.query(
    `SELECT * FROM questions_of_learn_data_structure(${req.params.id}) `
  )
  res.json(que.rows);
}

exports.getAlgoQuestion = async (req, res) => {
  console.log(req.params.id)
  const que = await pool.query(
    `SELECT * FROM questions_of_learn_algorithm(${req.params.id})`
  )
  res.json(que.rows);
}
