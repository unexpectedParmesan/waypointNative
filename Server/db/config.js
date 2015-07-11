var Bookshelf = require('bookshelf');
var knex = require('knex');

var knex = require('knex')({
	client: 'mysql',
	connection: {
		host: '127.0.0.1',
		user: 'root',
		password: '',
		database: 'WaypointDb'
	}
});

var db = require('bookshelf')(knex);

db.knex.schema.hasTable('paths').then(function(exists) {
	if (!exists){
		db.knex.schema.createTable('paths', function(path){
			path.increments('id').primary();
			path.string('title', 40);
			path.string('description', 100);
			path.string('estimated_time', 40);
			//Creates created_at and updated_at columns
			path.timestamps();
		})
	}
});

db.knex.schema.hasTable('waypoints').then(function(exists) {
	if (!exists) {
		db.knex.schema.createTable('waypoints', function(waypoint){
			waypoint.increments('id').primary();
			waypoint.integer('pathIndex');
			waypoint.float('latitude', 30);
			waypoint.float('longitude', 30);
			waypoint.string('title', 100);
			waypoint.string('description', 100);
		})
	}
});

module.exports = db;