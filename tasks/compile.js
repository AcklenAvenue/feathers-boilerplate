var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("./tsconfig.json");

gulp.task('compile', ['lint'], () => {
     var tsResult = tsProject.src()
        .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('dist'));
});
