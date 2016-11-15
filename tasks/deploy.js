const gulp = require('gulp');
const runSequence = require('run-sequence');
const scp = require('gulp-scp2');
const environment = process.env.ENVIRONMENT || 'dev';
var ENVPASSWORD = "";
var ENVUSER = "";
var ENVHOST = "";
if(environment === "dev"){
  ENVPASSWORD = process.env.ENVPASSWORD_DEV;
  ENVUSER = process.env.ENVUSER_DEV;
  ENVHOST = process.env.ENVHOST_DEV;
}
if(environment === "staging"){
  ENVPASSWORD = process.env.ENVPASSWORD_STA;
  ENVUSER = process.env.ENVUSER_STA;
  ENVHOST = process.env.ENVHOST_STA;
}
if(environment === "production"){
  ENVPASSWORD = process.env.ENVPASSWORD_PROD;
  ENVUSER = process.env.ENVUSER_PROD;
  ENVHOST = process.env.ENVHOST_PROD;
}

gulp.task('deploy', function() {
    return gulp.src('zip/*.zip')
      .pipe(scp({
        host: ENVHOST,
        username: ENVUSER,
        password: ENVPASSWORD,
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
