const fs = require('fs');
const path = require('path');
const copyAssetsIos = require('./copy-assets/ios');
const copyAssetsAndroid = require('./copy-assets/android');
// Used by react-native, is available (don't want to flood the package.json)
// eslint-disable-next-line
const log = require('npmlog');

const rootPath = path.resolve(__dirname, '..', '..');
const syncFileExtensions = {
  otf: {
    android: {
      path: path.resolve(rootPath, 'android', 'app', 'src', 'main', 'assets', 'fonts'),
    },
    ios: {
      addFont: true,
    },
  },
  mp3: {
    android: {
      path: path.resolve(rootPath, 'android', 'app', 'src', 'main', 'res', 'raw'),
    },
    ios: {
      addFont: false,
    },
  },
};

let assets = [];

try {
  assets = fs.readdirSync(path.resolve(rootPath, 'dist', 'link-asset'));
} catch (e) {
  throw e;
}

Object.keys(syncFileExtensions).forEach((fileExtension) => {
  const assetsWithExtension = assets.filter(asset => path.extname(asset) === `.${fileExtension}`);

  if (assetsWithExtension.length > 0) {
    log.info(`Linking ${fileExtension} assets to android project`);
    copyAssetsAndroid(assetsWithExtension, syncFileExtensions[fileExtension].android);
  }
});

