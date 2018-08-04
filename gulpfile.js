'use strict';

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

var swallowError = function(error){
    console.log(error.toString());
}

/* CSS */
gulp.task('css', function(){
    return gulp.src('less/style.less')
        .pipe(plugins.less())
        .on('error', swallowError)
        .pipe(plugins.autoprefixer({ browsers: 'last 3 versions' }))
        .pipe(plugins.cssnano())
        .pipe(gulp.dest('css/'));
});

/* Watch */
gulp.task('watch', function(){
    gulp.watch('less/**/*.less', gulp.parallel('css'));
});

/* Default */
gulp.task('default', gulp.parallel('css'));

/* Development */
gulp.task('dev', gulp.parallel('css', 'watch'));
