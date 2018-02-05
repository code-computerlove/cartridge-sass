// Package config
const packageConfig = require('../package.json');

// Node utils
const cartridgeUtil = require('cartridge-module-util')(packageConfig);
const path = require('path');

const TASK_NAME = 'sass';

// Run through module uninstallation
cartridgeUtil
	.removeFromRc(packageConfig.name)
	.then(() => cartridgeUtil.removeModuleConfig(path.resolve('_config', `task.${TASK_NAME}.js`)))
	.then(() =>
		cartridgeUtil.removeFromProjectDir(['.stylelintrc.json', '.stylelint.log', '.stylelintignore'])
	)
	.then(cartridgeUtil.finishUninstall);
