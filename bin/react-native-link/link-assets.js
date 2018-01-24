const fs = require('fs');
const path = require('path');
const copyAssetsIos = require('./copy-assets/ios');
const cleanAssetsIos = require('./clean-assets/ios');
const copyAssetsAndroid = require('./copy-assets/android');
const cleanAssetsAndroid = require('./clean-assets/android');
const manifest = require('./manifest');
// Used by react-native, is available (don't want to flood the package.json)
// eslint-disable-next-line
const log = require('npmlog');
const {
  rootPath,
  android: {
    path: androidPath,
  },
} = require('./config');

const syncFileExtensions = {
  ttf: {
    android: {
      path: path.resolve(androidPath, 'app', 'src', 'main', 'assets', 'fonts'),
    },
    ios: {
      addFont: true,
    },
  },
  mp3: {
    android: {
      path: path.resolve(androidPath, 'app', 'src', 'main', 'res', 'raw'),
    },
    ios: {
      addFont: false,
    },
  },
};

let prevIosAssets = [];
try {
  prevIosAssets = manifest.ios.read();
} catch (e) {
  // ok
}
let prevAndroidAssets = [];
try {
  prevAndroidAssets = manifest.android.read();
} catch (e) {
  // ok
}

let assets = [];

try {
  const assetsFolderPath = path.resolve(rootPath, 'dist', 'link-asset');
  assets = fs.readdirSync(assetsFolderPath).map(file => path.resolve(assetsFolderPath, file));
} catch (e) {
  // ok
}

Object.keys(syncFileExtensions).forEach((fileExtension) => {
  const assetsWithExtension = assets.filter(asset => path.extname(asset) === `.${fileExtension}`);
  const iosAssetsWithExtension = prevIosAssets.filter(asset => path.extname(asset) === `.${fileExtension}`);
  const androidAssetsWithExtension = prevAndroidAssets.filter(asset => path.extname(asset) === `.${fileExtension}`);

  if (iosAssetsWithExtension.length > 0) {
    log.info(`Cleaning previously linked ${fileExtension} assets from ios project`);
    cleanAssetsIos(iosAssetsWithExtension, syncFileExtensions[fileExtension].ios);
  }
  if (androidAssetsWithExtension.length > 0) {
    log.info(`Cleaning previously linked ${fileExtension} assets from android project`);
    cleanAssetsAndroid(androidAssetsWithExtension, syncFileExtensions[fileExtension].android);
  }
  if (assetsWithExtension.length > 0) {
    log.info(`Linking ${fileExtension} assets to android project`);
    copyAssetsAndroid(assetsWithExtension, syncFileExtensions[fileExtension].android);

    log.info(`Linking ${fileExtension} assets to ios project`);
    copyAssetsIos(assetsWithExtension, syncFileExtensions[fileExtension].ios);
  }
});

manifest.ios.write(assets);
manifest.android.write(assets);
