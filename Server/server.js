var express = require("express");
// var router = require("./router.js");
var bodyParser = require("body-parser");
var pathController = require('./Controllers/pathController.js');


var db = require("./db/config.js");

var app = express();
app.use(bodyParser.json());

app.set("port", process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
  console.log('Server listening on port ' + app.get('port'));
});

app.get('/paths', function(req, res) {
  pathController.getAllPaths(req, res);
});


// WE'LL START USING A ROUTER WHEN THINGS GET MORE COMPLEX
// app.use("/", router);

module.exports = app;
