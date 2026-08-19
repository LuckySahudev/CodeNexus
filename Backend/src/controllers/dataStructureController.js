const pool = require("../config/db")


exports.getDataStructure = async (req, res) => {
  console.log(req.params.id)
  const que = await pool.query(
    `SELECT * FROM data_structures WHERE id = ${req.params.id}`
  )
  res.json(que.rows);
}

exports.getAllDataStructures = async (req, res) => {
  console.log(req.params.id)
  const que = await pool.query(
    `SELECT * FROM data_structures `
  )
  res.json(que.rows);
}
