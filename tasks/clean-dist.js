const gulp = require('gulp');
const clean = require('gulp-clean');

gulp.task('clean-dist', () => {
  return gulp.src(['dist/'], {
      read: false,
    })
    .pipe(clean());
});
