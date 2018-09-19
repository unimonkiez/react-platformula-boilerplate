const webpack = require('webpack');
const getWebpackConfig = require('./get-webpack-config');

const args = process.argv.slice(2);
const isWatching = args.indexOf('-w') !== -1;
const typeIndex = args.indexOf('--type');
const isDev = args.indexOf('--dev') !== -1;

const typeValue = args[typeIndex + 1];
const buildType = Number(typeValue);

const webpackConfig = getWebpackConfig({
  type: buildType,
  bail: !isWatching,
  isProd: !isDev,
});

const cb = (err, stats) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.warn(err);
    if (!isWatching) {
      process.exit(1);
    }
  } else {
    // eslint-disable-next-line no-console
    console.log('[webpack log]', stats.toString());
  }
};
if (isWatching) {
  webpack(webpackConfig).watch({}, cb);
} else {
  webpack(webpackConfig, cb);
}
