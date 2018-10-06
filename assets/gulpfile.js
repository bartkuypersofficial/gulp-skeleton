'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    minify = require('gulp-minify'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-cssmin'),
    sassLint = require('gulp-sass-lint');

gulp.task('sass', function() {
  return gulp.src('scss/styles.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['>= 2%'], grid: true}))
    .pipe(gulp.dest('../css'));
});

gulp.task('sass-lint', function () {
    return gulp.src([
        'scss/**/*.scss'
    ])
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

gulp.task('scripts', function() {
  return gulp.src('scripts/**')
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('../js'));
});

gulp.task('minify-scripts', function() {
  return gulp.src('scripts/**')
    .pipe(concat('scripts.js'))
    .pipe(minify({
      ext:{min:'.min.js'}
    }))
    .pipe(gulp.dest('../js'));
});

gulp.task('minify-styles', function() {
  return gulp.src('scss/styles.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['>= 2%'], grid: true}))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('../css'));
});

gulp.task('watch', ['sass', 'sass-lint', 'minify-styles', 'scripts', 'minify-scripts' ], function() {
  gulp.watch(['scss/**/*.scss'], ['sass', 'sass-lint', 'minify-styles']);
  gulp.watch(['scripts/**'], ['scripts', 'minify-scripts']);
});

gulp.task('default', ['watch']);
