var db = require('../config.js');
var Path = require('./path.js');

var Waypoint = db.Model.extend({
	tableName: 'waypoints',
	path: function() {
		return this.belongsTo(Path);
	}
});

module.exports = Waypoint;
