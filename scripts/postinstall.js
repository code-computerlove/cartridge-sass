'use strict';

// Package config
var packageConfig = require('../package.json');

// Node utils
var cartridgeUtil = require('cartridge-module-util')(packageConfig);
var path          = require('path');

var TASK_NAME = 'sass';

// Transform function for adding paths
function projectConfigAddPaths(config) {
	if(!config.paths.src.hasOwnProperty(TASK_NAME)) {
		config.paths.src[TASK_NAME]  = config.dirs.src  + '/styles/';
	}

	if(!config.paths.dest.hasOwnProperty(TASK_NAME)) {
		config.paths.dest[TASK_NAME]  = config.dirs.dest  + '/styles/';
	}

	return config;
}

// Exit is NODE_ENV is development
cartridgeUtil.exitIfDevEnvironment();
// Make sure that the .cartridgerc file exists
cartridgeUtil.ensureCartridgeExists();
// Run through the project setup
cartridgeUtil.addToRc()
	.then(() => cartridgeUtil.modifyProjectConfig(projectConfigAddPaths))
	.then(() => cartridgeUtil.addModuleConfig(path.resolve('_config', 'task.' + TASK_NAME + '.js')))
	.then(() => {
		return cartridgeUtil.copyToProjectDir([{
			copyPath: '_source/styles',
			destinationPath: '_source'
		}]);
	})
	.then(() => {
		return cartridgeUtil.copyToProjectDir([{
			copyPath: '.stylelintrc.json'
		}]);
	})
	.then(() => {
		return cartridgeUtil.copyToProjectDir([{
			copyPath: '.stylelint.log'
		}]);
	})
	.then(() => {
		return cartridgeUtil.copyToProjectDir([{
			copyPath: '.stylelintignore'
		}]);
	})
	.then(cartridgeUtil.finishInstall);
