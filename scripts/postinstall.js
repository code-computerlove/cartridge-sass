'use strict';

var slateCli        = require('slateCli');
var config        = require('module_config');
var packageConfig = require('package.json');

var slateRcComplete       = false;
var projectConfigComplete = false;
var moduleConfigComplete  = false;

function isComplete() {
	return slateRcComplete && projectConfigComplete && moduleConfigComplete;
}

function taskComplete(flag, err, message) {
	if(err) {
		console.error('Error: ' + message);
		process.exit(1);
	}

	console.log('Finished: ' + message);

	flag = true;

	if(isComplete()) {
		finish();
	}
}

function finish() {
	console.log('Finished post install of ' + packageConfig.name);
	process.exit(0);
}

function startAddToRc() {
	var moduleConfig = {
		name:     packageConfig.name,
		version:  packageConfig.version
		taskFile: packageConfig.name + '/task.js'
	};

	console.log('Adding ' + packageConfig.name + ' to .slaterc');

	slateCli.addToSlaterc(moduleConfig, function finishAddToRc(err) {
		taskComplete(
			slateRcComplete,
			err,
			'when adding ' + packageConfig.name + ' to .slaterc'
		);
	});
}

function modifyProjectConfig(config) {
	config.paths.src.styles   = config.dirs.src  + '/styles/';
	config.paths.build.styles = config.dirs.build + '/styles/';

	return config;
}

function startProjectConfig() {
	slateCli.modifyProjectConfig(modifyProjectConfig, function finishProjectConfig(err) {
		taskComplete(
			projectConfigComplete,
			err,
			'when modifying project config'
		);
	});
}

function startModuleConfig() {
	console.log('Adding ' + packageConfig.name + ' configuration files to _config');

	slateCli.addModuleConfig(config.configFiles, function finishModuleconfig(err){
		taskComplete(
			moduleConfigComplete,
			err,
			'when adding module config'
		);
	});
}

startAddToRc();
startProjectConfig();
startModuleConfig();
