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
			projectConfig.paths.src.sass + '/_settings/*.scss',
			'!' + projectConfig.paths.src.sass + '/_settings/_settings.old-ie-8.scss',
			projectConfig.paths.src.sass + '/_tools/_tools.mixins.scss',
			projectConfig.paths.src.sass + '/_tools/_tools.functions.scss',
			projectConfig.paths.src.sass + '/_tools/*.scss',
			projectConfig.paths.src.sass + '/_scope/*.scss',
			projectConfig.paths.src.sass + '/_generic/*.scss',
			projectConfig.paths.src.sass + '/_elements/*.scss',
			projectConfig.paths.src.sass + '/_objects/*.scss',
			projectConfig.paths.src.sass + '/_components/*.scss',
			projectConfig.paths.src.sass + '/_trumps/*.scss'
		],
		src: projectConfig.paths.src.sass + 'main.scss',
		watch: [
			projectConfig.paths.src.sass + '**/*.scss',
			projectConfig.paths.src.components + '**/*.scss'
		]
	};

	return taskConfig;
}

module.exports = getTaskConfig;
