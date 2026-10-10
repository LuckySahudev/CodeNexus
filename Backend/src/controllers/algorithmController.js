const pool = require("../config/db")


exports.getAlgorithm = async (req, res) => {
  console.log(req.params.id)
  const que = await pool.query(
    `SELECT * FROM algorithms WHERE id = ${req.params.id}`
  )
  res.json(que.rows);
}

exports.getAllAlgorithms = async (req, res) => {
  console.log(req.params.id)
  const que = await pool.query(
    `
    SELECT 
          al.*,
          lal.question_count,
          ad.description AS topic_description,
          ad.things_to_remember
      FROM algorithms AS al
      JOIN (
          SELECT 
              algorithm_id AS al_id,
              COUNT(*) AS question_count
          FROM learn_algorithm_questions
          GROUP BY algorithm_id
      ) AS lal
      ON lal.al_id = al.id
      LEFT JOIN algo_description AS ad ON ad.algo_id = al.id;
    `
  )
  res.json(que.rows);
}
