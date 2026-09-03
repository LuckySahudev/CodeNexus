const express = require("express");
const questionController = require("../controllers/questionsController")
const dataStructureController = require("../controllers/dataStructureController")
const algorithmController = require("../controllers/algorithmController")
const signInController = require("../controllers/signInController")
const logInController = require("../controllers/logInController")
const auth = require("../middleware/auth");


// First Route is for questions id only.



const Router = express.Router();

Router

  .post("/signup", signInController.signup)

  .post("/login/gmail", logInController.loginByGmail)

  .post("/login/id", logInController.loginById)

  .get("/question/:id", auth , questionController.getQuestion)

  .get("/algoquestions/:id", auth, questionController.getAlgoQuestion)

  .get("/dsaquestions/:id", auth,  questionController.getDsaQuestions)

  .get("/algorithm/:id", auth, algorithmController.getAlgorithm)

  .get("/datastructure/:id", auth, dataStructureController.getDataStructure)

  .get("/algorithm", auth, algorithmController.getAllAlgorithms)
  
  .get("/datastructure", auth, dataStructureController.getAllDataStructures)

module.exports = Router;