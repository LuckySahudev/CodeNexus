const express = require("express");
const auth = require("../middleware/auth");
const progressController = require("../controllers/progressController");

const router = express.Router();

router.get("/progress", auth, progressController.getProgress);

module.exports = router;
