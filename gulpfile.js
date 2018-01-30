//  ПЕРЕМЕННЫЕ Эти пакеты должны быть установленны
var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    less = require('gulp-less'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'), //чинит наши трубы
    pug = require('gulp-pug');

// SERVER
gulp.task('server',['less','pug'],function(){
	browserSync.init({
		server: { baseDir: "./app/"}
	});
	// Автоматическое обновление
	gulp.watch('./app/**/*.html').on('change',browserSync.reload);
	gulp.watch('./app/**/*.js').on('change',browserSync.reload);
	// gulp.watch('./app/**/*.css').on('change',browserSync.reload); Вместо этого добавим .pipe(browserSync.stream()); в LESS
	gulp.watch('./app/less/*.less',['less']); // компилируем less
	gulp.watch('./app/less/**/*.less',['less']); // компилируем less
	gulp.watch('./app/pug/*.pug',['pug']); // компилируем less
	gulp.watch('./app/pug/**/*.pug',['pug']); // компилируем less
});

// LESS // STREAM BROWSER // NOTIFY PLUMBER
gulp.task('less', function(){
	return gulp.src('./app/less/*.less')
		.pipe(plumber({
			errorHandler: notify.onError(function(err){
				return{
					title: 'Styles',
					message: err.message
				}
			})
		}))
		.pipe(less())
		.pipe(gulp.dest('./app/css'))
		.pipe(browserSync.stream()); // Экономит время на больших сайтах (изменение происходит быстрей)	
});

// PUG
gulp.task('pug', function(){
	return gulp.src('./app/pug/*.pug')
		.pipe(plumber({
			errorHandler: notify.onError(function(err){
				return{
					title: 'Pug',
					message: err.message
				}
			})
		}))
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('./app'))
		.pipe(browserSync.stream()); // Экономит время на больших сайтах (изменение происходит быстрей)	
});

gulp.task('default',['server']);