var db = require('../config.js');
var Path = require('./path.js');

var Waypoint = db.Model.extend({
	tableName: 'waypoints',
	waypoint: function() {
		return this.belongsTo('Path', 'path_id');
	}
});

module.exports = Waypoint;
