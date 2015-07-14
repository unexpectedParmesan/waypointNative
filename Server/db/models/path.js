var db = require('../config.js');
var Waypoint = require('./waypoint.js');

var Path = db.Model.extend({
	tableName: 'paths',
	path: function() {
		return this.hasMany('Waypoint', 'id');
	}
});

module.exports = Path;
