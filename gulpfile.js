var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
//html
var htmlmin = require('gulp-htmlmin');
 //css
var cleanCSS = require('gulp-clean-css');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
//css mini
gulp.task('css', function() {
  return gulp.src('talentHome/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css/'));
});

//html
gulp.task('html', function() {
  return gulp.src('talentHome/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/'))
});
//static
gulp.task('copy:static',function(){
  gulp.src('talentHome/static/**/*')
  .pipe(rename(function(path){
    path.dirname +='';
  }))
  .pipe(gulp.dest('./dist/static/'))
});
gulp.task('copy:img', function() {
    gulp.src(['talentHome/**/**/*.png', 'talentHome/**/**/*.jpg'])
        .pipe(rename(function(path) {
            path.dirname += '';
        }))
        .pipe(gulp.dest("dist/"));
});
//clean
gulp.task('clean',function(){
  gulp.src('dist/',{
    read:false
  })
  .pipe(clean({
    force:true
  }));
});
//js
gulp.task('js',function(cb){
      pump([
        gulp.src(['talentHome/js/*.js']),
        uglify(),
        gulp.dest('dist/js/')
    ],
    cb
  );
});
//default
gulp.task('default',["js","css","copy:img","copy:static","html"]);



