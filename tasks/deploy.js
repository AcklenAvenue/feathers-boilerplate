const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('deploy', (callback) => {
  return runSequence(
    'zip-app', 'update-elastic-beanstalk',
    callback
  );
});
