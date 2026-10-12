const pool = require("../config/db");

exports.getDashboard = async (req, res) => {
  try {
    const userNumId = req.user.num_id;

    const [streakResult, summaryResult, lastPracticeResult, todayResult, weeklyResult] = await Promise.all([
      pool.query(
        `WITH activity AS (
           SELECT activity_date
           FROM user_daily_activity
           WHERE user_id = $1
         ), numbered AS (
           SELECT activity_date,
                  activity_date - ROW_NUMBER() OVER (ORDER BY activity_date)::int AS streak_group
           FROM activity
         ), longest AS (
           SELECT COALESCE(MAX(day_count), 0)::int AS longest_streak
           FROM (
             SELECT COUNT(*) AS day_count
             FROM numbered
             GROUP BY streak_group
           ) streaks
         ), latest AS (
           SELECT MAX(activity_date) AS latest_date FROM activity
         ), current_streak AS (
           SELECT CASE
             WHEN latest_date = CURRENT_DATE OR latest_date = CURRENT_DATE - 1
             THEN (
               SELECT COUNT(*)::int
               FROM numbered
               WHERE streak_group = (
                 SELECT streak_group FROM numbered WHERE activity_date = latest_date
               )
             )
             ELSE 0
           END AS current_streak
           FROM latest
         )
         SELECT
           COALESCE((SELECT current_streak FROM current_streak), 0)::int AS current_streak,
           (SELECT longest_streak FROM longest) AS longest_streak,
           EXISTS (SELECT 1 FROM activity WHERE activity_date = CURRENT_DATE) AS active_today,
           COALESCE((SELECT COUNT(*)::int FROM activity), 0) AS active_days,
           COALESCE((
             SELECT json_agg(activity_date ORDER BY activity_date)
             FROM activity
             WHERE activity_date >= CURRENT_DATE - 364
           ), '[]'::json) AS activity_dates`,
        [userNumId]
      ),
      pool.query(
        `WITH solved AS (
           SELECT COUNT(DISTINCT sq.question_id)::int AS solved_questions
           FROM solved_questions sq
           JOIN questions q ON q.question_id = sq.question_id
           WHERE sq.user_num_id = $1
         )
         SELECT solved.solved_questions,
                (SELECT COUNT(*)::int FROM questions) AS total_questions
         FROM solved`,
        [userNumId]
      ),
      pool.query(
        `SELECT q.question_id, q.title, sq.solved_at
         FROM solved_questions sq
         JOIN questions q ON q.question_id = sq.question_id
         WHERE sq.user_num_id = $1
         ORDER BY sq.solved_at DESC NULLS LAST, q.question_id DESC
         LIMIT 1`,
        [userNumId]
      ),
      pool.query(
        `SELECT COUNT(DISTINCT question_id)::int AS completed
         FROM solved_questions
         WHERE user_num_id = $1 AND solved_at::date = CURRENT_DATE`,
        [userNumId]
      ),
      pool.query(
        `SELECT days.activity_date::date::text AS date,
                COUNT(DISTINCT sq.question_id)::int AS solved
         FROM generate_series(CURRENT_DATE - 6, CURRENT_DATE, INTERVAL '1 day')
              AS days(activity_date)
         LEFT JOIN solved_questions sq
           ON sq.user_num_id = $1
          AND sq.solved_at::date = days.activity_date::date
         GROUP BY days.activity_date
         ORDER BY days.activity_date`,
        [userNumId]
      ), 
    ]);

    const streak = streakResult.rows[0];
    const summary = summaryResult.rows[0];
    const goalTarget = 5;
    const goalCompleted = todayResult.rows[0].completed;
    const lastPractice = lastPracticeResult.rows[0] || null;
    res.json({
      summary: {
        solvedQuestions: summary.solved_questions,
        totalQuestions: summary.total_questions,
        remainingQuestions: Math.max(summary.total_questions - summary.solved_questions, 0),
        completion: summary.total_questions
          ? Math.round((summary.solved_questions / summary.total_questions) * 100)
          : 0,
      },
      streak: {
        current: streak.current_streak,
        longest: streak.longest_streak,
        activeToday: streak.active_today,
        activeDays: streak.active_days,
        activityDates: streak.activity_dates,
      },
      // This backend does not currently persist watched lessons or lesson progress.
      continueLearning: null,
      lastPractice: lastPractice && {
        questionId: lastPractice.question_id,
        title: lastPractice.title,
        solvedAt: lastPractice.solved_at,
      },
      dailyGoal: {
        completed: goalCompleted,
        target: goalTarget,
        remaining: Math.max(goalTarget - goalCompleted, 0),
        progress: Math.min(Math.round((goalCompleted / goalTarget) * 100), 100),
      },
      weeklyActivity: weeklyResult.rows.map(({ date, solved }) => ({ date, solved })),
    });
  } catch (error) {
    console.error("Error fetching dashboard:", error);
    res.status(500).json({ message: "Could not fetch dashboard." });
  }
};
