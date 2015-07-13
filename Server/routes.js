var router = require('Express').Router();
var pathController = require('./Controllers/pathController.js');

for (var route in pathController){
	router.route("/paths/" + route)
	  .get(pathsController[route].get)
	  .post(pathsController[route].post);
}

module.exports = router;