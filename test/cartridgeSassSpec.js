var spawn = require('child_process').spawn;
var path = require('path');
var fs = require('fs-extra');
var chai = require('chai');
var expect = chai.expect;

chai.use(require('chai-fs'));
chai.should();

var ROOT_DIR = process.cwd();
var MOCK_PROJECT_DIR = path.join(process.cwd(), 'test', 'mock-project');
var STYLE_SRC_DIR = path.join(MOCK_PROJECT_DIR, '_source', 'styles');
var STYLE_DEST_DIR = path.join(MOCK_PROJECT_DIR, 'public', '_client', 'styles');

var MAIN_SCSS_FILEPATH = path.join(STYLE_SRC_DIR, 'main.scss');
var MAIN_CSS_FILEPATH = path.join(STYLE_DEST_DIR, 'main.css');
var MAIN_CSS_SOURCEMAP_FILEPATH = path.join(STYLE_DEST_DIR, 'main.css.map');

process.chdir(MOCK_PROJECT_DIR);

function cleanUp() {
	fs.remove(MAIN_SCSS_FILEPATH);
	fs.remove(MAIN_CSS_FILEPATH);
	fs.remove(MAIN_CSS_SOURCEMAP_FILEPATH);
}

function getConfig() {
	var testPath      = path.resolve(process.cwd(), '_config');
	var config        = require(path.resolve(testPath, 'project.json'));
	config.creds      = require(path.resolve(testPath, 'creds.json'));
	config.cleanPaths = [];

	return config;
}

function getTasks() {
	var tasks     = {};
	tasks.default = [];
	tasks.watch   = [];

	return tasks;
}

describe('As a gulpfile', function() {
	describe('when a task is included', function() {
		var tasks;
		var config;

		before(function(done) {
			config = getConfig();
			config.dirs.config = config.dirs.config;

			tasks = getTasks();

			require(path.resolve(process.cwd(), '..', '..', 'task.js'))({task: function(){}}, config, tasks);

			done();
		});

		it('should add one task to the default group', function() {
			expect(tasks.default.length).to.equal(1);
		});

		it('should add the sass task to the default group', function() {
			expect(tasks.default[0]).to.equal('sass');
		});

		it('should add one task to the watch group', function() {
			expect(tasks.watch.length).to.equal(1);
		});

		it('should add the watch:sass task to the watch group', function() {
			expect(tasks.watch[0]).to.equal('watch:sass');
		});

		it('should add one clean path to the clean config', function() {
			expect(config.cleanPaths.length).to.equal(1);
		});

		it('should add the generated styles path to the clean config', function() {
			expect(config.cleanPaths[0]).to.equal('public/_client/styles/');
		});
	});
})

describe('As a user of the cartridge-sass module', function() {
	var gulprunner = require(path.resolve(process.cwd(), 'gulprunner.js'));

	this.timeout(10000);

	describe('when `gulp sass` is run WITHOUT production flag', function() {

		before(function(done) {
			gulprunner.setDev();
			gulprunner.run(function(){
				done();
			});
		});

		after(function() {
			cleanUp();
		});

		it('should generate the main.scss file in the _source dir', function() {
			expect(MAIN_SCSS_FILEPATH).to.be.a.file();
		});

		it('should add the main.css file to the public styles folder', function() {
			expect(MAIN_CSS_FILEPATH).to.be.a.file();
		});

		it('should add the main.css.map sourcemap file to the public styles folder', function() {
			expect(MAIN_CSS_SOURCEMAP_FILEPATH).to.be.a.file();
		});

	})

	describe('when `gulp sass` is run WITH production flag', function() {

		before(function(done) {
			gulprunner.setProd();
			gulprunner.run(function(){
				done();
			});
		});

		after(function() {
			cleanUp();
		});

		it('should generate the main.scss file in the _source dir', function() {
			expect(MAIN_SCSS_FILEPATH).to.be.a.file();
		});

		it('should add the main.css file to the public styles folder', function() {
			expect(MAIN_CSS_FILEPATH).to.be.a.file();
		});

		it('should not add the main.css.map sourcemap file to the public styles folder', function() {
			console.log('before test');
			expect(MAIN_CSS_SOURCEMAP_FILEPATH).to.not.be.a.file();
		});

	});

});
