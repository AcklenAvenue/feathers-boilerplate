const gulp = require('gulp');
const runSequence = require('run-sequence');
const scp = require('gulp-scp2');
const environment = process.env.ENVIRONMENT || 'dev';

gulp.task('deploy', function() {
    return gulp.src('zip/*.zip')
      .pipe(scp({
        host: 'indigo-backend-dev.acklenavenueclient.com',
        username: 'centos',
        publicKey: 'acklenavenue.pem',
        dest: '/home/centos/',
        watch: function(client) {
          client.on('write', function(o) {
            console.log('write %s', o.destination);
          });
        }
      }))
      .on('error', function(err) {
        console.log(err);
      });
});
