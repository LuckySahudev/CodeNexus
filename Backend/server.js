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
  res.status(400).json({"mess":"Trying for Bad Request."})
})

 

 
const port = Number(process.env.PORT) || 8080;
server.listen(port,()=>{
  console.log(`server is on port ${port}`);
})
