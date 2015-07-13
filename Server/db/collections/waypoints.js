var db = require('../config.js');
var Waypoint = require('../models/waypoint.js');

var Waypoints = new db.Collection();

Waypoints.model = Waypoint;

module.exports = Waypoints;