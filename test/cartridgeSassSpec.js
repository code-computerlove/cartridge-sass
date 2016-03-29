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

process.chdir(MOCK_PROJECT_DIR);

function runGulpTask(options, callback) {

    var gulp = spawn('gulp', options)

    gulp.on('close', function() {
        callback();
    });

}

function preSetup() {
	var packageJsonRoot = path.join(ROOT_DIR, 'package.json');
	var packageJsonMockProject = path.join(MOCK_PROJECT_DIR, 'package.json');

	var moduleConfigRoot = path.join(ROOT_DIR, '_config', 'task.sass.js');
	var moduleConfigMockProject = path.join(MOCK_PROJECT_DIR, '_config', 'task.sass.js');

	fs.copySync(packageJsonRoot, packageJsonMockProject);
	fs.copySync(moduleConfigRoot, moduleConfigMockProject);
}

describe('As a user of the cartridge-sass module', function() {

	this.timeout(10000);

	before(function(done) {
		preSetup();
		done();
	})

	describe('when `gulp sass` is run', function() {

		before(function(done) {
			runGulpTask(['sass'], done)
		})

		it('should generate the main.scss file in the _source dir', function() {
			var mainScssFilePath = path.join(STYLE_SRC_DIR, 'main.scss');

			expect(mainScssFilePath).to.be.a.file();
		})

		it('should compile the main.css file in the public styles folder', function() {
			var mainCssFilePath = path.join(STYLE_DEST_DIR, 'main.css');

			expect(mainCssFilePath).to.be.a.file();
		})

		it('should generate the the main.css.map sourcemap file in the public styles folder', function() {
			var mainCssSourceMapFilePath = path.join(STYLE_DEST_DIR, 'main.css.map');

			expect(mainCssSourceMapFilePath).to.be.a.file();
		})

	})

})