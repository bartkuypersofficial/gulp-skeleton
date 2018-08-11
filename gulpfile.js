var gulp = require('gulp'),
    sass = require('gulp-sass');

gulp.task('sass', function() {
  return gulp.src('scss/styles.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('css'));
});

gulp.task('watch', ['sass'], function() {
  gulp.watch(['scss/**/*'], ['sass']);
});

gulp.task('default', ['watch']);
