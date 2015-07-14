var db = require('../config.js');
var Waypoint = require('./waypoint.js');

var Path = db.Model.extend({
	tableName: 'paths',
	waypoints: function() {
		return this.hasMany(Waypoint);
	}
});

module.exports = Path;
