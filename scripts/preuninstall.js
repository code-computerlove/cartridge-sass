'use strict';

// Package config
var packageConfig = require('../package.json');

// Node utils
var cartridgeUtil = require('cartridge-module-util')(packageConfig);
var path          = require('path');

var TASK_NAME = 'sass';

// Run through module uninstallation
cartridgeUtil.removeFromRc(packageConfig.name)
	.then(function runRemoveModuleConfig() {
		return cartridgeUtil.removeModuleConfig(path.resolve('_config', 'task.' + TASK_NAME + '.js'));
	})
	.then(function runRemoveStylelintRc() {
		return cartridgeUtil.removeFromProjectDir([
			'.stylelintrc.json',
			'.stylelint.log',
			'.stylelintignore'
		]);
	})
	.then(cartridgeUtil.finishUninstall)
