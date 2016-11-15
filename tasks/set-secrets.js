const gulp = require('gulp');
const fs = require('fs');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const environment = process.env.ENVIRONMENT || 'dev';
var AS400HOST = "";
var AS400USER = "";
var AS400PASSWORD = "";
var AS400PORT = 0;
var AS4000LIBRARY = "";
var AS400DATABASE = "";
var AS400CN = "";

if (environment === "dev") {
  AS400HOST = process.env.AS400HOST_DEV;
  AS400USER = process.env.AS400USER_DEV;
  AS400PASSWORD = process.env.AS400PASSWORD_DEV;
  AS400PORT = process.env.AS400PORT_DEV;
  AS4000LIBRARY = process.env.AS4000LIBRARY_DEV;
  AS400DATABASE = process.env.AS400DATABASE_DEV;
  AS400CN = process.env.AS400CN_DEV;
}
if (environment === "staging") {
  AS400HOST = process.env.AS400HOST_STA;
  AS400USER = process.env.AS400USER_STA;
  AS400PASSWORD = process.env.AS400PASSWORD_STA;
  AS400PORT = process.env.AS400PORT_STA;
  AS4000LIBRARY = process.env.AS4000LIBRARY_STA;
  AS400DATABASE = process.env.AS400DATABASE_STA;
  AS400CN = process.env.AS400CN_STA;
}
if (environment === "production") {
  AS400HOST = process.env.AS400HOST_PROD;
  AS400USER = process.env.AS400USER_PROD;
  AS400PASSWORD = process.env.AS400PASSWORD_PROD;
  AS400PORT = process.env.AS400PORT_PROD;
  AS4000LIBRARY = process.env.AS4000LIBRARY_PROD;
  AS400DATABASE = process.env.AS400DATABASE_PROD;
  AS400CN = process.env.AS400CN_PROD;
}

gulp.task('config-replace-secrets', function() {
  var file_name = "config/" + environment + ".json.default";
  gulp.src([file_name])
    .pipe(replace('$AS400HOST', AS400HOST))
    .pipe(replace('$AS400USER', AS400USER))
    .pipe(replace('$AS400PASSWORD', AS400PASSWORD))
    .pipe(replace('$AS400PORT', AS400PORT))
    .pipe(replace('$AS4000LIBRARY', AS4000LIBRARY))
    .pipe(replace('$AS400DATABASE', AS400DATABASE))
    .pipe(replace('$AS400CN', AS400CN))
    .pipe(rename(environment + ".json"))
    .pipe(gulp.dest("./config"));
});
