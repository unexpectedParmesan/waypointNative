var db = require('config.js');
var Path = require('models/path.js');
var Waypoint = require('models/waypoint.js');

var path1 = new Path({
	title: 'Zombie Escape',
	length: '2.3 mi',
	description: "A thrilling brush with the undead through some the city's lovliest parks. Includes puzzles and physichal clues. Requires tree climbing. Recomended start time is 6pm.",
	estimated_time: '2-3 hrs',
	waypoints: null,
});

var path1Points = [
	new Waypoint({
		path_index: path1.get('id');
		longitude: 123.456789,
		latitude: 123.456789,
	}),
]

path1.set('waypoints', path1Points);
path1.save().then(function(path) {
	console.log('saved path:', path);
})
