/* jshint node: true */

'use strict';

function getTaskConfig(config) {
	var taskConfig = {
		autoprefixer: {
			browsers: ['>5%']
		},
		mqpacker: {
			sort: true
		},
		pxtorem: {
			replace:   false,
			rootValue: 16
		},
		itcss: [
			config.paths.src.styles + '/_settings/*.scss',
			'!' + config.paths.src.styles + '/_settings/_settings.old-ie-8.scss',
			config.paths.src.styles + '/_tools/_tools.mixins.scss',
			config.paths.src.styles + '/_tools/_tools.functions.scss',
			config.paths.src.styles + '/_tools/*.scss',
			config.paths.src.styles + '/_scope/*.scss',
			config.paths.src.styles + '/_generic/*.scss',
			config.paths.src.styles + '/_elements/*.scss',
			config.paths.src.styles + '/_objects/*.scss',
			config.paths.src.styles + '/_components/*.scss',
			'views/_partials/**/*.scss',
			config.paths.src.styles + '/_trumps/*.scss'
		],
		src: projectConfig.paths.src.styles + 'main.scss',
		watch: [
			projectConfig.paths.src.styles + '**/*.scss',
			projectConfig.paths.src.components + '**/*.scss',
			config.paths.src.partials + '**/*.scss'
		]
	};

	return taskConfig;
}

module.exports = getTaskConfig;
