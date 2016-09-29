const gulp = require('gulp');
const zip = require('gulp-zip');

gulp.task('zip-app', () => {
  return gulp.src(['./config/**/*.*',
      './public/**/*.*',
      './src/**/*.*',
      './test/**/*.*',
			'./*.*'
    ], {
      base: './'
    })
    .pipe(zip(`${appName}-${environment}.zip`))
    .pipe(gulp.dest('./dist'));
});
