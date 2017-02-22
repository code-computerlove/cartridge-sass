var path = require('path');
var fs   = require('fs');

var MOCK_PROJECT_DIR   = path.join(process.cwd(), 'test', 'mock-project');
var GENERATED_CSS_FILE = path.join(MOCK_PROJECT_DIR, 'public', '_client', 'styles', 'main.css');
var GOLDMASTER_DIR     = path.join(process.cwd(), 'test', 'gold-master');

var IS_PROD = typeof process.env.USE_PROD !== 'undefined' && Boolean(parseInt(process.env.USE_PROD, 10));

process.chdir(MOCK_PROJECT_DIR);

var gulprunner = require(path.resolve(process.cwd(), 'gulprunner.js'));

function copyOverMaster(target) {
	return new Promise(function(resolve, reject) {
		var rd = fs.createReadStream(GENERATED_CSS_FILE);
		rd.on('error', rejectCleanup);
		var wr = fs.createWriteStream(target);
		wr.on('error', rejectCleanup);
		function rejectCleanup(err) {
			rd.destroy();
			wr.end();
			reject(err);
		}
		wr.on('finish', resolve);
		rd.pipe(wr);
	});
}

function updateMaster() {
	if(IS_PROD) {
		copyOverMaster(path.join(GOLDMASTER_DIR, 'prod.css'));
	} else {
		copyOverMaster(path.join(GOLDMASTER_DIR, 'dev.css'));
	}
}

if(IS_PROD) {
	gulprunner.setProd();
} else {
	gulprunner.setDev();
}

gulprunner.run(updateMaster);
