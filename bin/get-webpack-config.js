const BUILD_TYPE = require('./build-type');
const webpack = require('webpack');
const path = require('path');
const packageJson = require('../package.json');

const nodeExternals = require('webpack-node-externals');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extensions = ['.js', '.jsx'];
const rootPath = path.join(__dirname, '..');

/**
 * Getter for webpack config for all the different kind of builds there is in this repo
 * @param  {Object} options        Passed from building, starting and testing the application
 * @return {Object}                Webpack config object
 */
module.exports = ({
  type = BUILD_TYPE.web,
  isWebpackDevServer = false,
  isProd = true,
  bail = false,
} = {}) => {
  let deviceExtensions;
  let entryPrefix;
  let outputPath;
  switch (type) {
    default:
    case BUILD_TYPE.web:
      deviceExtensions = extensions.map(extension => `.web${extension}`);
      entryPrefix = `app${isProd ? '.min' : ''}`;
      outputPath = path.join(rootPath, 'web', 'dist');
      break;
    case BUILD_TYPE.ios:
      deviceExtensions = extensions.map(extension => `.ios${extension}`);
      entryPrefix = 'index.ios';
      outputPath = path.join(rootPath, 'dist');
      break;
    case BUILD_TYPE.android:
      deviceExtensions = extensions.map(extension => `.android${extension}`);
      entryPrefix = 'index.android';
      outputPath = path.join(rootPath, 'dist');
      break;
  }

  return ({
    bail,
    devtool: 'source-map',
    entry: {
      [entryPrefix]: []
        .concat(isWebpackDevServer ? ['webpack-hot-middleware/client'] : [])
        .concat(path.join(rootPath, 'src', 'index')),
    },
    output: {
      path: outputPath,
      filename: '[name].js',
      libraryTarget: 'umd',
    },
    plugins: [
      new webpack.DefinePlugin({
        __PROD__: JSON.stringify(isProd),
        __DEV__: JSON.stringify(!isProd),
        __DEVSERVER__: JSON.stringify(isWebpackDevServer),
        __DEVTOOLS__: JSON.stringify(isWebpackDevServer),
        __IOS__: JSON.stringify(type === BUILD_TYPE.ios),
        __ANDROID__: JSON.stringify(type === BUILD_TYPE.android),
        __WEB__: JSON.stringify(type === BUILD_TYPE.web),
        __VERSION__: JSON.stringify(packageJson.version),
        'process.env': {
          NODE_ENV: JSON.stringify(isProd ? 'production' : 'development'),
        },
      }),
    ]
      .concat(type === BUILD_TYPE.web ? [
        new HtmlWebpackPlugin({
          minify: {},
          template: path.join(rootPath, 'src', 'web', 'index.html'),
          inject: 'body',
        }),
      ] : [])
      .concat(isWebpackDevServer ? [
        new webpack.HotModuleReplacementPlugin(),
      ] : [])
      .concat(isProd ? [
        new webpack.optimize.UglifyJsPlugin({
          output: {
            comments: false,
          },
        }),
      ] : []),
    module: {
      rules: []
        .concat([
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: ['env', 'stage-2'],
                  plugins: ['transform-runtime', 'transform-decorators-legacy'],
                },
              },
            ],
          },
          {
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: ['env', 'stage-2', 'react'].concat(isWebpackDevServer ? ['react-hmre'] : []),
                  plugins: ['transform-runtime', 'transform-decorators-legacy'],
                },
              },
            ],
          },
          {
            test: /\.html$/,
            use: [
              {
                loader: 'html-loader',
                options: {
                  attrs: [
                    'img:src',
                    'link:href',
                  ],
                },
              },
            ],
          },
          {
            test: /\.(ttf|eot|otf|woff|woff2)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: './font/[hash].[ext]',
                },
              },
            ],
          },
          {
            test: /\.svg$/,
            use: [
              {
                loader: path.resolve(__dirname, 'loader', 'svg'),
              },
            ].concat((
              ([BUILD_TYPE.ios, BUILD_TYPE.android].indexOf(type) !== -1) ?
                [
                  {
                    loader: 'react-native-svg-loader',
                  },
                ] : [
                  {
                    loader: 'raw-loader',
                  },
                ]
            )),
          },
          {
            test: /\.(gif|png|jpg|mp3)$/,
            issuer: /\.html$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: './asset/[hash].[ext]',
                },
              },
            ],
          },
          {
            test: /\.(gif|png|jpg|mp3)$/,
            issuer: file => (!/\.html$/.test(file)),
            use: ([BUILD_TYPE.ios, BUILD_TYPE.android].indexOf(type) !== -1) ?
              [
                {
                  loader: 'string-replace-loader',
                  options: {
                    multiple: [
                      { search: '__webpack_public_path__ + "', replace: 'require(\'' },
                      { search: '";', replace: '\');' },
                    ],
                  },
                },
                {
                  loader: 'file-loader',
                  options: {
                    name: './build-asset/[hash].[ext]',
                  },
                },
              ] :
              [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 10000,
                    name: './asset/[hash].[ext]',
                  },
                },
              ],
          },
        ]),
    },
    resolve: {
      extensions: []
        .concat(deviceExtensions)
        .concat(extensions),
      modules: [
        rootPath,
        path.join(rootPath, 'node_modules'),
      ],
    },
    externals: []
      .concat(nodeExternals({
        modulesDir: path.join(rootPath, 'node_modules'),
      }))
      .concat((
        /*
        Ignore require that start with build-asset
        Copied to dist by webpack, will be handled by react-native packager
      */
        (context, request, callback) => {
          const foundExternal = request.indexOf('./build-asset/') === 0;
          if (foundExternal) {
            return callback(null, `commonjs ${request}`);
          }
          callback();
          return undefined;
        }
      )),
  });
};
