'use strict';

var _DIR = '/';

var BASE_PATH    = 'slate-styles/';
var CONFIG_FILES = [
	'styles-config.json',
	'itcss.js'
];
var package     = require('./package.json');

require

var modulePrototype = {};

modulePrototype.getInfo = function getInfo() {
	return {
		name:    'Styles',
		version: package.version,
		task:    BASE_PATH + 'task.js'
	};
}

modulePrototype.getConfig = function getConfig() {
	return CONFIG_FILES;
};

modulePrototype.addToPath = function addToPath(config) {
	config.paths.src.styles   = config.dirs.src + _DIR + 'styles' + _DIR;
	config.paths.build.styles = config.dirs.build + _DIR + 'styles' + _DIR;

	return config;
};

modulePrototype.removeFromPath = function removeFromPath(config) {
	delete config.paths.src.styles;
	delete config.paths.build.styles;

	return config;
};

modulePrototype.addConfig = function addConfig(configPath, callback) {
	var i;
	var configCount = CONFIG_FILES.length;
	var copyCount   = 0;

	var copyComplete = function copyComplete(err) {
		if (err) return console.error(err);

		copyCount++;
		if(copyCount >=configCount) {
			callback();
		}
	};

	for(i = 0; i < configCount; i++) {
		fs.copy(CONFIG_FILES[i], configPath + CONFIG_FILES[i], copyComplete);
	}
};

modulePrototype.removeConfig = function addConfig(configPath, callback) {
	del(configPath + CONFIG_NAME).then(callback);
};

module.exports = modulePrototype;
