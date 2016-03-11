/* jshint node: true */

'use strict';

function getTaskConfig(projectConfig) {
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
			projectConfig.paths.src.styles + '/_settings/*.scss',
			'!' + projectConfig.paths.src.styles + '/_settings/_settings.old-ie-8.scss',
			projectConfig.paths.src.styles + '/_tools/_tools.mixins.scss',
			projectConfig.paths.src.styles + '/_tools/_tools.functions.scss',
			projectConfig.paths.src.styles + '/_tools/*.scss',
			projectConfig.paths.src.styles + '/_scope/*.scss',
			projectConfig.paths.src.styles + '/_generic/*.scss',
			projectConfig.paths.src.styles + '/_elements/*.scss',
			projectConfig.paths.src.styles + '/_objects/*.scss',
			projectConfig.paths.src.styles + '/_components/*.scss',
			'views/_partials/**/*.scss',
			projectConfig.paths.src.styles + '/_trumps/*.scss'
		],
		src: projectConfig.paths.src.styles + 'main.scss',
		watch: [
			projectConfig.paths.src.styles + '**/*.scss',
			projectConfig.paths.src.components + '**/*.scss',
			projectConfig.paths.src.partials + '**/*.scss'
		]
	};

	return taskConfig;
}

module.exports = getTaskConfig;
