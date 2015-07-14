var gulp = require('gulp');
var dbTask = require('gulp-db')({ user: 'root' });
var shell = require('gulp-shell');

// NOT YET WORKING HOW DO I GULP???

// gulp.task('reset', function() {
//   dbTask.drop('waypointdb');
//   dbTask.create('waypointdb');
//   shell.task([
//     'node Server/db/config.js',
//     'node Server/db/populate.js'
//   ]);
// });
