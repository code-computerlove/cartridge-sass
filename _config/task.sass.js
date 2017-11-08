'use strict';

// PostCss plugins
const autoprefixer = require('autoprefixer');
const cssNano = require('cssnano');
const pxToRem = require('postcss-pxtorem');
const mqPacker = require('css-mqpacker');
const minifySelectors = require('postcss-minify-selectors');

const postCssConfig = {
	autoprefixer: {
		browsers: ['>5%'],
	},
	mqpacker: {
		sort: true,
	},
	pxtorem: {
		replace: false,
		rootValue: 16,
	}
};

function getTaskConfig(projectConfig) {

	var taskConfig = {
		files: {
			main: {
				src: projectConfig.paths.src.sass + '/main.scss',
				partials: [
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
					projectConfig.paths.src.components + '**/*.scss',
					projectConfig.paths.src.sass + '/_trumps/*.scss',
				]
			}
		},
		stylelint: {
			syntax: 'scss',
			failAfterError: false,
			reporters: [
				{
					formatter: 'string',
					save: './.stylelint.log',
					console: false,
				}
			]
		},
		watch: [
			projectConfig.paths.src.sass + '**/*.scss',
			projectConfig.paths.src.components + '**/*.scss',
		],
		getPostCssPlugins
	};

	function getPostCssPlugins() {

		var postCssPlugins = [
			autoprefixer(postCssConfig.autoprefixer),
			pxToRem(postCssConfig.pxtorem),
			mqPacker(postCssConfig.mqpacker),
			minifySelectors(),
		];

		if (projectConfig.isProd) {
			if (postCssConfig.cssNano) {
				postCssPlugins.push(cssNano(postCssConfig.cssNano));
			} else {
				postCssPlugins.push(cssNano());
			}
		}

		return postCssPlugins;
	}

	return taskConfig;
}

module.exports = getTaskConfig;
