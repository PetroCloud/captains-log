var suites = require('./suites');
var fixtures = require('./fixtures');
var CaptainsLog = require('../');


describe('new CaptainsLog with no options', function () {
	before(function newLog() {
		this.log = new CaptainsLog();
	});

	// Because the basic log usage defaults to `debug`, the log should write to stderr.
	// This is because Winston writes the `debug` and `error` log levels to stderr.
	describe('log()', function () {
		suites.usage(fixtures.log._call, { stderr: 3, stdout: 0 });
	});

	// Winston writes the `debug` and `error` log levels to stderr.
	describe('log.debug()', function () {
		suites.usage(fixtures.log.debug, { stderr: 3, stdout: 0 });
	});
	describe('log.error()', function () {
		suites.usage(fixtures.log.error, { stderr: 3, stdout: 0 });
	});

	// Winston writes the rest of its logging methods to stdout
	describe('log.warn()', function () {
		suites.usage(fixtures.log.warn, { stderr: 0, stdout: 3 });
	});
	describe('log.info()', function () {
		suites.usage(fixtures.log.info, { stderr: 0, stdout: 3 });
	});


	// `verbose` and `silly` are disabled by default
	// (but they write to stdout)
	describe('log.verbose()', function () {
		suites.usage(fixtures.log.verbose, { stderr: 0, stdout: 0 });
	});
	describe('log.silly()', function () {
		suites.usage(fixtures.log.silly, { stderr: 0, stdout: 0 });
	});
});




