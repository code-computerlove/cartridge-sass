// Tools
const merge = require('merge');

// PostCss plugins
const autoprefixer = require('autoprefixer');
const cssNano = require('cssnano');
const pxToRem = require('postcss-pxtorem');
const mqPacker = require('css-mqpacker');
const minifySelectors = require('postcss-minify-selectors');
const path = require('path');

const postCssConfig = {
	autoprefixer: {
		browsers: ['>5%']
	},
	mqpacker: {
		sort: true
	},
	pxtorem: {
		replace: false,
		rootValue: 16
	}
};

const postCssTaskConfig = {
	main: {}
};

function getPostCssPluginBuilder(baseConfig, projectConfig) {
	return taskName => {
		// Copy defaultConfig object
		const taskPostCssConfig = merge(baseConfig, postCssTaskConfig[taskName] || {});

		const postCssPlugins = [
			autoprefixer(taskPostCssConfig.autoprefixer),
			pxToRem(taskPostCssConfig.pxtorem),
			mqPacker(taskPostCssConfig.mqpacker),
			minifySelectors()
		];

		if (projectConfig.isProd) {
			if (taskPostCssConfig.cssNano) {
				postCssPlugins.push(cssNano(taskPostCssConfig.cssNano));
			} else {
				postCssPlugins.push(cssNano());
			}
		}

		return postCssPlugins;
	};
}

function getTaskConfig(projectConfig) {
	const sassPath = projectConfig.paths.src.sass;

	const taskConfig = {
		files: {
			main: {
				src: path.join(sassPath, 'main.scss'),
				partials: [
					path.join(sassPath, '_settings', '*.scss'),
					path.join(sassPath, '_tools', '_tools.mixins.scss'),
					path.join(sassPath, '_tools', '_tools.functions.scss'),
					path.join(sassPath, '_tools', '*.scss'),
					path.join(sassPath, '_scope', '*.scss'),
					path.join(sassPath, '_generic', '*.scss'),
					path.join(sassPath, '_elements', '*.scss'),
					path.join(sassPath, '_objects', '*.scss'),
					path.join(sassPath, '_components', '*.scss'),
					path.join(projectConfig.paths.src.components, '**', '*.scss'),
					path.join(sassPath, '_trumps', '*.scss')
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
					console: false
				}
			]
		},
		watch: [
			path.join(sassPath, '**', '*.scss'),
			path.join(projectConfig.paths.src.components, '**', '*.scss')
		],
		getPostCssPlugins: getPostCssPluginBuilder(postCssConfig, projectConfig)
	};

	return taskConfig;
}

module.exports = getTaskConfig;
