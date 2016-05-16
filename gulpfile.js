var gulp       = require('gulp');
var pug        = require('gulp-pug');
var stylus     = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');


 
gulp.task('pug', function() {
  return gulp.src('views/[^_]*.pug')
  .pipe(pug({
    pretty: true 
  }))
  .pipe(gulp.dest('./dist'));
});

gulp.task('stylus', function () {
  return gulp.src('./styl/[^_]*.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(concat('style.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css/'));
});


