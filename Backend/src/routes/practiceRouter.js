const express = require("express");
const auth = require("../middleware/auth");
const practiceController = require("../controllers/practiceController");

const router = express.Router();

router.get("/practice/preferences", auth, practiceController.getUserPracticePreferences);

router.get("/practice/today", auth, practiceController.getDailyPractice);
router.get("/practice/history", auth, practiceController.getPracticeHistory);
router.patch("/practice/questions/:questionId/solved", auth, practiceController.markPracticeQuestionSolved);

router.put("/practice/preferences", auth, practiceController.saveUserPracticePreferences);

module.exports = router;
