var gulp = require('gulp'),
    webserver = require('gulp-webserver');

gulp.task('webserver', function() {
  gulp.src('')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true,
      fallback: 'index.html'
    }));
});


// gulp.task('watch', function(){
//     gulp.watch('index.html', [webserver]);
// });


gulp.task('default', ['webserver']);