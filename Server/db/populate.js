var db = require('./config.js');
var Path = require('./models/path.js');
var Waypoint = require('./models/waypoint.js');

var path1 = new Path({
	title: 'Zombie Escape',
	length: '2.3 mi',
	description: 'A thrilling brush with the undead through some the city\'s lovliest parks. Includes puzzles and physichal clues. Requires tree climbing. Recomended start time is 6pm.',
	estimated_time: '2-3 hrs',
});

var waypoint1 = new Waypoint({
	path_id: 1,
	index_in_path: 0,
	longitude: 123.456789,
	latitude: 123.456789,
	title: 'zomg waypoint',
	description: 'see this here. this here\'s a waypoint.',
});

var waypoint2 = new Waypoint({
	path_id: 1,
	index_in_path: 1,
	longitude: 321.987654,
	latitude: 123.456789,
	title: 'also waypoint',
	description: 'way on point',
});

var waypoint3 = new Waypoint({
	path_id: 1,
	index_in_path: 2,
	longitude: 123.456789,
	latitude: 321.987654,
	title: 'also also waypoint',
	description: 'porkchop sandwhiches!',
});

var path2 = new Path({
	title: 'Zombie Escape 2: mySQL',
	length: '12.3 mi',
	description: 'They can use computers now!!!!!!!11one',
	estimated_time: '12-13 hrs',
})

var waypoint4 = new Waypoint({
	path_id: 2,
	index_in_path: 0,
	longitude: 12.456789,
	latitude: 12.456789,
	title: 'zomg waypoint',
	description: 'see this here. this here\'s a waypoint.',
});

var waypoint5 = new Waypoint({
	path_id: 2,
	index_in_path: 1,
	longitude: 32.987654,
	latitude: 12.456789,
	title: 'also waypoint',
	description: 'way on point',
});

var waypoint6 = new Waypoint({
	path_id: 2,
	index_in_path: 2,
	longitude: 12.456789,
	latitude: 32.987654,
	title: 'also also waypoint',
	description: 'porkchop sandwhiches!',
});




path1.save().then(function(path) {
	console.log('saved path:', path);
});

waypoint1.save().then(function(waypoint) {
	console.log('saved waypoint:', waypoint)
});

waypoint2.save().then(function(waypoint) {
	console.log('saved waypoint:', waypoint)
});

waypoint3.save().then(function(waypoint) {
	console.log('saved waypoint:', waypoint)
});

path2.save().then(function(path) {
	console.log('saved path:', path);
});

waypoint4.save().then(function(waypoint) {
	console.log('saved waypoint:', waypoint)
});

waypoint5.save().then(function(waypoint) {
	console.log('saved waypoint:', waypoint)
});

waypoint6.save().then(function(waypoint) {
	console.log('saved waypoint:', waypoint)
});
