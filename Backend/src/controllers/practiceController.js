const pool = require("../config/db")
const { DAILY_LIMIT, getDailyAllocation, selectPendingQuestions } = require("../services/practicePolicy");

const eligibleQuestions = async (client, userNumId, { solved, newOnly = false, excludeYesterdayRevision = false }) => {
  const result = await client.query(
    `SELECT q.*,
            q.difficulty::text AS difficulty,
            COALESCE(ds.data_structure_ids, ARRAY[]::int[]) AS data_structure_ids,
            COALESCE(algo.algorithm_ids, ARRAY[]::int[]) AS algorithm_ids,
            COALESCE(ds.data_structure_names, ARRAY[]::text[]) AS data_structure_names,
            COALESCE(algo.algorithm_names, ARRAY[]::text[]) AS algorithm_names,
            sq.solved_at
     FROM questions q
     JOIN difficulties d ON lower(trim(d.name)) = lower(trim(q.difficulty::text))
     JOIN user_difficulty_preferences udp
       ON udp.user_num_id = $1 AND udp.difficulty_id = d.id
     JOIN LATERAL (
       SELECT array_agg(DISTINCT ds.id ORDER BY ds.id)::int[] AS data_structure_ids,
              array_agg(DISTINCT ds.name ORDER BY ds.name)::text[] AS data_structure_names
       FROM question_ds_type qdt
       JOIN data_structures ds ON ds.id = qdt.ds_type
       JOIN user_data_structure_preferences pref
         ON pref.data_structure_id = ds.id AND pref.user_num_id = $1
       WHERE qdt.question_id = q.question_id
     ) ds ON TRUE
     LEFT JOIN LATERAL (
       SELECT array_agg(DISTINCT a.id ORDER BY a.id)::int[] AS algorithm_ids,
              array_agg(DISTINCT a.name ORDER BY a.name)::text[] AS algorithm_names
       FROM question_algo_type qat
       JOIN algorithms a ON a.id = qat.algo_type
       JOIN user_algorithm_preferences pref
         ON pref.algorithm_id = a.id AND pref.user_num_id = $1
       WHERE qat.question_id = q.question_id
     ) algo ON TRUE
     LEFT JOIN LATERAL (
       SELECT MIN(solved_at) AS solved_at
       FROM solved_questions
       WHERE user_num_id = $1 AND question_id = q.question_id
     ) sq ON TRUE
     WHERE (${solved ? "sq.solved_at IS NOT NULL" : "sq.solved_at IS NULL"})
       AND (cardinality(ds.data_structure_ids) > 0 OR cardinality(algo.algorithm_ids) > 0)
       ${newOnly ? `AND NOT EXISTS (
         SELECT 1 FROM user_practice_questions prior
         WHERE prior.user_num_id = $1
           AND prior.question_id = q.question_id
           AND prior.recommendation_type = 'new'
       )` : ""}
       ${excludeYesterdayRevision ? `AND NOT EXISTS (
         SELECT 1 FROM user_practice_questions recent
         WHERE recent.user_num_id = $1
           AND recent.question_id = q.question_id
           AND recent.practice_date = CURRENT_DATE - 1
           AND recent.recommendation_type = 'revision'
       )` : ""}
     ORDER BY q.question_id`,
    [userNumId]
  );
  return result.rows;
};

const distributeByTopics = (questions, limit, historicalSolvedCounts = new Map()) => {
  const remaining = [...questions];
  const selected = [];
  const counts = new Map(historicalSolvedCounts);

  while (selected.length < limit && remaining.length) {
    remaining.sort((left, right) => {
      const leftCount = (left.data_structure_ids.length
        ? Math.min(...left.data_structure_ids.map((id) => counts.get(`ds:${id}`) || 0)) : 0)
        + (left.algorithm_ids.length
          ? Math.min(...left.algorithm_ids.map((id) => counts.get(`algo:${id}`) || 0)) : 0);
      const rightCount = (right.data_structure_ids.length
        ? Math.min(...right.data_structure_ids.map((id) => counts.get(`ds:${id}`) || 0)) : 0)
        + (right.algorithm_ids.length
          ? Math.min(...right.algorithm_ids.map((id) => counts.get(`algo:${id}`) || 0)) : 0);
      return leftCount - rightCount;
    });
    const question = remaining.shift();
    selected.push(question);
    for (const id of question.data_structure_ids) counts.set(`ds:${id}`, (counts.get(`ds:${id}`) || 0) + 1);
    for (const id of question.algorithm_ids) counts.set(`algo:${id}`, (counts.get(`algo:${id}`) || 0) + 1);
  }
  return selected;
};

