/*eslint-env node, mocha */
'use strict';

var path   = require('path');
var fs     = require('fs-extra');
var chai   = require('chai');
var expect = chai.expect;

chai.use(require('chai-fs'));
chai.should();

var MOCK_PROJECT_DIR = path.join(process.cwd(), 'test', 'mock-project');
var STYLE_SRC_DIR    = path.join(MOCK_PROJECT_DIR, '_source', 'styles');
var STYLE_DEST_DIR   = path.join(MOCK_PROJECT_DIR, 'public', '_client', 'styles');

var SCSS_LINTER_FILEPATH = path.join(MOCK_PROJECT_DIR, '.stylelint.log');

var MAIN_SCSS_FILEPATH          = path.join(STYLE_SRC_DIR, 'main.scss');
var MAIN_CSS_FILEPATH           = path.join(STYLE_DEST_DIR, 'main.css');
var MAIN_CSS_SOURCEMAP_FILEPATH = path.join(STYLE_DEST_DIR, 'main.css.map');

process.chdir(MOCK_PROJECT_DIR);

var gulprunner = require(path.resolve(process.cwd(), 'gulprunner.js'));

function cleanUp() {
	fs.remove(MAIN_SCSS_FILEPATH);
	fs.remove(MAIN_CSS_FILEPATH);
	fs.remove(MAIN_CSS_SOURCEMAP_FILEPATH);
	fs.remove(SCSS_LINTER_FILEPATH);
}

function assertGoldMaster(generatedPath, master) {
	var goldMasterPath = path.resolve(path.join('../', 'gold-master', master));
	var goldMaster     = fs.readFileSync(goldMasterPath, 'utf8');
	var generated      = fs.readFileSync(generatedPath, 'utf8');

	expect(goldMaster).to.equal(generated);
}

describe('As a user of the cartridge-sass module', function AsCartridgeSassUser() {

	this.timeout(10000);

	describe('when `gulp sass` is run WITHOUT production flag', function whenRunWithoutProdFlag() {

		before(function beforeTests(done) {
			cleanUp();
			gulprunner.setDev();
			gulprunner.run(done);
		});

		after(cleanUp);

		it('should generate the main.scss file in the _source dir', function shouldGenerateMainScssFile() {
			expect(MAIN_SCSS_FILEPATH).to.be.a.file();
		});

		it('should add the main.css file to the public styles folder', function shouldAddMainFileToPublic() {
			expect(MAIN_CSS_FILEPATH).to.be.a.file();
		});

		it('should add the main.css.map sourcemap file to the public styles folder', function shouldAddMainSourcemapToPublic() {
			expect(MAIN_CSS_SOURCEMAP_FILEPATH).to.be.a.file();
		});

		it('should generate valid css that passes the linter', function shouldGenerateValidCss() {
			expect(SCSS_LINTER_FILEPATH).to.be.a.file().and.empty;
		});

		it('should generate the correct css', function shouldGenerateTheCorrectCss() {
			assertGoldMaster(MAIN_CSS_FILEPATH, 'dev.css');
		});

	});

	describe('when `gulp sass` is run WITH production flag', function whenRunWithProdFLag() {

		before(function beforeTests(done) {
			cleanUp();
			gulprunner.setProd();
			gulprunner.run(done);
		});

		after(cleanUp);

		it('should generate the main.scss file in the _source dir', function shouldGenerateMainScssFile() {
			expect(MAIN_SCSS_FILEPATH).to.be.a.file();
		});

		it('should add the main.css file to the public styles folder', function shouldAddFileToPublic() {
			expect(MAIN_CSS_FILEPATH).to.be.a.file();
		});

		it('should not add the main.css.map sourcemap file to the public styles folder', function shouldNotAddMainSourcemap() {
			expect(MAIN_CSS_SOURCEMAP_FILEPATH).to.not.be.a.path();
		});

		it('should generate valid css that passes the linter', function shouldGenerateValidCss() {
			expect(SCSS_LINTER_FILEPATH).to.be.a.file().and.empty;
		});

		it('should generate the correct css', function shouldGenerateCorrectCss() {
			assertGoldMaster(MAIN_CSS_FILEPATH, 'prod.css');
		});

	});

});
