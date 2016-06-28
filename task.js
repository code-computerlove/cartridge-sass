'use strict';
/* ============================================================ *\
	 STYLES / SCSS
\* ============================================================ */

// Gulp dependencies
var sourcemaps = require('gulp-sourcemaps');
var gulpif     = require('gulp-if');
var path       = require('path');
var merge = require('merge');

// Sass dependencies
var sgc  = require('gulp-sass-generate-contents');
var sass = require('gulp-sass');

// CSS dependencies
var autoprefixer    = require('autoprefixer');
var postcss         = require('gulp-postcss');
var cssNano         = require('cssnano');
var pxToRem         = require('postcss-pxtorem');
var mqPacker        = require('css-mqpacker');
var minifySelectors = require('postcss-minify-selectors');

module.exports = function(gulp, projectConfig, tasks) {
	/* --------------------
	*	CONFIGURATION
	* ---------------------*/

	var TASK_NAME = 'sass';

	// Task Config
	var taskConfig = require(path.resolve(process.cwd(), projectConfig.dirs.config, 'task.' + TASK_NAME + '.js'))(projectConfig);
	var sassTasksArr = [];

	function getPostCssPlugins(fileConfig) {
		//Copy defaultConfig object
		var defaultConfig = merge(true, taskConfig.defaultConfig);
		var postCssConfig = merge(defaultConfig, fileConfig || {});
		var postCssPlugins = [
			autoprefixer(postCssConfig.autoprefixer),
			pxToRem(postCssConfig.pxtorem),
			mqPacker(postCssConfig.mqpacker),
			minifySelectors()
		];

		if(projectConfig.isProd) {
			if(postCssConfig.cssNano) {
				postCssPlugins.push(cssNano(postCssConfig.cssNano));
			} else {
				postCssPlugins.push(cssNano());
			}
		}

		return postCssPlugins;
	}


	Object.keys(taskConfig.files).forEach(function(key) {

		var generateContentsTaskName = TASK_NAME + ':generate-contents:' + key;
		var sassCompileTaskName = TASK_NAME + ':' + key;

		gulp.task(generateContentsTaskName, function () {
			return gulp.src(taskConfig.files[key].partials)
				.pipe(sgc(taskConfig.files[key].src, projectConfig.creds))
				.pipe(gulp.dest(projectConfig.paths.src[TASK_NAME]));
		});

		gulp.task(sassCompileTaskName, [generateContentsTaskName], function () {
			return gulp.src(taskConfig.files[key].src)
				.pipe(gulpif(!projectConfig.isProd, sourcemaps.init())) //Default only
				.pipe(sass({
					errLogToConsole: true,
					includePaths:    [projectConfig.paths.src.components],
					outputStyle:     'compact'
				}))
				.pipe(postcss(getPostCssPlugins(taskConfig.files[key].config)))
				.pipe(gulpif(!projectConfig.isProd, sourcemaps.write('.'))) //Default only
				.pipe(gulp.dest(projectConfig.paths.dest[TASK_NAME]));
		});

		sassTasksArr.push(sassCompileTaskName);
	});


	gulp.task(TASK_NAME, sassTasksArr);

	/* --------------------
	*	MODULE TASKS
	* ---------------------*/

	// gulp.task(TASK_NAME + '-generate-contents', function () {
	// 	return gulp.src(taskConfig.itcss)
	// 		.pipe(sgc(taskConfig.src, projectConfig.creds))
	// 		.pipe(gulp.dest(projectConfig.paths.src[TASK_NAME]));
	// });
	//
	// gulp.task(TASK_NAME, [TASK_NAME + '-generate-contents'], function () {
	// 	return gulp.src(taskConfig.src)
	// 		.pipe(gulpif(!projectConfig.isProd, sourcemaps.init())) //Default only
	// 		.pipe(sass({
	// 			errLogToConsole: true,
	// 			includePaths:    [projectConfig.paths.src.components],
	// 			outputStyle:     'compact'
	// 		}))
	// 		.pipe(postcss(getPostCssPlugins()))
	// 		.pipe(gulpif(!projectConfig.isProd, sourcemaps.write('.'))) //Default only
	// 		.pipe(gulp.dest(projectConfig.paths.dest[TASK_NAME]));
	// });

	/* --------------------
	*	WATCH TASKS
	* ---------------------*/

	gulp.task('watch:' + TASK_NAME, function () {
		gulp.watch(
			taskConfig.watch,
			[TASK_NAME]
		);
	});

	/* ----------------------------
	*	CARTRIDGE TASK MANAGEMENT
	* -----------------------------*/

	// Add the clean path for the generated styles
	projectConfig.cleanPaths.push(projectConfig.paths.dest[TASK_NAME]);
	// Add the task to the default list
	tasks.default.push(TASK_NAME);
	// Add the task to the watch list
	tasks.watch.push('watch:' + TASK_NAME);
}
