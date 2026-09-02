const express = require("express");
const pool = require("../config/db")
const questionController = require("../controllers/questionsController")
const dataStructureController = require("../controllers/dataStructureController")
const algorithmController = require("../controllers/algorithmController")
const userController = require("../controllers/userController")
const signInController = require("../controllers/signInController")
const logInController = require("../controllers/logInController")
const auth = require("../middleware/auth");


// First Route is for questions id only.



const Router = express.Router();

Router

  .get("/signin", signInController.signin)

  .get("/login/gmail", logInController.loginByGmail)

  .get("/login/id", logInController.loginById)

  .get("/question/:id", auth , questionController.getQuestion)

  .get("/algoquestions/:id", auth, questionController.getAlgoQuestion)

  .get("/dsaquestions/:id", auth,  questionController.getDsaQuestions)

  .get("/algorithm/:id", auth, algorithmController.getAlgorithm)

  .get("/datastructure/:id", auth, dataStructureController.getDataStructure)

  .get("/algorithm", auth, algorithmController.getAllAlgorithms)
  
  .get("/datastructure", auth, dataStructureController.getAllDataStructures)

module.exports = Router;