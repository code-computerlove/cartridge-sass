'use strict';

var quarry = require('quarry');

if(!quarry.hasSlate()) {
	console.error('Slate is not set up in this directory. Please set it up first before installing this module');
	process.exit(1);
}
