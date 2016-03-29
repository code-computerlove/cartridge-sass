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

describe('As a user of the cartridge-sass module', function() {

	this.timeout(10000);

	describe('when `gulp sass` is run', function() {

		before(function(done) {
			runGulpTask(['sass'], done)
		})

		it('should generate the main.scss file in the _source dir', function() {
			var mainScssFilePath = path.join(STYLE_SRC_DIR, 'main.scss');

			expect(mainScssFilePath).to.be.a.file();
		})

		it('should add the main.css file to the public styles folder', function() {
			var mainCssFilePath = path.join(STYLE_DEST_DIR, 'main.css');

			expect(mainCssFilePath).to.be.a.file();
		})

		it('should add the main.css.map sourcemap file to the public styles folder', function() {
			var mainCssSourceMapFilePath = path.join(STYLE_DEST_DIR, 'main.css.map');

			expect(mainCssSourceMapFilePath).to.be.a.file();
		})

	})

})