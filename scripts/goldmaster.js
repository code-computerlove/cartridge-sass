const path = require('path');
const fs = require('fs');

const MOCK_PROJECT_DIR = path.join(process.cwd(), 'test', 'mock-project');
const GENERATED_CSS_FILE = path.join(MOCK_PROJECT_DIR, 'public', '_client', 'styles', 'main.css');
const GOLDMASTER_DIR = path.join(process.cwd(), 'test', 'gold-master');

const IS_PROD =
	typeof process.env.USE_PROD !== 'undefined' && Boolean(parseInt(process.env.USE_PROD, 10));

process.chdir(MOCK_PROJECT_DIR);

// Dynamic require needed for testing purposes
// eslint-disable-next-line import/no-dynamic-require
const gulprunner = require(path.resolve(process.cwd(), 'gulprunner.js'));

function copyOverMaster(target) {
	return new Promise((resolve, reject) => {
		const rd = fs.createReadStream(GENERATED_CSS_FILE);
		const wr = fs.createWriteStream(target);

		function rejectCleanup(err) {
			rd.destroy();
			wr.end();
			reject(err);
		}

		rd.on('error', rejectCleanup);
		wr.on('error', rejectCleanup);
		wr.on('finish', resolve);
		rd.pipe(wr);
	});
}

function updateMaster() {
	if (IS_PROD) {
		copyOverMaster(path.join(GOLDMASTER_DIR, 'prod.css'));
	} else {
		copyOverMaster(path.join(GOLDMASTER_DIR, 'dev.css'));
	}
}

if (IS_PROD) {
	gulprunner.setProd();
} else {
	gulprunner.setDev();
}

gulprunner.run(updateMaster);
