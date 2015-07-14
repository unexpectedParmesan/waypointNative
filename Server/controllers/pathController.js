// var db = require('../db/config.js');
var url = require('url');

var Path = require('../db/models/path.js');
var Paths = require('../db/collections/paths.js');
var Waypoint = require('../db/models/waypoint.js');
var Waypoints = require('../db/collections/waypoints');

module.exports = {


  // USE LATER IF NECESSARY

  // getPath: function(req, res){
  // 	var pathTitle = req.body.title;
  //
  // 	Path.forge().where({title: pathTitle}).fetchOne()
  // 	  .then(function(model){
  // 	  	//Log path to console for testing - remove for production
  // 	  	console.log(model);
  // 	  	res.status(200).send(model);
  // 	  });
  // },

  getAllPaths: function(req, res) {
    new Path().fetchAll({
      withRelated: 'waypoints'
    }).then(function(collection) {
      res.status(200).send(collection);
    });
  },

  makePath: function(req, res){
  	var title = req.body.title;
    //Add check for existing path here when adding modify functionality later
  	var newPath = new Path({
      title: req.body.title,
      length: req.body.length,
      description: req.body.description,
      estimated_time: req.body.estimated_time,
      number_of_waypoints: req.body.number_of_waypoints,
      //Will be an array of waypoint objects
      waypoints: req.body.waypoints,
  	});

  	newPath.save().then(function(path){
  		//Log saved path to console for testing - remove for production
  		console.log("Path saved to database", path)
  		res.status(200).send(path);
  	});

  }
};
