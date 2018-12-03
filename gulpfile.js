var gulp = require('gulp'),
	pug = require('gulp-pug'),
	sass = require('gulp-sass'),
	browserSync = require("browser-sync"),
	plumber = require("gulp-plumber"),
	prettyHtml = require("gulp-pretty-html");

gulp.task('pug', function buildHTML() {
	return gulp.src('app/*.pug')
		.pipe(pug())
		.pipe(gulp.dest("app/"))
});

gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('pug', function() {
	return gulp.src('app/pug/*.pug')
		.pipe(pug())
		.pipe(prettyHtml({ indent_size: 2, extra_liners:[] }))
		.pipe(gulp.dest('app'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task("sass", function () {
	gulp
		.src("app/scss/**/*.scss")
		.pipe(plumber())
		.pipe(sass({outputStyle: "expanded"}))
		.pipe(gulp.dest("app/css"))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['browser-sync', 'sass', 'pug'], function () {
	gulp.watch('app/scss/*.+(sass|scss)', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch("app/pug/*.pug", ['pug']);
});

gulp.task('build', function () {
	gulp.src('app/css/*.css')
		.pipe(gulp.dest('build/css'));
	gulp.src('app/*.html')
		.pipe(gulp.dest('build'));
});