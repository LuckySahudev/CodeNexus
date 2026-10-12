const express = require("express");

const router = express.Router();

router.use(require("./authRoutes"));

router.use(require("./learningRoutes"));

router.use(require("./questionRoutes"));

router.use(require("./practiceRouter"));

router.use(require("./progressRouter"));

router.use(require("./dashboardRouter"));

router.use(require("./bookmarkRouter"));

router.use(require("./notesRouter"));

module.exports = router;