const loadDailyList = async (client, userNumId, date) => client.query(
  `SELECT to_char(upq.practice_date, 'YYYY-MM-DD') AS practice_date,
          upq.question_id, upq.status, upq.recommendation_type,
          q.*, q.difficulty::text AS difficulty,
          EXISTS (
            SELECT 1 FROM solved_questions sq
            WHERE sq.user_num_id = upq.user_num_id
              AND sq.question_id = upq.question_id
          ) AS solved
   FROM user_practice_questions upq
   JOIN questions q ON q.question_id = upq.question_id
   WHERE upq.user_num_id = $1 AND upq.practice_date = $2
   ORDER BY CASE upq.recommendation_type
     WHEN 'carry_forward' THEN 1 WHEN 'new' THEN 2 ELSE 3 END,
     upq.question_id`,
  [userNumId, date]
);

const formatDailyQuestions = (rows) => rows.map((row) => ({
  ...row,
  platform: row.platform || "LeetCode",
}));

const generateDailyPractice = async (client, userNumId, today, { replaceExisting = false } = {}) => {
    if (replaceExisting) {
      await client.query(
        "DELETE FROM user_practice_questions WHERE user_num_id = $1 AND practice_date = $2",
        [userNumId, today]
      );
    }

    const preferences = await client.query(
      `SELECT
         EXISTS (SELECT 1 FROM user_data_structure_preferences WHERE user_num_id = $1) AS has_data_structures,
         EXISTS (SELECT 1 FROM user_algorithm_preferences WHERE user_num_id = $1) AS has_algorithms,
         EXISTS (SELECT 1 FROM user_difficulty_preferences WHERE user_num_id = $1) AS has_difficulties`,
      [userNumId]
    );
    const prefs = preferences.rows[0];
    if (!prefs.has_data_structures || !prefs.has_algorithms || !prefs.has_difficulties) {
      return { practice_date: today, questions: [], message: "Choose at least one data structure, algorithm, and difficulty to generate practice questions." };
    }

    await client.query(
      "INSERT INTO users_daily_logs (user_num_id, practice_date) VALUES ($1, $2) ON CONFLICT DO NOTHING",
      [userNumId, today]
    );
    let daily = await loadDailyList(client, userNumId, today);
    if (daily.rowCount) {
      return {
        practice_date: today,
        questions: formatDailyQuestions(daily.rows),
        message: null,
      };
    }

    const previous = await client.query(
       `SELECT to_char(p.practice_date, 'YYYY-MM-DD') AS practice_date,
               p.question_id, p.recommendation_type, p.status,
              EXISTS (
                SELECT 1 FROM solved_questions sq
                WHERE sq.user_num_id = p.user_num_id
                  AND sq.question_id = p.question_id
              ) AS solved
       FROM user_practice_questions p
       WHERE p.user_num_id = $1 AND p.practice_date = $2::date - 1
       ORDER BY p.question_id`,
      [userNumId, today]
    );
    const topicProgress = await client.query(
      `WITH topic_questions AS (
         SELECT 'ds:' || ds.id::text AS topic_key, qdt.question_id
         FROM question_ds_type qdt
         JOIN data_structures ds ON ds.id = qdt.ds_type
         JOIN user_data_structure_preferences pref
           ON pref.data_structure_id = ds.id AND pref.user_num_id = $1
         UNION ALL
         SELECT 'algo:' || a.id::text AS topic_key, qat.question_id
         FROM question_algo_type qat
         JOIN algorithms a ON a.id = qat.algo_type
         JOIN user_algorithm_preferences pref
           ON pref.algorithm_id = a.id AND pref.user_num_id = $1
       )
       SELECT tq.topic_key, COUNT(DISTINCT solved.question_id)::int AS solved_count
       FROM topic_questions tq
       LEFT JOIN solved_questions solved
         ON solved.user_num_id = $1 AND solved.question_id = tq.question_id
       GROUP BY tq.topic_key`,
      [userNumId]
    );
    const historicalSolvedCounts = new Map(
      topicProgress.rows.map((row) => [row.topic_key, row.solved_count])
    );
    const previousDay = new Date(`${today}T00:00:00Z`);
    previousDay.setUTCDate(previousDay.getUTCDate() - 1);
    const previousDate = previousDay.toISOString().slice(0, 10);
    const yesterdayRows = previous.rows.filter((row) => String(row.practice_date).slice(0, 10) === previousDate);
    const solvedYesterday = yesterdayRows.filter((row) => row.status === "solved").length;
    const allocation = getDailyAllocation(solvedYesterday, yesterdayRows.length);

    const pending = selectPendingQuestions(previous.rows);
    const selected = pending.map((row) => ({ question_id: row.question_id, recommendation_type: "carry_forward" }));
    const usedIds = new Set(selected.map((item) => Number(item.question_id)));
    const slots = DAILY_LIMIT - selected.length;
    const newTarget = Math.min(allocation.newQuestions, slots);
    const revisionTarget = Math.min(allocation.revisions, slots - newTarget);

    const newCandidates = distributeByTopics(
      (await eligibleQuestions(client, userNumId, { solved: false, newOnly: true }))
        .filter((question) => !usedIds.has(Number(question.question_id))),
      newTarget,
      historicalSolvedCounts
    );
    for (const question of newCandidates) {
      selected.push({ question_id: question.question_id, recommendation_type: "new" });
      usedIds.add(Number(question.question_id));
    }

    const revisionCandidates = distributeByTopics(
      (await eligibleQuestions(client, userNumId, { solved: true, excludeYesterdayRevision: true }))
        .filter((question) => !usedIds.has(Number(question.question_id))),
      revisionTarget,
      historicalSolvedCounts
    );
    for (const question of revisionCandidates) {
      selected.push({ question_id: question.question_id, recommendation_type: "revision" });
      usedIds.add(Number(question.question_id));
    }

    if (selected.length < DAILY_LIMIT) {
      const extraNew = distributeByTopics(
        (await eligibleQuestions(client, userNumId, { solved: false, newOnly: true }))
          .filter((question) => !usedIds.has(Number(question.question_id))),
        DAILY_LIMIT - selected.length,
        historicalSolvedCounts
      );
      for (const question of extraNew) {
        selected.push({ question_id: question.question_id, recommendation_type: "new" });
        usedIds.add(Number(question.question_id));
      }
    }

    if (selected.length) {
      await client.query(
        `INSERT INTO user_practice_questions
           (user_num_id, practice_date, question_id, status, recommendation_type)
         SELECT $1, $2, item.question_id, 'pending', item.recommendation_type
         FROM jsonb_to_recordset($3::jsonb) AS item(question_id int, recommendation_type text)
         ON CONFLICT (user_num_id, practice_date, question_id) DO NOTHING`,
        [userNumId, today, JSON.stringify(selected)]
      );
    }

    daily = await loadDailyList(client, userNumId, today);
    return {
      practice_date: today,
      questions: formatDailyQuestions(daily.rows),
      message: daily.rowCount === 0
        ? "No questions match your current preferences. Try selecting more topics or difficulty levels."
        : daily.rowCount < DAILY_LIMIT
          ? "There are not enough eligible questions to fill all five daily slots."
          : null,
    };
};

