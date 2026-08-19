const express = require("express");
const pool = require("../config/db")
const questionController = require("../controllers/questionsController")
const dataStructureController = require("../controllers/dataStructureController")
const algorithmController = require("../controllers/algorithmController")


// First Route is for questions id only.



const Router = express.Router();

Router

  .get("/question/:id", questionController.getQuestion)

  .get("/algoquestions/:id", questionController.getAlgoQuestion)

  .get("/dsaquestions/:id", questionController.getDsaQuestions)

  .get("/algorithm/:id", algorithmController.getAlgorithm)

  .get("/datastructure/:id", dataStructureController.getDataStructure)

  .get("/algorithm", algorithmController.getAllAlgorithms)
  
  .get("/datastructure", dataStructureController.getAllDataStructures)

module.exports = Router;