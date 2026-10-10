const express = require("express");
const auth = require("../middleware/auth");
const questionController = require("../controllers/questionsController");
const dataStructureController = require("../controllers/dataStructureController");
const algorithmController = require("../controllers/algorithmController");
const descriptionController = require("../controllers/descriptionController");
const examplesController = require("../controllers/examplesController");
const interviewQuestionsController = require("../controllers/interviewQuestionsController");

const router = express.Router();



// Data structure routes
router.get("/datastructure", auth, dataStructureController.getAllDataStructures);

router.get("/datastructure/questions", auth, questionController.getDsaQuestions);

router.get("/datastructure/:id", auth, dataStructureController.getDataStructure);

router.get("/datastructure/description/:id", auth, descriptionController.getDataStructureDescription);

router.get("/datastructure/examples/:id", auth, examplesController.getDataStructureExamples);

router.get("/datastructure/interview-question/:id", auth, interviewQuestionsController.getDataStructureInterviewQuestions);


// Algorithm routes
router.get("/algorithm", auth, algorithmController.getAllAlgorithms);

router.get("/algorithm/questions", auth, questionController.getAlgoQuestion);

router.get("/algorithm/:id", auth, algorithmController.getAlgorithm);

router.get("/algorithm/description/:id", auth, descriptionController.getAlgorithmDescription);

router.get("/algorithm/examples/:id", auth, examplesController.getAlgorithmExamples);

router.get("/algorithm/interview-question/:id", auth, interviewQuestionsController.getAlgorithmInterviewQuestions);

module.exports = router;
