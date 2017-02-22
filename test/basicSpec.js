/*eslint-env node, mocha */
'use strict';

var path   = require('path');
var chai   = require('chai');
var expect = chai.expect;

describe('As a gulpfile', function asAGulpfile() {
	describe('when a task is included', function whenATaskIsIncluded() {
		var basicrunner;

		before(function beforeTests(done) {
			basicrunner = require(path.resolve(process.cwd(), 'basicrunner.js'));

			done();
		});

		it('should add one task to the default group', function shouldAddOneTaskToDefaultGroup() {
			expect(basicrunner.tasks.default.length).to.equal(1);
		});

		it('should add the sass task to the default group', function shouldAddSassTaskToDefaultGroup() {
			expect(basicrunner.tasks.default[0]).to.equal('sass');
		});

		it('should add one task to the watch group', function shouldAddOneTaskToWatchGroup() {
			expect(basicrunner.tasks.watch.length).to.equal(1);
		});

		it('should add the watch:sass task to the watch group', function shouldAddWatchTaskToGroup() {
			expect(basicrunner.tasks.watch[0]).to.equal('watch:sass');
		});

		it('should add one clean path to the clean config', function shouldAddOneCleanPathToCleanConfig() {
			expect(basicrunner.config.cleanPaths.length).to.equal(1);
		});

		it('should add the generated styles path to the clean config', function shouldAddGeneratedStylesPathToCleanConfig() {
			var relative = path.relative(process.cwd(), basicrunner.config.cleanPaths[0]);
			expect(relative).to.equal(path.join('public', '_client', 'styles'));
		});

		it('should correctly register all tasks with the gulp instance', function shouldRegisterTasksWithGulp() {
			expect(basicrunner.gulpTasks.length).to.equal(8);
		});

		it('shoud correctly register generate-contents task for each CSS file', function shoudRegisterGenerateTask() {
			expect(basicrunner.gulpTasks).to.include('sass:generate-contents:main');
			expect(basicrunner.gulpTasks).to.include('sass:generate-contents:ie8');
		});

		it('shoud correctly register base task for each CSS file', function shoudRegisterBaseTask() {
			expect(basicrunner.gulpTasks).to.include('sass:main');
			expect(basicrunner.gulpTasks).to.include('sass:ie8');
		});
	});
});
