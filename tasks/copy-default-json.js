const gulp = require('gulp');
const fs = require('fs');
const rename = require('gulp-rename');
const environment = process.env.ENVIRONMENT || 'dev';

gulp.task('copy-default-json', function() {
    fs.stat('./config/default.json', function(err, stat) {
    if(err != null && environment === 'dev') {
        return gulp.src("./default.json.default")
          .pipe(rename("default.json"))
          .pipe(gulp.dest("./config"));
    } else { return; }
  });
});