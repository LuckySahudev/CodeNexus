const DAILY_LIMIT = 5;
const ALLOCATION_BY_SOLVED = [
  { newQuestions: 0, revisions: 0 },
  { newQuestions: 1, revisions: 0 },
  { newQuestions: 1, revisions: 1 },
  { newQuestions: 2, revisions: 1 },
  { newQuestions: 2, revisions: 2 },
  { newQuestions: 3, revisions: 2 },
];

const getDailyAllocation = (solvedCount, assignedCount) => {
  if (assignedCount === 0) {
    return { newQuestions: DAILY_LIMIT, revisions: 0 };
  }
  if (solvedCount <= 0) return { newQuestions: 0, revisions: 0 };
  return ALLOCATION_BY_SOLVED[Math.min(solvedCount, DAILY_LIMIT)];
};

const selectPendingQuestions = (rows, limit = DAILY_LIMIT) => {
  const seen = new Set();
  return rows.filter((row) => {
    const questionId = Number(row.question_id);
    const isPending = row.status ? row.status === "pending" : !row.solved;
    if (!isPending || seen.has(questionId)) return false;
    seen.add(questionId);
    return true;
  }).slice(0, limit);
};

module.exports = { DAILY_LIMIT, getDailyAllocation, selectPendingQuestions };
