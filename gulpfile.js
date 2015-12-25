var gulp = require('gulp')
var cssmin = require('gulp-minify-css')
var uglify = require('gulp-uglify')
var plumber = require('gulp-plumber')
var replace = require('gulp-replace')
var header = require('gulp-header')
var connect = require('gulp-connect')
var del = require('del')
var path = require('path')

var port = process.env.PORT || 8080
var reloadPort = process.env.RELOAD_PORT || 35729

var date = new Date()

var banner = 
'/*!' + '\n' +
' * LastModifyTime: ' + date.toLocaleString()  + '\n' +
' * Copyright(c) 2015 JXM'  + '\n' +
' */\n'

var year = date.getFullYear()
var month = date.getMonth() + 1
var theDate = date.getDate()
var hour = date.getHours()
var minutes = date.getMinutes()
var dataString = [ 
    year,
    month > 10 ? month : '0' + month,
    theDate > 10 ? theDate : '0' + theDate,
    hour > 10 ? hour : '0' + hour,
    minutes > 10 ? minutes : '0' + minutes
].join('')

var packCss = function(src, dest) {
    return gulp.src(src)
        .pipe(cssmin())
        .pipe(gulp.dest(dest))
}

var packJs = function(src, dest) {
    return gulp.src(src)
        .pipe(plumber())
        .pipe(replace(/\${\s*version\s*}/g, dataString))
        .pipe(uglify({
            mangle: {
                except: ['$super', '$', 'exports', 'require', 'module']
            }
        }))
        .pipe(header(banner))
        .pipe(gulp.dest(dest))
}

var packImg = function(src, dest) {
    return gulp.src(src)
        .pipe(plumber())
        .pipe(gulp.dest(dest))
}

var packHtml = function(src, dest) {
    return gulp.src(src)
        .pipe(plumber())
        .pipe(replace(/\.css\b/g, '.css?v=' + dataString))
        .pipe(replace(/\.js\b/g, '.js?v=' + dataString))
        .pipe(gulp.dest(dest))
}

gulp.task('clean', function(cb) {
    del('./dest', cb)
})

gulp.task('pack-css', ['clean'], function() {
    return packCss('./css/**/*.css', './dest/css')
})

gulp.task('pack-js', ['clean'], function() {
    return packJs('./js/jxm/**/*.js', './dest/js/jxm')
})
gulp.task('pack-js-1', ['clean'], function() {
    return packJs('./js/*.js', './dest/js')
})
gulp.task('pack-js-2', ['clean'], function() {
    return packJs('./js/zrender/**/*.js', './dest/js/zrender')
})
gulp.task('pack-js-3', ['clean'], function() {
    return packJs('./js/zrender/*.js', './dest/js/zrender')
})
gulp.task('pack-js-4', ['clean'], function() {
    return packJs('./js/App/**/*.js', './dest/js/App')
})
gulp.task('pack-lib', ['clean'], function() {
    return gulp.src('./js/hih5/*.js')
        .pipe(gulp.dest('./dest/js/hih5'))
})

gulp.task('pack-img', ['clean'], function() {
    return packImg('./images/**/*', './dest/images')
})

gulp.task('pack-html', ['clean'], function() {
    return packHtml('./index.html', './dest')
})

gulp.task('serve', ['pack-css', 'pack-js', 'pack-img', 'pack-html', 'pack-lib','pack-js-1','pack-js-2','pack-js-3','pack-js-4'], function () {
  connect.server({
    port: port,
    livereload: {
      port: reloadPort
    }
  })
})

gulp.task('default', ['serve'], function() {
    gulp.watch(['./css/**/*.css', './js/**/*.js', './images/**/*', './*.html'], function(event) {
        var extname = path.extname(event.path)
        var dest = path.dirname(event.path).replace('JXM', 'JXM' + path.sep + 'dest')
        if (/html/.test(extname)) {
            packHtml(event.path, dest)
        } else if (/css/.test(extname)) {
            packCss(event.path, dest)
        } else if (/js/.test(extname)) {
            packJs(event.path, dest)
        } else if (/jpg|jpeg|png|gif/i.test(extname)) {
            packImg(event.path, dest)
        }
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    })
})
