console.log("hitting the server!");
//require express, b-p, and path
var express = require("express");
var bodyParser = require("body-parser"); 
var path = require("path"); 

//creates the app
var app = express();

//body-parser information
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//designates the use of node_modules
app.use(express.static(path.join(__dirname, "client")));
app.use(express.static(path.join(__dirname, "node_modules")));

//needed to run the server (routes and mongoose information)
require("./server/config/mongoose");
require("./server/config/routes")(app);

//listening on localhost:4200 (if not running check and confirm that db and server are up)
app.listen(4200, function () {  
    console.log("Tuning in live on port 4200");
});