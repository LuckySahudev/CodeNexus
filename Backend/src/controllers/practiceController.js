const pool = require("../config/db")

exports.getUserPracticePreferences = async (req, res) => {
  try {
    const preferences = await pool.query(
      "SELECT get_user_practice_preferences($1) AS preferences",
      [req.user.num_id]
    );
    res.json(preferences.rows[0].preferences);
  } catch (error) {
    console.error("Error fetching practice preferences:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.saveUserPracticePreferences = async (req, res) => {
  const { difficulties, data_structures, algorithms } = req.body;
  const selections = [difficulties, data_structures, algorithms];

  if (selections.some((items) =>
    !Array.isArray(items) || items.some((item) => typeof item !== "string")
  )) {
    return res.status(400).json({
      message: "Difficulties, data structures, and algorithms must be arrays of names.",
    });
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const preferenceTables = [
      ["user_difficulty_preferences", "difficulty_id", "difficulties", difficulties],
      ["user_data_structure_preferences", "data_structure_id", "data_structures", data_structures],
      ["user_algorithm_preferences", "algorithm_id", "algorithms", algorithms],
    ];

    for (const [preferenceTable, foreignKey, catalogTable, names] of preferenceTables) {
      await client.query(`DELETE FROM ${preferenceTable} WHERE user_num_id = $1`, [req.user.num_id]);
      if (names.length === 0) continue;

      const inserted = await client.query(
        `INSERT INTO ${preferenceTable} (user_num_id, ${foreignKey})
         SELECT $1, id FROM ${catalogTable} WHERE name = ANY($2::text[])
         ON CONFLICT DO NOTHING`,
        [req.user.num_id, [...new Set(names)]]
      );
      if (inserted.rowCount !== new Set(names).size) {
        throw new Error(`One or more selected ${catalogTable} preferences do not exist.`);
      }
    }

    await client.query("COMMIT");
    res.json({ message: "Practice preferences saved." });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error saving practice preferences:", error);
    res.status(500).json({ message: "Could not save practice preferences." });
  } finally {
    client.release();
  }
};


exports.savePreferences = async (req, res) => {
    try {
        const { dataStructures, algorithms, difficulties } = req.body;
        const userId = req.user.id;

        const dsIds = dataStructures
            .map((selected, index) => selected ? index + 1 : null)
            .filter(id => id !== null);

        const algorithmIds = algorithms
            .map((selected, index) => selected ? index + 1 : null)
            .filter(id => id !== null);

        const difficultyIds = difficulties
            .map((selected, index) => selected ? index + 1 : null)
            .filter(id => id !== null);

        if (dsIds.length > 0) {
            await pool.query(
                `INSERT INTO user_data_structure_preferences
                (user_id, data_structure_id)
                SELECT $1, unnest($2::int[])`,
                [userId, dsIds]
            );
        }

        if (algorithmIds.length > 0) {
            await pool.query(
                `INSERT INTO user_algorithm_preferences
                (user_id, algorithm_id)
                SELECT $1, unnest($2::int[])`,
                [userId, algorithmIds]
            );
        }

        if (difficultyIds.length > 0) {
            await pool.query(
                `INSERT INTO user_difficulty_preferences
                (user_id, difficulty_id)
                SELECT $1, unnest($2::int[])`,
                [userId, difficultyIds]
            );
        }

        res.status(200).json({
            success: true,
            message: "Preferences saved successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to save preferences"
        });
    }
};
