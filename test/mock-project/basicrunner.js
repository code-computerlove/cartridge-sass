'use strict';

var path = require('path');

var config        = require(path.resolve(process.cwd(), '_config/project.json'));
var mockGulp = {
	registeredTasks: [],
	task: function mockTask(taskName){
		this.registeredTasks.push(taskName);
		return;
	}
};

config.cleanPaths  = [];
config.creds       = require(path.resolve(process.cwd(), '_config/creds.json'));
config.cleanPaths  = [];
config.dirs.config = path.resolve('..', '..', config.dirs.config) + '/';

var tasks     = {};
tasks.default = [];
tasks.watch   = [];

require(path.resolve(process.cwd(), '..', '..', 'task.js'))(mockGulp, config, tasks);

module.exports = {
	gulpTasks: mockGulp.registeredTasks,
	tasks:  tasks,
	config: config
};
