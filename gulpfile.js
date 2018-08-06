'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var concat = require("gulp-concat");
var sourcemaps = require("gulp-sourcemaps");
var pug = require('gulp-pug');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

// sass
gulp.task('sass', function () {
    return gulp.src('./assets/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./assets/css'))
        .pipe(browserSync.stream());
});

// css minify
gulp.task('cssMin', function () {
    gulp.src('./assets/css/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./assets/css'));
});


// concat js
gulp.task('scripts', function () {
    return gulp.src(['./assets/libs/js/jquery.min.js','./assets/libs/js/bootstrap.min.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('./assets/js'));
});


// pug
gulp.task('views', function buildHTML() {
    return gulp.src('./views/!(_)*.pug')
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest("./"))
  });

  //watch
gulp.task('watch', function () {

    browserSync.init({
        server: "./"
    });
    
    gulp.watch('./assets/scss/*.scss', ['sass']);
    gulp.watch('./assets/css/*.css', ['cssMin']);
    gulp.watch('./assets/css/*.css', ['cssMin']);
    gulp.watch("./assets/js/*.js").on('change', browserSync.reload);;
    gulp.watch('./views/**/*.pug',['views']).on('change', browserSync.reload);

});

//default
gulp.task('default',['scripts','watch']);
