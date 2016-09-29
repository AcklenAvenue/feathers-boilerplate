const gulp = require('gulp');
const tslint = require("gulp-tslint");
const eslint = require('gulp-eslint');

gulp.task('lint', ['tslint', 'eslint']);

gulp.task("tslint", () =>
    gulp.src("src/**/*.ts")
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report())
);



gulp.task('eslint', () => {
    return gulp.src(['src/**/*.js','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
