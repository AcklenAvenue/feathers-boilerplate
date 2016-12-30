const gulp = require('gulp');
const zip = require('gulp-zip');

const environment = process.env.ENVIRONMENT || 'dev';
const appName = 'indigo-backend';

gulp.task('zip-app', () => {
  return gulp.src([
			'./dist/**/*.*',
      './.ebextensions/**/*.*'
      ,'package.json'
      ,'gulpfile.js'
      ,'./tasks/**/*.*'
      ,'tsconfig.json'
      ,'./config/**/*.*'
      ,'./public/**/*.*'
      ,'default.json.default'
      ,'yarn.lock'

    ], {
      base: './'
    })
    .pipe(zip(`${appName}-${environment}.zip`))
    .pipe(gulp.dest('./zip'));
});

gulp.task('prepare-deployment', () => {
  return gulp.src([
			'./dist/**/*.*',
      ,'package.json'
      ,'gulpfile.js'
      ,'./tasks/**/*.*'
      ,'tsconfig.json'
      ,'./config/**/*.*'
      ,'./public/**/*.*'
      ,'default.json.default'
    ], {
      base: './'
    })
    .pipe(gulp.dest('./build'));
});
