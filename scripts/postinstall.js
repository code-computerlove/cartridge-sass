// Package config
const packageConfig = require('../package.json');

// Node utils
const cartridgeUtil = require('cartridge-module-util')(packageConfig);
const path = require('path');

const TASK_NAME = 'sass';

// Transform function for adding paths
function projectConfigAddPaths(originalConfig) {
	const config = originalConfig;

	if (!Object.prototype.hasOwnProperty.call(config.paths.src, TASK_NAME)) {
		config.paths.src[TASK_NAME] = `${config.dirs.src}/styles/`;
	}

	if (!Object.prototype.hasOwnProperty.call(config.paths.dest, TASK_NAME)) {
		config.paths.dest[TASK_NAME] = `${config.dirs.dest}/styles/`;
	}

	return config;
}

// Exit is NODE_ENV is development
cartridgeUtil.exitIfDevEnvironment();
// Make sure that the .cartridgerc file exists
cartridgeUtil.ensureCartridgeExists();
// Run through the project setup
cartridgeUtil
	.addToRc()
	.then(() => cartridgeUtil.modifyProjectConfig(projectConfigAddPaths))
	.then(() => cartridgeUtil.addModuleConfig(path.resolve('_config', `task.${TASK_NAME}.js`)))
	.then(() =>
		cartridgeUtil.copyToProjectDir([
			{
				copyPath: '_source/styles',
				destinationPath: '_source'
			}
		])
	)
	.then(() =>
		cartridgeUtil.copyToProjectDir([
			{
				copyPath: '.stylelintrc.json'
			}
		])
	)
	.then(() =>
		cartridgeUtil.copyToProjectDir([
			{
				copyPath: '.stylelint.log'
			}
		])
	)
	.then(() =>
		cartridgeUtil.copyToProjectDir([
			{
				copyPath: '.stylelintignore'
			}
		])
	)
	.then(cartridgeUtil.finishInstall);
