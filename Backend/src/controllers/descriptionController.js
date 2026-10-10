const pool = require("../config/db");

const getDescription = async (req, res, table, idColumn) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT ${idColumn}, description, things_to_remember
       FROM ${table}
       WHERE ${idColumn} = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Description not found." });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching topic description:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

exports.getDataStructureDescription = (req, res) =>
  getDescription(req, res, "ds_description", "ds_id");

exports.getAlgorithmDescription = (req, res) =>
  getDescription(req, res, "algo_description", "algo_id");
