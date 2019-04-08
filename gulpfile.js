const gulp = require('gulp');
const browserSync = require('browser-sync');
const $ = require('gulp-load-plugins')({
  pattern: ['*'],
  scope: ['devDependencies']
});

const scssOptions = { 
  outputStyle : 'expanded', 
  indentType : 'tab', 
  indentWidth : 1, 
  precision: 3, 
  sourceComments: false 
};

gulp.task('fileinclude', function () {
  return gulp.src(['src/template/index.html'], ['src/template/**/*.html'])
    .pipe($.fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.stream());
})

gulp.task('html', function () {
  return gulp.src('./src/template/*.html')
    .pipe(browserSync.stream());
})

gulp.task('css', function () {
  return gulp.src('src/scss/*.scss')
    .pipe($.sass(scssOptions).on('error', $.sass.logError))
    .pipe($.rename('style.css'))
    .pipe(gulp.dest('public'))
    .pipe(browserSync.stream());
})

gulp.task('watch', function () {
  gulp.watch(['src/template/*.html', 'src/template/layouts/*.html'], gulp.series('fileinclude'));
  gulp.watch('src/scss/*.scss', gulp.series('css'));
})

gulp.task('browserSync', gulp.parallel('fileinclude', 'css', function () {console.log('browser sync');
  browserSync({
    server: { 
      baseDir: 'public' 
    }
  })
}))

exports.default = gulp.parallel('browserSync', 'watch');