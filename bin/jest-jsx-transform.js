module.exports = require('babel-jest').createTransformer({
  presets: ['env', 'stage-2', 'react'],
  plugins: ['transform-decorators-legacy'],
});
