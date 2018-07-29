'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
//var concat = require("gulp-concat");
var sourcemaps = require("gulp-sourcemaps");
var pug = require('gulp-pug');
var plumber = require('gulp-plumber');

gulp.task('sass', function () {
    return gulp.src('./assets/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./assets/css'));
});


/*
gulp.task('scripts', function () {
    return gulp.src('./js/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./js/'));
});
*/

gulp.task('views', function buildHTML() {
    return gulp.src('./views/!(_)*.pug')
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest("./"))
  });

gulp.task('watch', function () {
    
    gulp.watch('./assets/scss/*.scss', ['sass']);
    gulp.watch('./views/**/*.pug',['views']);

});

gulp.task('default', ["watch"]);
