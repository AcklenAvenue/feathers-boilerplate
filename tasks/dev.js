const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

gulp.task('dev', function () {
  nodemon({
    script: './dist/index.js',
    ext: 'ts js',
    task: ['compile'],
    ignore: ['dist/', 'gulpfile.js', 'tasks/']
  })
})
