var gulp         = require('gulp');
var pug          = require('gulp-pug');
var stylus       = require('gulp-stylus');
var sourcemaps   = require('gulp-sourcemaps');
var concat       = require('gulp-concat');
var browserSync  = require('browser-sync').create();
var autoprefixer = require('autoprefixer-stylus');


 
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
    .pipe(stylus({
        use: [autoprefixer('iOS >= 7', 'last 1 Chrome version')]
      }))
    .pipe(concat('style.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.stream());
});


gulp.task('watch', ['pug', 'stylus'], function(gulpCallback) {
  browserSync.init({
    server: './dist/',
    open: true
  }, function callback() {
    gulp.watch('./dist/*.html', browserSync.reload);
    gulp.watch('./styl/*.styl', ['stylus']);
    gulp.watch('./views/*.pug', ['pug']);
    gulpCallback();
  });
});


