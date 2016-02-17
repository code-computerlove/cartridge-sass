module.exports = function(config){
		return [
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
		];
};
