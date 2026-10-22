const test = require("node:test");
const assert = require("node:assert/strict");
const { DAILY_LIMIT, getDailyAllocation, selectPendingQuestions } = require("../src/services/practicePolicy");

test("daily allocation follows the requested solved-count table", () => {
  const expected = [
    [0, 0],
    [1, 0],
    [1, 1],
    [2, 1],
    [2, 2],
    [3, 2],
  ];

  expected.forEach(([newQuestions, revisions], solvedCount) => {
    assert.deepEqual(
      getDailyAllocation(solvedCount, DAILY_LIMIT),
      { newQuestions, revisions },
      `allocation for ${solvedCount} solved questions`
    );
  });
});

test("a first practice day starts with up to five new questions", () => {
  assert.deepEqual(getDailyAllocation(0, 0, false), { newQuestions: 5, revisions: 0 });
});

test("a day with no prior list starts with new questions, even with older history", () => {
  assert.deepEqual(getDailyAllocation(0, 0), { newQuestions: 5, revisions: 0 });
});

test("incomplete prior lists use the actual solved count", () => {
  assert.deepEqual(getDailyAllocation(2, 3), { newQuestions: 1, revisions: 1 });
});

test("pending carry-forward candidates are unique, unsolved, and capped at five", () => {
  const previous = Array.from({ length: 7 }, (_, index) => ({
    question_id: index + 1,
    solved: false,
  }));
  previous.splice(1, 0, { question_id: 1, solved: false });
  previous.splice(3, 0, { question_id: 3, solved: true });

  assert.deepEqual(
    selectPendingQuestions(previous).map((question) => question.question_id),
    [1, 2, 3, 4, 5]
  );
});
