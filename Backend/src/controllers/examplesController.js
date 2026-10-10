const pool = require("../config/db");

const getExamples = async (req, res, table, idColumn) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT example_id, title, example, explanation
       FROM ${table}
       WHERE ${idColumn} = $1
       ORDER BY example_id`,
      [id]
    );

    return res.json(result.rows);
  } catch (error) {
    console.error("Error fetching topic examples:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

exports.getDataStructureExamples = (req, res) =>
  getExamples(req, res, "ds_examples", "ds_id");

exports.getAlgorithmExamples = (req, res) =>
  getExamples(req, res, "algo_examples", "algo_id");
