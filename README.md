[![npm][npm]][npm-url]

<!-- [![node][node]][node-url] -->
<!-- [![deps][deps]][deps-url] -->

[![tests][tests]][tests-url]

<!-- [![coverage][cover]][cover-url] -->
<!-- [![chat][chat]][chat-url] -->

[![size][size]][size-url]

# webpack-hhvm-php-loader

A loader for webpack that executes Hacklang/PHP scripts, returning their output as a String.

## Getting Started

To begin, you'll need to install `webpack-hhvm-php-loader`:

```shell
npm install webpack-hhvm-php-loader --save-dev
# Or
yarn add -D webpack-hhvm-php-loader
```

Then add the loader to your `webpack` config. For example:

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

### Example JS & PHP files

**users.php**

```php
<?hh
# Example PHP/Hacklang structure to export:
$user = array(
  'username' => 'justsml',
  'first_name' => 'Dan',
  'date_created' => '2020-12-01',
);

# Write JSON (cross-platform native object interface)
echo json_encode($user, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
```

**file.js**

```js
import jsonResults from './users.php';

console.log('username:', jsonResults.username);
```

And run `webpack` via your preferred method.

## Options

| Name                        |    Type     | Default | Description                                                |
| --------------------------- | :---------: | :-----: | :--------------------------------------------------------- |
| **[`esModule`](#esmodule)** | `{Boolean}` | `true`  | Uses ES modules syntax                                     |
| **[`timeout`](#timeout)**   | `{Number}`  | `5000`  | Number of milliseconds to wait before timing out           |
| **[`parser`](#parser)**     | `{String}`  | `json`  | Either `json` or `string` mode                             |
| **[`engine`](#engine)**     | `{String}`  | `hhvm`  | The executable to run your script with. Defaults to `hhvm` |

### `esModule`

Type: `Boolean`
Default: `true`

By default, `webpack-hhvm-php-loader` generates JS modules that use the ES modules syntax.
There are some cases in which using ES modules is beneficial, like in the case of [module concatenation](https://webpack.js.org/plugins/module-concatenation-plugin/) and [tree shaking](https://webpack.js.org/guides/tree-shaking/).

You can enable CommonJS module syntax using:

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

### Timeout

Type: `Number`
Default: `5000`

The script execution will timeout after `timeout` milliseconds elapses.

## Examples

### With Webpack Config

```js
import jsonResults from './users.php';

console.log('username:', jsonResults.username);
```

### Inline

```js
import jsonResults from 'webpack-hhvm-php-loader!./users.php';
```

Beware, if you already define loader(s) for extension(s) in `webpack.config.js` you should use:

```js
import jsonResults from '!!webpack-hhvm-php-loader!./users.php'; // Adding `!!` to a request will disable all loaders specified in the configuration
```

## License

[MIT](./LICENSE)

[npm]: https://img.shields.io/npm/v/webpack-hhvm-php-loader.svg
[npm-url]: https://npmjs.com/package/webpack-hhvm-php-loader

<!-- [node]: https://img.shields.io/node/v/webpack-hhvm-php-loader.svg -->
<!-- [node-url]: https://nodejs.org -->
<!-- [deps]: https://david-dm.org/danlevy-qz/webpack-hhvm-php-loader.svg -->
<!-- [deps-url]: https://david-dm.org/danlevy-qz/webpack-hhvm-php-loader -->

[tests]: https://github.com/danlevy-qz/webpack-hhvm-php-loader/workflows/webpack-hhvm-php-loader/badge.svg
[tests-url]: https://github.com/danlevy-qz/webpack-hhvm-php-loader/actions

<!-- [cover]: https://codecov.io/gh/danlevy-qz/webpack-hhvm-php-loader/branch/master/graph/badge.svg -->
<!-- [cover-url]: https://codecov.io/gh/danlevy-qz/webpack-hhvm-php-loader -->

[size]: https://packagephobia.now.sh/badge?p=webpack-hhvm-php-loader
[size-url]: https://packagephobia.now.sh/result?p=webpack-hhvm-php-loader
