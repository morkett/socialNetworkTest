var gulp = require('gulp');

var sass = require('gulp-sass');

var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
  return gulp.src('public/scss/**/*.scss') // Gets all files ending with .scss in public/scss
    .pipe(sass())
    .pipe(autoprefixer({browsers: ['last 3 versions']}))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});





var browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'public'
    }
  });
});

gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('public/scss/**/*.scss', ['sass']);
  // reload browser when HTML or JS files changed
  gulp.watch('public/**/*html', browserSync.reload);
  gulp.watch('public/js/**/*.js', browserSync.reload);
});




// Collects js together - minify + put in dist folder
var useref = require('gulp-useref');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var babel = require('gulp-babel');


gulp.task('useref', function(){
  return gulp.src('public/*.html')
    .pipe(useref())

    .pipe(gulpIf('*.js', babel({ presets: ['es2015']})))
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});


//image optimising
var imagemin = require('gulp-imagemin');

var cache = require('gulp-cache');

gulp.task('images', function(){
  return gulp.src('public/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
    interlaced: true
  })))
  .pipe(gulp.dest('dist/images'));
});

//Cleaning Up Generated files
var del = require('del');

gulp.task('clean:dist', function() {
  return del.sync('dist');
});

//Remove images from cache
gulp.task('cache:clear', function (callback) {
  return cache.clearAll(callback);
});



// sass + watch + sync with 'gulp' command only
gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  );
});

gulp.task('copyStatesFiles', function() {
  gulp.src('public/states/**/*')
   .pipe(gulp.dest('dist/states'));
});

gulp.task('copySoundFiles', function() {
  gulp.src('public/sounds/**/*')
   .pipe(gulp.dest('dist/sounds'));
});

//run sequence

var runSequence = require('run-sequence');

gulp.task('build', function (callback) {
  runSequence('clean:dist',
    ['sass', 'useref', 'images', 'copyStatesFiles', 'copySoundFiles'],
    callback
  );
});
