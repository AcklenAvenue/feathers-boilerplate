const gulp = require('gulp');
const eslint = require('gulp-eslint');
gulp.task('lint', function() {
  return gulp.src(['!node_modules/**', './server.js', 'app/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