const withDailyPracticeTransaction = async (userNumId, options = {}) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    // Keep generation, login initialization, and preference edits serialized
    // for each user and database-local calendar date.
    await client.query("SELECT pg_advisory_xact_lock($1::int, 731042)", [userNumId]);
    const { rows: [{ practice_date: today }] } = await client.query(
      "SELECT to_char(CURRENT_DATE, 'YYYY-MM-DD') AS practice_date"
    );
    const practice = await generateDailyPractice(client, userNumId, today, options);
    await client.query("COMMIT");
    return practice;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

exports.initializeDailyPractice = async (userNumId) => {
  try {
    return await withDailyPracticeTransaction(userNumId);
  } catch (error) {
    // Practice generation should not turn a valid login/signup into an auth
    // failure. The authenticated Practice page can retry generation later.
    console.error("Could not initialize daily practice during authentication:", error);
    return {
      practice_date: null,
      questions: [],
      message: "Daily practice could not be prepared. You can retry from Practice Mode.",
    };
  }
};

exports.getDailyPractice = async (req, res) => {
  try {
    const practice = await withDailyPracticeTransaction(req.user.num_id);
    return res.json(practice);
  } catch (error) {
    console.error("Error generating daily practice:", error);
    return res.status(500).json({ message: "Could not load daily practice." });
  }
};

