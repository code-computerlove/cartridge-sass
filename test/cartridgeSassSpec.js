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

function runGulpTask(options, callback) {

	var gulp = spawn('gulp', options)

	gulp.on('close', function() {
		callback();
	});
}

describe('As a user of the cartridge-sass module', function() {

	this.timeout(10000);

	describe('when `gulp sass` is run WITHOUT production flag', function() {

		before(function(done) {
			runGulpTask(['sass'], done)
		})

		after(function() {
			cleanUp();
		})

		it('should generate the main.scss file in the _source dir', function() {
			expect(MAIN_SCSS_FILEPATH).to.be.a.file();
		})

		it('should add the main.css file to the public styles folder', function() {
			expect(MAIN_CSS_FILEPATH).to.be.a.file();
		})

		it('should add the main.css.map sourcemap file to the public styles folder', function() {
			expect(MAIN_CSS_SOURCEMAP_FILEPATH).to.be.a.file();
		})

	})

	describe('when `gulp sass` is run WITH production flag', function() {

		before(function(done) {
			runGulpTask(['sass', '--prod'], done)
		})

		after(function() {
			cleanUp();
		})

		it('should generate the main.scss file in the _source dir', function() {
			expect(MAIN_SCSS_FILEPATH).to.be.a.file();
		})

		it('should add the main.css file to the public styles folder', function() {
			expect(MAIN_CSS_FILEPATH).to.be.a.file();
		})

		it('should add the main.css.map sourcemap file to the public styles folder', function() {
			expect(MAIN_CSS_SOURCEMAP_FILEPATH).to.be.a.file();
		})

	})

})
