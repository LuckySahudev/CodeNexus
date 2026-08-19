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
    `SELECT * FROM algorithms`
  )
  res.json(que.rows);
}