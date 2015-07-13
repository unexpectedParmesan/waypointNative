var gulp = require('gulp');
var dbTask = require('gulp-db')({ user: 'root' });
var shell = require('gulp-shell');

gulp.task('reset', function() {
  dbTask.drop('WaypointDb');
  dbTask.create('WaypointDb');
  shell.task([
    'node Server/db/config.js',
    'node Server/db/populate.js'
  ]);
});
