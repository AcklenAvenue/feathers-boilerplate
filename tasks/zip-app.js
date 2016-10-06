const gulp = require('gulp');
const zip = require('gulp-zip');

const environment = process.env.ENVIRONMENT || 'dev';
const appName = 'indigo-backend';

gulp.task('zip-app', () => {
  return gulp.src([
			'./dist/**/*.*','./.ebextensions/**/*.*','package.json'
    ], {
      base: './'
    })
    .pipe(zip(`${appName}-${environment}.zip`))
    .pipe(gulp.dest('./zip'));
});
