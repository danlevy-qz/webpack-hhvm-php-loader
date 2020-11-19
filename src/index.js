/* eslint-disable no-unused-vars */
import execa from 'execa';
import { getOptions } from 'loader-utils';
// import { validate } from 'schema-utils';

// import schema from './options.json';

export default async function rawLoader(source) {
  const options = getOptions(this);
  const callback = this.async();
  const phpScript = this.resourcePath;

  // validate(schema, options, {
  //   name: 'HHVM PHP Loader',
  //   baseDataPath: 'options',
  // });
  try {
    const results = await execa('hhvm', [phpScript], { timeout: 4000 });

    const json = JSON.stringify(results.stdout)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

    const esModule =
    typeof options.esModule !== 'undefined' ? options.esModule : true;

    callback(null, `${esModule ? 'export default' : 'module.exports ='} ${json};`);
  } catch (error) {
    callback(error);
  }

  return null;
}
