
const gulp = require('gulp');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');

const coverageOptions = {
  statements: 80,
  branches: 70,
  lines: 80,
  functions: 80
};

gulp.task('istanbul-setup', function istanbulSetup() {
  return gulp.src(['app/handlers/**/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['istanbul-setup'], function test() {
  return gulp.src(['test/**/*.js'], {
    read: false,
  })
    .pipe(mocha())
    .pipe(istanbul.writeReports({
      reporters: ['html', 'text-summary', 'lcov'],
    }))
    .pipe(istanbul.enforceThresholds({
      thresholds: {
        global: coverageOptions
      }
    }));
});
