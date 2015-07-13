var router = require('Express').Router();
var pathController = require('./Controllers/pathController.js');

module.exports = function(app){

	app.route('/')
	  .get(pathController.getPath)
	  .post(pathController.makePath);

};
