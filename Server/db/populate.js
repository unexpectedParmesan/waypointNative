var db = require('./config.js');
var Path = require('./models/path.js');
var Waypoint = require('./models/waypoint.js');

var path1 = new Path({
	title: 'Zombie Escape 2: mySQL',
	length: '2.3 mi',
	description: 'A thrilling brush with the undead through some the city\'s lovliest parks. Includes puzzles and physichal clues. Requires tree climbing. Recomended start time is 6pm.',
	estimated_time: '2-3 hrs',
});

var waypoint1 = new Waypoint({
	path_id: 1,
	index_in_path: 0,
	latitude: 37.785214,
	longitude: -122.402802,
	title: 'zomg waypoint',
	description: 'see this here. this here\'s a waypoint.',
});

var waypoint2 = new Waypoint({
	path_id: 1,
	index_in_path: 1,
	latitude: 37.776090,
	longitude: -122.434645,
	title: 'also waypoint',
	description: 'way on point',
});

var waypoint3 = new Waypoint({
	path_id: 1,
	index_in_path: 2,
	latitude: 37.772772,
	longitude: -122.458690,
	title: 'also also waypoint',
	description: 'porkchop sandwhiches!',
});

var path2 = new Path({
	title: 'Hack Reactor Bars',
	length: '0.7 mi',
	description: 'we deserve a beer or seven',
	estimated_time: '1-13 hrs',
})

var waypoint4 = new Waypoint({
	path_id: 2,
	index_in_path: 0,
	latitude: 37.783932,
	longitude: -122.409084,
	title: 'mikeller',
	description: 'so classy!',
});

var waypoint5 = new Waypoint({
	path_id: 2,
	index_in_path: 1,
	latitude: 37.781169,
	longitude: -122.406297,
	title: 'tempest',
	description: 'less classy...',
});

var waypoint6 = new Waypoint({
	path_id: 2,
	index_in_path: 2,
	latitude: 37.782879,
	longitude: -122.410106,
	title: 'crazy horse',
	description: '...',
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
