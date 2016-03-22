'use strict';

// Package config
var packageConfig = require('../package.json');

// Node utils
var cartridgeUtil = require('cartridge-module-util')(packageConfig);
var path          = require('path');

// Transform function for adding paths
function projectConfigAddPaths(config) {
	config.paths.src.styles   = config.dirs.src  + '/styles/';
	config.paths.dest.styles = config.dirs.dest + '/styles/';

	return config;
}

// Make sure that the .cartridgerc file exists
cartridgeUtil.ensureCartridgeExists();
// Run through the project setup
cartridgeUtil.addToRc()
	.then(function() {
		return cartridgeUtil.modifyProjectConfig(projectConfigAddPaths);
	})
	.then(function(){
		return cartridgeUtil.addModuleConfig(path.resolve('_config', 'task.sass.js'));
	})
	.then(cartridgeUtil.finishInstall);
