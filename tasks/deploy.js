const gulp = require('gulp');

gulp.task('deploy', (callback) => {
  return runSequence(
    'zip-app', 'update-elastic-beanstalk',
    callback
  );
});
