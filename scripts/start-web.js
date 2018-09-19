const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const getWebpackConfig = require('./get-webpack-config');
const app = require('../web/app');

const port = 8090;
const start = () => {
  app.listen(port, (err) => {
    if (err) {
      throw err;
    }
    // eslint-disable-next-line no-console
    console.log(`Listening at localhost:${port}`);
  });
};

const webpackConfig = getWebpackConfig({
  isWebpackDevServer: true,
  isProd: false,
});

const webpackCompiler = webpack(webpackConfig);
const webpackDevMiddlewareInstance = webpackMiddleware(
  webpackCompiler,
  {
    publicPath: '',
    noInfo: false,
    quiet: false,
  },
);
const webpackHotMiddlewareInstance = webpackHotMiddleware(webpackCompiler, {
  log: console.log,
  heartbeat: 3 * 1000,
});

app.use(webpackDevMiddlewareInstance);
app.use(webpackHotMiddlewareInstance);
// webpackDevMiddlewareInstance.waitUntilValid(cb);

start();
