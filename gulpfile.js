var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sasslint = require('gulp-sass-lint');

var config = {
    autoprefixer: { browsers: ['> 2%'], grid: true }
}

gulp.task('sass', function() {
  return gulp.src('scss/styles.scss')
    .pipe(sasslint({configFile: '.sass-lint.yml'}))
    .pipe(sasslint.format())
    .pipe(sasslint.failOnError())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(gulp.dest('css'));
});

gulp.task('watch', ['sass'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
});

gulp.task('default', ['watch']);
