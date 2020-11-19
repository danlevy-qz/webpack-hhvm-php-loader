[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]

# webpack-hhvm-php-loader

A loader for webpack that executes Hacklang/PHP scripts, returning their output as a String.

## Getting Started

To begin, you'll need to install `webpack-hhvm-php-loader`:

```console
$ npm install webpack-hhvm-php-loader --save-dev
```

Then add the loader to your `webpack` config. For example:

**file.js**

```js
import jsonResults from './file.php';
```

**webpack.config.js**

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.php.?$/i,
        use: 'webpack-hhvm-php-loader',
      },
    ],
  },
};
```

And run `webpack` via your preferred method.

## Options

|            Name             |    Type     | Default | Description            |
| :-------------------------: | :---------: | :-----: | :--------------------- |
| **[`esModule`](#esmodule)** | `{Boolean}` | `true`  | Uses ES modules syntax |

### `esModule`

Type: `Boolean`
Default: `true`

By default, `webpack-hhvm-php-loader` generates JS modules that use the ES modules syntax.
There are some cases in which using ES modules is beneficial, like in the case of [module concatenation](https://webpack.js.org/plugins/module-concatenation-plugin/) and [tree shaking](https://webpack.js.org/guides/tree-shaking/).

You can enable a CommonJS module syntax using:

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.php.?$/i,
        use: [
          {
            loader: 'webpack-hhvm-php-loader',
            options: {
              esModule: false,
            },
          },
        ],
      },
    ],
  },
};
```

## Examples

### Inline

```js
import jsonResults from 'webpack-hhvm-php-loader!./file.php';
```

Beware, if you already define loader(s) for extension(s) in `webpack.config.js` you should use:

```js
import jsonResults from '!!webpack-hhvm-php-loader!./file.php'; // Adding `!!` to a request will disable all loaders specified in the configuration
```

## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

[CONTRIBUTING](./.github/CONTRIBUTING.md)

## License

[MIT](./LICENSE)

[npm]: https://img.shields.io/npm/v/webpack-hhvm-php-loader.svg
[npm-url]: https://npmjs.com/package/webpack-hhvm-php-loader
[node]: https://img.shields.io/node/v/webpack-hhvm-php-loader.svg
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/webpack-contrib/webpack-hhvm-php-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/webpack-hhvm-php-loader
[tests]: https://github.com/webpack-contrib/webpack-hhvm-php-loader/workflows/webpack-hhvm-php-loader/badge.svg
[tests-url]: https://github.com/webpack-contrib/webpack-hhvm-php-loader/actions
[cover]: https://codecov.io/gh/webpack-contrib/webpack-hhvm-php-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/webpack-hhvm-php-loader
[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=webpack-hhvm-php-loader
[size-url]: https://packagephobia.now.sh/result?p=webpack-hhvm-php-loader
