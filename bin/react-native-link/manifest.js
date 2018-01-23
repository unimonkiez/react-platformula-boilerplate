// Used by react-native, is available (don't want to flood the package.json)
// eslint-disable-next-line
const fs = require('fs-extra');
const path = require('path');
const {
  ios: {
    path: iosPath,
  },
  android: {
    path: androidPath,
  },
} = require('./config');

const readManifest = folderPath => fs.readJsonSync(path.resolve(folderPath, 'link-assets-manifest.json'));
const writeManifest = (folderPath, obj) => fs.writeJsonSync(path.resolve(folderPath, 'link-assets-manifest.json'), obj);

module.exports = {
  ios: {
    read: () => readManifest(iosPath),
    write: obj => writeManifest(iosPath, obj),
  },
  android: {
    read: () => readManifest(androidPath),
    write: obj => writeManifest(androidPath, obj),
  },
};
