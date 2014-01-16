/**
 * Module dependencies.
 */

var _ = require('lodash'),
	util = require('util');



/**
 * Build a log function which combines arguments into a string,
 * enhancing them for readability.  If specified, prefixes will be
 * added.
 *
 * @param  {Function} [log fn]
 * @param  {String} levelOfLogFn [e.g. 'silly' or 'error']
 * @param  {Object} options
 * @return {Function} [enhanced log fn]
 * @api private
 */

module.exports = function (logFn, levelOfLogFn, options) {
	return function _writeLogToConsole() {

		// TODO:
		// check `options.level` against levelOfLogFn
		// to see whether to write the log

		
		var args = Array.prototype.slice.call(arguments);

		// If `options.inspect` is disabled, just call the log fn normally
		if (!options.inspect) {
			return logFn.apply(logFn, args);
		}

		// Compose `str` of all the arguments
		// (include the appropriate prefix if specified)
		var pieces = [];
		var str = (options.prefixes && options.prefixes[levelOfLogFn]) || '';
		_.each(arguments, function(arg) {
			if (typeof arg === 'object') {
				if (arg instanceof Error) {
					pieces.push(arg.stack);
					return;
				}
				pieces.push(util.inspect(arg));
				return;
			}

			if (typeof arg === 'function') {
				pieces.push(arg.valueOf());
				return;
			}

			pieces.push(arg);
		});
		str = pieces.join(' ');

		// Call log fn
		return logFn.apply(logFn, [str]);
	};
};