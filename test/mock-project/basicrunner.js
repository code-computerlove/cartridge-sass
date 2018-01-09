const path = require('path');

// Dynamic require needed for testing purposes
// eslint-disable-next-line import/no-dynamic-require
const config = require(path.resolve(process.cwd(), '_config/project.json'));
const mockGulp = {
	registeredTasks: [],
	task: function mockTask(taskName) {
		this.registeredTasks.push(taskName);
	}
};

config.cleanPaths = [];
// Dynamic require needed for testing purposes
// eslint-disable-next-line import/no-dynamic-require
config.creds = require(path.resolve(process.cwd(), '_config/creds.json'));
config.cleanPaths = [];
config.dirs.config = `${path.resolve('..', '..', config.dirs.config)}/`;

const tasks = {};
tasks.default = [];
tasks.watch = [];

// Dynamic require needed for testing purposes
// eslint-disable-next-line import/no-dynamic-require
require(path.resolve(process.cwd(), '..', '..', 'task.js'))(mockGulp, config, tasks);

module.exports = {
	gulpTasks: mockGulp.registeredTasks,
	tasks,
	config
};
