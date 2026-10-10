const express = require("express");
const auth = require("../middleware/auth");
const practiceController = require("../controllers/practiceController");

const router = express.Router();

router.get("/practice/preferences", auth, practiceController.getUserPracticePreferences);

router.put("/practice/preferences", auth, practiceController.saveUserPracticePreferences);

router.post("/practice/preferences", auth, practiceController.savePreferences);

module.exports = router;
