const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const pool = require("../config/db");

const publicKey = fs.readFileSync(
  path.resolve(__dirname, "../keys/public.key"),
  "utf-8"
);

const auth = async (req, res, next) => {
  try {
    const token = req.body.token;

    const decoded = jwt.verify(
      token,
      publicKey,
      { algorithms: ["RS256"] }
    );

    const email = decoded.gmail;

    const user = await pool.query(
      `SELECT * FROM users WHERE gmail = $1`,
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({
        mess: "User not found"
      });
    }

    req.user = user.rows[0];

    next();

  } catch (error) {
    console.error(error);

    return res.status(401).json({
      mess: "Invalid token"
    });
  }
};

module.exports = auth;