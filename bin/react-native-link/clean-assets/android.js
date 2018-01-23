// Used by react-native, is available (don't want to flood the package.json)
// eslint-disable-next-line
const fs = require('fs-extra');
const path = require('path');

/**
 * Copies each file from an array of assets provided to targetPath directory
 */
module.exports = function cleanAssetsAndroid(files = [], { path: assetPath }) {
  files.forEach(asset => (
    fs.removeSync(path.join(assetPath, path.basename(asset)))
  ));
};
