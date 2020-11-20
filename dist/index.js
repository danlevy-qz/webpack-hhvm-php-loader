"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hhvmPhpLoader;

var _execa = _interopRequireDefault(require("execa"));

var _loaderUtils = require("loader-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
function verifyJson(jsonString) {
  JSON.parse(jsonString);
  return jsonString;
}

async function hhvmPhpLoader(source) {
  const options = (0, _loaderUtils.getOptions)(this);
  const query = this.resourceQuery && this.resourceQuery.length >= 1 ? (0, _loaderUtils.parseQuery)(this.resourceQuery) : {};
  const callback = this.async();
  const phpScript = this.resourcePath;
  const engine = query.engine || options.engine || 'hhvm';
  const parser = query.parser || options.parser || 'json';
  const timeout = query.timeout || options.timeout || 5000;

  try {
    const results = await (0, _execa.default)(engine, [phpScript], {
      timeout
    });
    let jsonString;

    if (results.failed) {
      throw new Error(`Failed to execute script '${phpScript}' ${JSON.stringify({
        error: true,
        exitCode: results.exitCode,
        stdout: results.stdout,
        stderr: results.stderr
      }, null, 2)}`);
    } else {
      jsonString = `${results.stdout}`.trim();
    }

    if (parser !== 'json') {
      // assume object or string - either way it'll be safely encoded.
      jsonString = JSON.stringify(jsonString);
    } else {
      try {
        // check if we have valid JSON, preserving the original input
        jsonString = verifyJson(jsonString).replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
      } catch (error) {
        // The value isn't proper JSON, wrap as a string
        // eslint-disable-next-line no-console
        // console.warn(`PHP Script emitted invalid JSON! ${phpScript}`, error);
        jsonString = JSON.stringify(jsonString);
      }
    }

    const esModule = typeof options.esModule !== 'undefined' ? options.esModule : true;
    callback(null, `${esModule ? 'export default' : 'module.exports ='} ${jsonString};`);
  } catch (error) {
    // this.emitError(error);
    callback(error);
  }

  return null;
}