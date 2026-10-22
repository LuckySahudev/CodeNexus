const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const { publicKey } = require("../config/jwtKeys");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      mess: authHeader ? "Invalid authorization header" : "Token missing"
    });
  }

  let decoded;
  try {
    decoded = jwt.verify(
      authHeader.slice("Bearer ".length),
      publicKey,
      { algorithms: ["RS256"] }
    );
  } catch (error) {
    return res.status(401).json({
      mess: "Invalid token"
    });
  }

  try {
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

    // Record one row per authenticated user per day. Repeated requests today
    // are ignored because (user_num_id, practice_date) is the primary key.
    await pool.query(
      `INSERT INTO users_daily_logs (user_num_id)
       VALUES ($1)
       ON CONFLICT (user_num_id, practice_date) DO NOTHING`,
      [req.user.num_id]
    );

    next();

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      mess: "Could not authenticate request"
    });
  }
};

module.exports = auth;
