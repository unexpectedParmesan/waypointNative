var express = require("express");
var router = require("./routes.js");

var db = require("./db/config.js");

var app = express();

app.set("port", process.env.PORT || 3000);
console.log('Server is running');

app.use("/", router);

module.exports.app = app;

