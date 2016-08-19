
'use strict';
/**
 * 1. LESS编译 压缩 合并
 * 2. SASS编译 压缩 合并
 * 3. JS合并 压缩 混淆
 * 4. img压缩
 * 5. html压缩
 * 6. 代码实时监测
 **/

// 在gulpfile中先载入gulp包，因为这个包提供了一些API
var gulp = require('gulp');
var less = require('gulp-less');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync');
var imagemin = require('gulp-imagemin');
// 1. LESS编译压缩
gulp.task('less', function() {
  // 这里是在执行style任务时自动执行的
  gulp.src(['src/styles/*.less', '!src/styles/_*.less'])
    .pipe(less())
    .pipe(cssnano())
    .pipe(gulp.dest('dist/styles'))
    .pipe(browserSync.reload({
      stream: true
    }));
});
// 2. SASS编译压缩
gulp.task('sass', function () {
    return gulp.src('src/styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.reload({
            stream: true
        }));
});


// 3. JS合并 压缩混淆
gulp.task('script', function() {
  gulp.src('src/scripts/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// 4. 图片复制压缩
gulp.task('image',function(){
      gulp.src('src/images/*')
          .pipe(imagemin())
          .pipe(gulp.dest('dist/images'))
          .pipe(browserSync.reload({
            stream: true
          }));
});
// 5. HTML压缩
gulp.task('html', function() {
  gulp.src('src/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// 6. 代码实时监测
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: ['dist']
    },
  }, function(err, bs) {
    console.log(bs.options.getIn(["urls", "local"]));
  });
    gulp.watch('src/styles/*.less',['less']);
    gulp.watch('src/styles/*.scss',['sass']);
    gulp.watch('src/scripts/*.js',['script']);
    gulp.watch('src/images/*.*',['image']);
    gulp.watch('src/*.html',['html']);
});


//默认命令，在cmd中输入gulp后，执行的就是这个任务
gulp.task('default',['browserSync'],function() {
  //在控制台输入gulp，按回车，直接可以运行....
    gulp.start('less','sass','script','image','html');
});