/* eslint-env node, mocha */

const path = require('path');
const fs = require('fs-extra');
const chai = require('chai');

// Waiting for older versions of node to drop off before using destructuring
// eslint-disable-next-line prefer-destructuring
const expect = chai.expect;

chai.use(require('chai-fs'));

chai.should();

const MOCK_PROJECT_DIR = path.join(process.cwd(), 'test', 'mock-project');
const STYLE_SRC_DIR = path.join(MOCK_PROJECT_DIR, '_source', 'styles');
const STYLE_DEST_DIR = path.join(MOCK_PROJECT_DIR, 'public', '_client', 'styles');

const SCSS_LINTER_FILEPATH = path.join(MOCK_PROJECT_DIR, '.stylelint.log');

const MAIN_SCSS_FILEPATH = path.join(STYLE_SRC_DIR, 'main.scss');
const MAIN_CSS_FILEPATH = path.join(STYLE_DEST_DIR, 'main.css');
const MAIN_CSS_SOURCEMAP_FILEPATH = path.join(STYLE_DEST_DIR, 'main.css.map');

process.chdir(MOCK_PROJECT_DIR);

// Dynamic require needed for testing purposes
// eslint-disable-next-line import/no-dynamic-require
const gulprunner = require(path.resolve(process.cwd(), 'gulprunner.js'));

function cleanUp() {
	fs.remove(MAIN_SCSS_FILEPATH);
	fs.remove(MAIN_CSS_FILEPATH);
	fs.remove(MAIN_CSS_SOURCEMAP_FILEPATH);
	fs.remove(SCSS_LINTER_FILEPATH);
}

function assertGoldMaster(generatedPath, master) {
	const goldMasterPath = path.resolve(path.join('../', 'gold-master', master));
	const goldMaster = fs.readFileSync(goldMasterPath, 'utf8');
	const generated = fs.readFileSync(generatedPath, 'utf8');

	expect(goldMaster).to.equal(generated);
}

describe('As a user of the cartridge-sass module', function AsCartridgeSassUser() {
	this.timeout(10000);

	describe('when `gulp sass` is run WITHOUT production flag', () => {
		before(done => {
			cleanUp();
			gulprunner.setDev();
			gulprunner.run(done);
		});

		after(cleanUp);

		it('should generate the main.scss file in the _source dir', () => {
			expect(MAIN_SCSS_FILEPATH).to.be.a.file();
		});

		it('should add the main.css file to the public styles folder', () => {
			expect(MAIN_CSS_FILEPATH).to.be.a.file();
		});

		it('should add the main.css.map sourcemap file to the public styles folder', () => {
			expect(MAIN_CSS_SOURCEMAP_FILEPATH).to.be.a.file();
		});

		it('should generate valid css that passes the linter', () => {
			// Expression syntaxt is how chai works in this instance
			// eslint-disable-next-line no-unused-expressions
			expect(SCSS_LINTER_FILEPATH).to.be.a.file().and.empty;
		});

		it('should generate the correct css', () => {
			assertGoldMaster(MAIN_CSS_FILEPATH, 'dev.css');
		});
	});

	describe('when `gulp sass` is run WITH production flag', () => {
		before(done => {
			cleanUp();
			gulprunner.setProd();
			gulprunner.run(done);
		});

		after(cleanUp);

		it('should generate the main.scss file in the _source dir', () => {
			expect(MAIN_SCSS_FILEPATH).to.be.a.file();
		});

		it('should add the main.css file to the public styles folder', () => {
			expect(MAIN_CSS_FILEPATH).to.be.a.file();
		});

		it('should not add the main.css.map sourcemap file to the public styles folder', () => {
			expect(MAIN_CSS_SOURCEMAP_FILEPATH).to.not.be.a.path();
		});

		it('should generate valid css that passes the linter', () => {
			// Expression syntaxt is how chai works in this instance
			// eslint-disable-next-line no-unused-expressions
			expect(SCSS_LINTER_FILEPATH).to.be.a.file().and.empty;
		});

		it('should generate the correct css', () => {
			assertGoldMaster(MAIN_CSS_FILEPATH, 'prod.css');
		});
	});
});
