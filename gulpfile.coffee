gulp         = require('gulp')
pug          = require('gulp-pug')
stylus       = require('gulp-stylus')
sourcemaps   = require('gulp-sourcemaps')
concat       = require('gulp-concat')
browserSync  = require('browser-sync').create()
autoprefixer = require('autoprefixer-stylus')

gulp.task 'pug', ->
  gulp.src('views/[^_]*.pug') \
  .pipe(pug(pretty: true)) \
  .pipe(gulp.dest('dist'))

gulp.task 'stylus', ->
  gulp.src('styl/[^_]*.styl') \
  .pipe(sourcemaps.init()) \
  .pipe(stylus(use: [ autoprefixer('iOS >= 7', 'last 1 Chrome version') ])) \
  .pipe(concat('style.css')) \
  .pipe(sourcemaps.write('.')) \
  .pipe(gulp.dest('./dist/css/')) \
  .pipe(browserSync.stream({match: "**/*.css"}))

gulp.task 'watch', [
  'pug'
  'stylus'
], (gulpCallback) ->
  browserSync.init {
    server: './dist/'
    open: true
  }, ->
    gulp.watch './dist/*.html', browserSync.reload
    gulp.watch './styl/*.styl', [ 'stylus' ]
    gulp.watch './views/*.pug', [ 'pug' ]
    gulpCallback()
    return
  return