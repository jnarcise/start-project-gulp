const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// Compile scss into css
function style() {
	// 1. where is my scss file
	return gulp.src('./scss/**/*.scss')
		// 2. pass that file through the sass compiler
		.pipe(sass().on('error', sass.logError))
		// 3. where do I save the compiled CSS?
		.pipe(gulp.dest('./src/assets/css'))
		// 4. stream changes to all browsers
		.pipe(browserSync.stream());
}

function watch() {
	browserSync.init({
		server:  {
			baseDir: './src/'
		}
	});
	gulp.watch('./scss/**/*.scss', style);
	gulp.watch('./src/*.html').on('change', browserSync.reload);
	gulp.watch('./src/assets/js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;