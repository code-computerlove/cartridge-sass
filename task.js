'use strict';
/* ============================================================ *\
	 STYLES / SCSS
\* ============================================================ */

// Gulp dependencies
var sourcemaps = require('gulp-sourcemaps');
var gulpif     = require('gulp-if');
var rename     = require('gulp-rename');
var path       = require('path');

// Sass dependencies
var sgc  = require('gulp-sass-generate-contents');
var sass = require('gulp-sass');

// CSS dependencies
var autoprefixer = require('autoprefixer');
var postcss      = require('gulp-postcss');
var cssNano      = require('cssnano');
var pxToRem      = require('postcss-pxtorem');
var mqPacker     = require('css-mqpacker');

module.exports = function(gulp, projectConfig, tasks) {

	/* --------------------
	*	CONFIGURATION
	* ---------------------*/

	// Task Config
	var taskConfig = require(path.resolve(process.cwd(), projectConfig.dirs.config, 'task.sass.js'))(projectConfig);

	// Add the clean path for the generated styles
	projectConfig.cleanPaths.push(projectConfig.paths.dest.styles);

	var postCssPlugins = [
		autoprefixer(taskConfig.autoprefixer),
		pxToRem(taskConfig.pxtorem),
		mqPacker(taskConfig.mqpacker)
	];

	if(projectConfig.isProd) {
		plugins.push(cssNano());
	}

	/* --------------------
	*	MODULE TASKS
	* ---------------------*/

	gulp.task('sass-generate-contents', function () {
		return gulp.src(taskConfig.itcss)
			.pipe(sgc(projectConfig.paths.src.styles + 'main.scss', projectConfig.creds))
			.pipe(gulp.dest(projectConfig.paths.src.styles));
	});

	gulp.task('sass', ['sass-generate-contents'], function () {
		return gulp.src(taskConfig.src)
			.pipe(gulpif(!projectConfig.isProd, sourcemaps.init())) //Default only
			.pipe(sass({
				errLogToConsole: true,
				includePaths:    [projectConfig.paths.src.components],
				outputStyle:     'compact'
			}))
			.pipe(postcss(postCssPlugins))
			.pipe(gulpif(!projectConfig.isProd, sourcemaps.write('.'))) //Default only
			.pipe(gulp.dest(projectConfig.paths.dest.styles));
	});
	// Add the task to the default list
	tasks.default.push('sass');

	/* --------------------
	*	WATCH TASKS
	* ---------------------*/

	gulp.task('watch:sass', function () {
		gulp.watch(
			taskConfig.watch,
			['sass']
		);
	});
	// Add the task to the watch list
	tasks.watch.push('watch:sass');
}
