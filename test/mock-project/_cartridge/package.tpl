{
	"name": "<%= projectNameFileName %>",
	"version": "0.0.1",
	"description": "<%= projectDescription %>",
	"license": "ISC",
	"scripts": {
		"start": "gulp watch && gulp serve",
		"test": "mocha"
	},
	"dependencies": {
		"del": "^2.1.0",
		"gulp": "^3.8.11",
		"run-sequence": "^1.1.0",
		"yargs": "^3.18.0"
	},
	"devDependencies": {}
}
