const pool = require("../config/db")


exports.getDataStructure = async (req, res) => {
  console.log(req.params.id)
  const que = await pool.query(
    `SELECT * FROM data_structures WHERE id = ${req.params.id}`
  )
  res.json(que.rows);
}

exports.getAllDataStructures = async (req, res) => {
  const que = await pool.query(
    ` 
      SELECT 
          ds.*,
          lds.question_count
      FROM data_structures AS ds
      JOIN (
          SELECT 
              data_structure_id AS ds_id,
              COUNT(*) AS question_count
          FROM learn_data_structure_questions
          GROUP BY data_structure_id
      ) AS lds
      ON lds.ds_id = ds.id;
    `
  )
  res.json(que.rows);
}
