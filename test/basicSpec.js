/* eslint-env node, mocha */

const path = require('path');
const chai = require('chai');

// Waiting for older versions of node to drop off before using destructuring
// eslint-disable-next-line prefer-destructuring
const expect = chai.expect;

describe('As a gulpfile', () => {
	describe('when a task is included', () => {
		let basicrunner;

		before(done => {
			// Dynamic require needed for testing purposes and needs to be run here to be run in the context of the test
			// eslint-disable-next-line import/no-dynamic-require, global-require
			basicrunner = require(path.resolve(process.cwd(), 'basicrunner.js'));

			done();
		});

		it('should add one task to the default group', () => {
			expect(basicrunner.tasks.default.length).to.equal(1);
		});

		it('should add the sass task to the default group', () => {
			expect(basicrunner.tasks.default[0]).to.equal('sass');
		});

		it('should add one task to the watch group', () => {
			expect(basicrunner.tasks.watch.length).to.equal(1);
		});

		it('should add the watch:sass task to the watch group', () => {
			expect(basicrunner.tasks.watch[0]).to.equal('watch:sass');
		});

		it('should add one clean path to the clean config', () => {
			expect(basicrunner.config.cleanPaths.length).to.equal(1);
		});

		it('should add the generated styles path to the clean config', () => {
			const relative = path.relative(process.cwd(), basicrunner.config.cleanPaths[0]);
			expect(relative).to.equal(path.join('public', '_client', 'styles'));
		});

		it('should correctly register all tasks with the gulp instance', () => {
			expect(basicrunner.gulpTasks.length).to.equal(5);
		});

		it('shoud correctly register generate-contents task for each CSS file', () => {
			expect(basicrunner.gulpTasks).to.include('sass:generate-contents:main');
		});

		it('shoud correctly register base task for each CSS file', () => {
			expect(basicrunner.gulpTasks).to.include('sass:main');
		});
	});
});
