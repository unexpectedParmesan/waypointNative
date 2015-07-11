var db = require('./config.js');
var Waypoint = require('./models/waypoints.js');

var Waypoints = new db.Collection();

Waypoints.model = Waypoint;

module.exports = Waypoints;