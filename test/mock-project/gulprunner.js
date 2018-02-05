// Gulp

const gulp = require('gulp');
const path = require('path');

// Tasks
const tasks = {};
tasks.default = [];
tasks.watch = [];

// Config
// Dynamic require needed for testing purposes
// eslint-disable-next-line import/no-dynamic-require
const config = require(path.resolve(process.cwd(), '_config/project.json'));

config.cleanPaths = [];
// Dynamic require needed for testing purposes
// eslint-disable-next-line import/no-dynamic-require
config.creds = require(path.resolve(process.cwd(), '_config', 'creds.json'));

config.isProd = false;
config.isWatched = false;
config.dirs.config = `${path.resolve('..', '..', config.dirs.config)}/`;
config.dirs.src = `${path.resolve(process.cwd(), config.dirs.src)}/`;
config.dirs.dest = `${path.resolve(process.cwd(), config.dirs.dest)}/`;
config.paths.src.components = `${path.resolve(process.cwd(), config.paths.src.components)}/`;
config.paths.src.sass = path.resolve(process.cwd(), config.paths.src.sass);
config.paths.dest.sass = `${path.resolve(process.cwd(), config.paths.dest.sass)}/`;

// Dynamic require needed for testing purposes
// eslint-disable-next-line import/no-dynamic-require
require(path.resolve(process.cwd(), '..', '..', 'task.js'))(gulp, config, tasks);

module.exports = {
	setProd: function setProd() {
		config.isProd = true;
	},
	setDev: function setDev() {
		config.isProd = false;
	},
	run: function run(callback) {
		gulp.start('sass', () => {
			callback();
		});
	}
};
