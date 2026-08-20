require("dotenv").config();
const express = require('express');
const cors = require('cors')
const server = express();
const Router = require("./src/routes/route")


require("./src/config/db");



// middlewere
server.use(cors())
server.use(express.json());
server.use(Router);
server.use('/',(req,res)=>{
  res.json({"mess":"Trying for Bad Request."})
})




server.listen(8080,()=>{
  console.log("server is on");
})