exports.getPracticeHistory = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT to_char(upq.practice_date, 'YYYY-MM-DD') AS practice_date,
              upq.question_id,
              upq.status,
              upq.recommendation_type,
              q.*, q.difficulty::text AS difficulty,
              EXISTS (
                SELECT 1 FROM solved_questions sq
                WHERE sq.user_num_id = upq.user_num_id
                  AND sq.question_id = upq.question_id
              ) AS solved
       FROM user_practice_questions upq
       JOIN questions q ON q.question_id = upq.question_id
       WHERE upq.user_num_id = $1 AND upq.practice_date < CURRENT_DATE
       ORDER BY upq.practice_date DESC, upq.question_id`,
      [req.user.num_id]
    );
    return res.json({ questions: formatDailyQuestions(rows) });
  } catch (error) {
    console.error("Error loading practice history:", error);
    return res.status(500).json({ message: "Could not load practice history." });
  }
};

exports.markPracticeQuestionSolved = async (req, res) => {
  const questionId = Number(req.params.questionId);
  const practiceDate = req.body?.practice_date;
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!Number.isSafeInteger(questionId) || questionId <= 0) {
    return res.status(400).json({ message: "A valid question ID is required." });
  }
  if (typeof practiceDate !== "string" || !datePattern.test(practiceDate)) {
    return res.status(400).json({ message: "A valid practice date is required." });
  }
  const parsedPracticeDate = new Date(`${practiceDate}T00:00:00Z`);
  if (!Number.isFinite(parsedPracticeDate.getTime()) || parsedPracticeDate.toISOString().slice(0, 10) !== practiceDate) {
    return res.status(400).json({ message: "A valid practice date is required." });
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    // Coordinate with daily generation and preference replacement for this user.
    await client.query("SELECT pg_advisory_xact_lock($1::int, 731042)", [req.user.num_id]);
    const practiceQuestion = await client.query(
      `SELECT question_id
       FROM user_practice_questions
       WHERE user_num_id = $1 AND practice_date = $2::date AND question_id = $3
       FOR UPDATE`,
      [req.user.num_id, practiceDate, questionId]
    );

    if (!practiceQuestion.rowCount) {
      await client.query("ROLLBACK");
      return res.status(404).json({ message: "This question is not in that day's practice." });
    }

    await client.query(
      `INSERT INTO solved_questions (user_num_id, question_id)
       SELECT $1, $2
       WHERE NOT EXISTS (
         SELECT 1 FROM solved_questions WHERE user_num_id = $1 AND question_id = $2
       )`,
      [req.user.num_id, questionId]
    );
    const { rows: updatedPracticeRows } = await client.query(
      `UPDATE user_practice_questions
       SET status = 'solved'
       WHERE user_num_id = $1
         AND question_id = $3
         AND (
           practice_date = $2::date
           OR (practice_date > $2::date AND recommendation_type = 'carry_forward')
         )
       RETURNING to_char(practice_date, 'YYYY-MM-DD') AS practice_date`,
      [req.user.num_id, practiceDate, questionId]
    );
    await client.query("COMMIT");
    return res.json({
      question_id: questionId,
      practice_date: practiceDate,
      updated_practice_dates: updatedPracticeRows.map((row) => row.practice_date),
      solved: true,
      status: "solved",
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error marking practice question solved:", error);
    return res.status(500).json({ message: "Could not mark this question as solved." });
  } finally {
    client.release();
  }
};

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
    await client.query("SELECT pg_advisory_xact_lock($1::int, 731042)", [req.user.num_id]);
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

    const { rows: [{ practice_date: today }] } = await client.query(
      "SELECT to_char(CURRENT_DATE, 'YYYY-MM-DD') AS practice_date"
    );
    const practice = await generateDailyPractice(client, req.user.num_id, today, {
      replaceExisting: true,
    });

    await client.query("COMMIT");
    res.json({ message: "Practice preferences saved.", practice });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error saving practice preferences:", error);
    res.status(500).json({
      message: "Could not save practice preferences.",
      ...(process.env.NODE_ENV !== "production" ? { details: error.message } : {}),
    });
  } finally {
    client.release();
  }
};
