const gulp = require('gulp');
const runSequence = require('run-sequence');
const scp = require('gulp-scp2');
const GulpSSH = require('gulp-ssh')

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

var config = {
  host: ENVHOST,
  port: 22,
  username: ENVUSER,
  password: ENVPASSWORD
}

var gulpSSH = new GulpSSH({
  ignoreErrors: false,
  sshConfig: config
})

gulp.task('deploy', (callback) => {
  if(environment === "dev"){
    return runSequence(
  		'scp-dev', 'unzip-dev', 'install-dev',
  		callback
  	);
  }

});

gulp.task('scp-dev', function() {
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


gulp.task('unzip-dev', function () {
  return gulpSSH
    .exec(['unzip -o indigo-backend-'+environment+'.zip -d /home/centos/builds'], {filePath: 'commands.log'})
    .pipe(gulp.dest('logs'))
    .on('error', function(err) {
      console.log(err);
    });
})

gulp.task('install-dev', function () {
  return gulpSSH
    .exec(['cd builds','npm install'], {filePath: 'commands.log'})
    .pipe(gulp.dest('logs'))
    .on('error', function(err) {
      console.log(err);
    });
})
