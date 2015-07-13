var express = require("express");
var router = require("./router.js");
var bodyParser = require("body-parser");


var db = require("./db/config.js");

var app = express();
app.use(bodyParser.json());

app.set("port", process.env.PORT || 3000);
console.log('Server listening on port ' + app.get('port'));

app.use("/", router);

module.exports.app = app;

