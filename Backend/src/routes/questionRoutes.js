const express = require("express");
const auth = require("../middleware/auth");
const questionController = require("../controllers/questionsController");

const router = express.Router();

router.get("/question/:id", auth, questionController.getQuestion);

router.post("/solvedquestions", auth, questionController.manageSolveQuestions);

module.exports = router;
