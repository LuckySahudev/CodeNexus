const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const privateKey = fs.readFileSync(
  path.resolve(__dirname, "../keys/private.key"),
  "utf-8"
);

exports.signup = async (req, res) => {
  try {
    const { username, gmail, password } = req.body;

    if (!username || !gmail || !password) {
      return res.status(400).json({ error: "Username, gmail, and password are required" });
    }

    // Check gmail
    let user = await pool.query(
      `SELECT gmail FROM users WHERE gmail = $1`,
      [gmail]
    );

    if (user.rows.length > 0) {
      return res.status(409).json({ mess: "gmail already exists." });
    }

    // Check ID
    user = await pool.query(
      `SELECT id FROM users WHERE id = $1`,
      [username]
    );

    if (user.rows.length > 0) {
      return res.status(409).json({ mess: "UserId already exists." });
    }

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    // Insert user
    user = await pool.query(
      `INSERT INTO users (id, gmail, password)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [username, gmail, hash]
    );

    // Create JWT
    const token = jwt.sign(
      { gmail: gmail },
      privateKey,
      { algorithm: "RS256" }
    );

    return res.status(201).json({ token, username: user.rows[0].id });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};