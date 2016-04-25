// Gulp
var gulp = require('gulp');
var path = require('path');

// Tasks
var tasks         = {};
tasks.default     = [];
tasks.watch       = [];

// Config
var config        = require(path.resolve(process.cwd(), '_config/project.json'));

config.cleanPaths = [];
config.creds      = require(path.resolve(process.cwd(), '_config/creds.json'));

config.isProd               = false;
config.isWatched            = false;
config.dirs.config             = path.resolve('..', '..', config.dirs.config) + '/';
config.dirs.src             = path.resolve(process.cwd(), config.dirs.src) + '/';
config.dirs.dest            = path.resolve(process.cwd(), config.dirs.dest) + '/';
config.paths.src.components = path.resolve(process.cwd(), config.paths.src.components) + '/';
config.paths.src.sass       = path.resolve(process.cwd(), config.paths.src.sass);
config.paths.dest.sass      = path.resolve(process.cwd(), config.paths.dest.sass) + '/';

require(path.resolve(process.cwd(), '..', '..', 'task.js'))(gulp, config, tasks);

module.exports = {
	setProd: function(){
		config.isProd = true;
	},
	setDev: function(){
		config.isProd = false;
	},
	run: function(callback) {
		gulp.start('sass', function(){
			callback();
		});
	}
};
