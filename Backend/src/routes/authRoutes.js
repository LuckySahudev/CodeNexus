const express = require("express");
const signInController = require("../controllers/signInController");
const logInController = require("../controllers/logInController");

const router = express.Router();

router.post("/signup", signInController.signup);

router.post("/login/gmail", logInController.loginByGmail);

router.post("/login/id", logInController.loginById);

module.exports = router;
