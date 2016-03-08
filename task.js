'use strict';
/* ============================================================ *\
	 STYLES / SCSS
\* ============================================================ */

// Gulp dependencies
var gulp       = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var gulpif     = require('gulp-if')
var rename     = require('gulp-rename');
var path       = require('path');

// Sass dependencies
var sgc  = require('gulp-sass-generate-contents');
var sass = require('gulp-sass');

// CSS dependencies
var autoprefixer = require('autoprefixer');
var postcss      = require('gulp-postcss');
var pixrem       = require('pixrem');
var cssNano      = require('cssnano');
var mqPacker     = require('css-mqpacker');

module.exports = function(config, cartridgeSettings, creds) {
	var activeDir = path.resolve(process.cwd());

	// Config
	var itcss        = require(path.resolve(activeDir, config.dirs.config, 'itcss.js'))(config);
	var stylesConfig = require(path.resolve(activeDir, config.dirs.config, 'styles-config.json'));

	var sassConfig = {
		errLogToConsole: true,
		includePaths:    [config.paths.src.components],
		outputStyle:     'compact'
	};

	function getPostCssPlugins(browsers) {
		var plugins = [
			autoprefixer({
				browsers: browsers
			}),
			pixrem({
				rootValue: config.pixelBase
			}),
			mqPacker({
				sort: true
			})
		];

		if(config.isProd) {
			plugins.push(cssNano());
		}

		return plugins;
	}

	gulp.task('sass-generate-contents', function () {
		return gulp.src(itcss)
			.pipe(sgc(config.paths.src.styles + 'main.scss', creds))
			.pipe(gulp.dest(config.paths.src.styles));
	});

	gulp.task('sass', ['sass-generate-contents'], function () {
		return gulp.src(config.paths.src.styles + 'main.scss')
			.pipe(gulpif(!config.isProd, sourcemaps.init())) //Default only
			.pipe(sass(sassConfig))
			.pipe(postcss(getPostCssPlugins(stylesConfig.browsers.normal)))
			.pipe(gulpif(!config.isProd, sourcemaps.write('.'))) //Default only
			.pipe(gulp.dest(config.paths.dest.styles));
	});

	gulp.task('sass:legacy:ie8', function () {
		return gulp.src(config.paths.src.styles + 'ie8.scss')
			.pipe(sass(sassConfig))
			.pipe(postcss(getPostCssPlugins(stylesConfig.browsers.ie8)))
			.pipe(gulp.dest(config.paths.dest.styles));
	});

	gulp.task('watch:sass', function () {
		gulp.watch(
			[config.paths.src.styles + '**/*.scss', config.paths.src.components + '**/*.scss', config.paths.src.partials + '**/*.scss'],
			['sass', 'sass:legacy:ie8']
		);
	});
	cartridgeSettings.tasks.watch.push('watch:sass');

}
