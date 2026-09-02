const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const privateKey = fs.readFileSync(
  path.resolve(__dirname, "../keys/private.key"),
  "utf-8"
);

exports.loginById = async (req, res) => {
  try {
    const { id, password } = req.body;

    const user = await pool.query(
      `SELECT * FROM users WHERE id = $1`,
      [id]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({
        mess: "No User Available"
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        mess: "Invalid Password"
      });
    }

    const token = jwt.sign(
      { gmail: user.rows[0].gmail },
      privateKey,
      {
        algorithm: "RS256"
      }
    );

    return res.json({ token });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mess: "Internal Server Error"
    });
  }
};


exports.loginByGmail = async (req, res) => {
  try {
    const { gmail, password } = req.body;

    const user = await pool.query(
      `SELECT * FROM users WHERE gmail = $1`,
      [gmail]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({
        mess: "No User Available"
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        mess: "Invalid Password"
      });
    }

    const token = jwt.sign(
      { gmail: user.rows[0].gmail },
      privateKey,
      {
        algorithm: "RS256"
      }
    );

    return res.json({ token });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mess: "Internal Server Error"
    });
  }
};