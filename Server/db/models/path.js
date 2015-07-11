var db = require('../config.js');
var Waypoint = require('./waypoint.js')

var Path = db.Model.extend({
	tableName: 'waypoints',
	waypoint: function(){
		return this.hasMany(Waypoint);
	}
});

module.exports = Path;