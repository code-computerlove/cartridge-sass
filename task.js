/* jshint node: true */

'use strict'; // jshint ignore:line

/* ============================================================ *\
	 STYLES / SCSS
\* ============================================================ */

const fs = require('fs-extra');

// Gulp dependencies
const sourcemaps = require('gulp-sourcemaps');
const gulpif     = require('gulp-if');
const path       = require('path');

// Sass dependencies
const sgc  = require('gulp-sass-generate-contents');
const sass = require('gulp-sass');

// CSS dependencies
const postcss         = require('gulp-postcss');
const stylelint       = require('gulp-stylelint');

const modulePath = path.resolve('node_modules', 'stylelint-config-standard');
const projectPath = path.resolve(__dirname, 'node_modules', 'stylelint-config-standard');

fs.ensureSymlinkSync(modulePath, projectPath, 'dir');

module.exports = function task(gulp, projectConfig, tasks) {
	/* --------------------
	*	CONFIGURATION
	* ---------------------*/

	var TASK_NAME = 'sass';

	// Task Config
	var taskConfig = require(path.resolve(process.cwd(), projectConfig.dirs.config, 'task.' + TASK_NAME + '.js'))(projectConfig);
	var sassTasksArr = [];

	/* --------------------
	*	MODULE TASKS
	* ---------------------*/

	Object.keys(taskConfig.files).forEach(function setupTasksFromConfig(key) {

		var generateContentsTaskName = TASK_NAME + ':generate-contents:' + key;
		var stylelintTaskName = TASK_NAME + ':lint:' + key;
		var sassCompileTaskName = TASK_NAME + ':' + key;

		gulp.task(stylelintTaskName, function stylelintTask() {
			return gulp.src(taskConfig.files[key].partials)
				.pipe(stylelint(taskConfig.stylelint));
		});

		gulp.task(generateContentsTaskName, function generateContentsTask() {
			return gulp.src(taskConfig.files[key].partials)
				.pipe(sgc(taskConfig.files[key].src, projectConfig.creds))
				.pipe(gulp.dest(projectConfig.paths.src[TASK_NAME]));
		});

		gulp.task(sassCompileTaskName, [stylelintTaskName, generateContentsTaskName], function sassTask() {
			return gulp.src(taskConfig.files[key].src)
				.pipe(gulpif(!projectConfig.isProd, sourcemaps.init())) //Default only
				.pipe(sass({
					errLogToConsole: true,
					includePaths:    [projectConfig.paths.src.components],
					outputStyle:     'compact'
				}).on('error', sass.logError))
				.pipe(postcss(taskConfig.getPostCssPlugins(key)))
				.pipe(gulpif(!projectConfig.isProd, sourcemaps.write('.'))) //Default only
				.pipe(gulp.dest(projectConfig.paths.dest[TASK_NAME]));
		});

		sassTasksArr.push(sassCompileTaskName);
	});

	gulp.task(TASK_NAME, sassTasksArr);

	/* --------------------
	*	WATCH TASKS
	* ---------------------*/

	Object.keys(taskConfig.files).forEach(function setupTasksFromConfig(key) {
		taskConfig.watch.push('!' + taskConfig.files[key].src);
	});

	gulp.task('watch:' + TASK_NAME, function watchTask() {
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
};
