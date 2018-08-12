'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sassLint = require('gulp-sass-lint');

gulp.task('sass', function() {
  return gulp.src('scss/styles.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: [
        'last 1 major version',
        '>= 1%',
        'Chrome >= 45',
        'Firefox >= 38',
        'Edge >= 12',
        'Explorer >= 10',
        'iOS >= 9',
        'Safari >= 9',
        'Android >= 4.4',
        'Opera >= 30'
      ],
      grid: true
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('sass-lint', function () {
    return gulp.src([
        'scss/**/*.scss'
    ])
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

gulp.task('watch', ['sass', 'sass-lint'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass', 'sass-lint']);
});

gulp.task('default', ['watch']);
