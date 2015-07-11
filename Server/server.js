var express = require("express");
var router = require("./routes.js");
var parser = require("body-parser");
var morgan = require("morgan");

var db = require("db/config.js");

var app = express();

app.set("port", process.env.PORT || 3000);
console.log('Listening on port' + process.env.PORT || 3000);

app.use(morgan('dev'));

app.use(parser.json());
app.use("/", router);

module.exports.app = app;

