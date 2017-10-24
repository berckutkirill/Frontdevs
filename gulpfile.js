const gulp = require('gulp'),
			browserSync = require('browser-sync'),
			del = require('del'),
			mergeStream = require('merge-stream'),
			plumber = require('gulp-plumber'),
			sass = require('gulp-sass'),
			prefixer = require('gulp-autoprefixer'),
			pug = require('gulp-pug'),
			svgSprite = require('gulp-svg-sprite'),
			svgMin = require('gulp-svgmin'),
			cheerio = require('gulp-cheerio'),
			gulpif = require('gulp-if'),
			replace = require('gulp-replace');


gulp.task('sass', () => {
	return gulp.src('./source/sass/*.scss')
					.pipe(plumber())
					// .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
					.pipe(sass().on('error', sass.logError))
					.pipe(prefixer())
					.pipe(gulp.dest('./build/css'))
})

gulp.task('pug', () => {
	return gulp.src('./source/index.pug')
					.pipe(plumber())
					.pipe(pug({pretty: true}))
					.pipe(gulp.dest('./build'))
})

gulp.task('page', () => {
	return gulp.src('./source/card/*.pug')
					.pipe(plumber())
					.pipe(pug({pretty: true}))
					.pipe(gulp.dest('./build/card'))
})

gulp.task('copy', () => {
	let font,
			svg,
			js,
			img;

	font = gulp.src('./source/font/**/*.*', { since: gulp.lastRun('copy') })
					.pipe(gulp.dest('./build/font'));

	img = gulp.src('./source/img/**/*.*', { since: gulp.lastRun('copy') })
					.pipe(gulp.dest('./build/img'));

	data = gulp.src('./source/data/*.*', { since: gulp.lastRun('copy') })
					.pipe(gulp.dest('./build/data'));

	js = gulp.src('./source/js/**/*.*', { since: gulp.lastRun('copy') })
					.pipe(gulp.dest('./build/js'));

	return mergeStream(font, img, data, js);
})

gulp.task('svg-sprite', () => {
	return gulp.src('./source/svg/**/*.*')
          .pipe(plumber())
          .pipe(svgMin({
              js2svg: {
                  pretty: true
              }
          }))
          .pipe(cheerio({
              run: function ($) {
                  $('[fill]').removeAttr('fill');
                  $('[stroke]').removeAttr('stroke');
                  $('[style]').removeAttr('style');
              },
              pareserOption: {xmlMode: true}
          }))
          .pipe(replace('&gt;', '>'))
          .pipe(svgSprite({
              mode: {
                  symbol: {
                      sprite: '../sprite.svg',
                      render: {
                          scss: {
                              dest: '../svg_sprite.scss',
                              template: './source/sass/base/sprite_template.scss'
                          }
                      }
                  }
              }
          }))
          .pipe(gulpif('*.scss', gulp.dest('./source/sass/base'), gulp.dest('./build/svg')));
})

gulp.task('clean', () => {
	return del(['build']);
})

gulp.task('watch', () => {
	gulp.watch('./source/sass/**/*.scss', gulp.series('sass'));
	gulp.watch('./source/**/*.pug', gulp.series('pug', 'page'));
	gulp.watch('./source/js/**/*.js', gulp.series('copy'));
	gulp.watch('./source/data/**/*.json', gulp.series('copy'));
})

gulp.task('serve', () => {
	browserSync.init({
		open: false,
		server: './build',
		port: 5000
	});

	browserSync.watch('./build', browserSync.reload);
})

gulp.task('default', gulp.series(
	'clean',
	gulp.parallel('svg-sprite', 'copy', 'sass', 'pug', 'page'),
	gulp.parallel('watch', 'serve')
))


