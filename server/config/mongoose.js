//where the mongoose lives.
console.log("Mongoose is active!");
//require mongoose
var mongoose = require("mongoose");
//global promise is needed, otherwise depreciation
mongoose.Promise = global.Promise;
//make sure that db exists and is populating correctly with .\mongo. Per wireframe, should have questions pre-populated
mongoose.connect("mongodb://localhost/belt2db", function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to Mongoose");
    }
});
require("../models/backEndFactory");