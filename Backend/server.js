require("dotenv").config();
const express = require('express');
const server = express();
const Router = require("./src/routes/route")

require("./src/config/db");



// middlewere
server.use(express.json());
server.use(Router);




server.listen(8080,()=>{
  console.log("server is on");
})