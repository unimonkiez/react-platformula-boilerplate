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

let iosAssets = [];

try {
  const assetsFolderPath = path.resolve(rootPath, 'dist', 'ios', 'link-asset');
  iosAssets = fs.readdirSync(assetsFolderPath)
    .map(file => path.resolve(assetsFolderPath, file));
} catch (e) {
  // ok
}
let androidAssets = [];

try {
  const assetsFolderPath = path.resolve(rootPath, 'dist', 'android', 'link-asset');
  androidAssets = fs.readdirSync(assetsFolderPath)
    .map(file => path.resolve(assetsFolderPath, file));
} catch (e) {
  // ok
}

Object.keys(syncFileExtensions).forEach((fileExtension) => {
  const [
    prevIosAssetsWithExtension,
    prevAndroidAssetsWithExtension,
    iosAssetsWithExtension,
    androidAssetsWithExtension,
  ] = [
    prevIosAssets,
    prevAndroidAssets,
    iosAssets,
    androidAssets,
  ].map(assets => assets.filter(asset => path.extname(asset) === `.${fileExtension}`));

  if (prevIosAssetsWithExtension.length > 0) {
    log.info(`Cleaning previously linked ${fileExtension} assets from ios project`);
    cleanAssetsIos(prevIosAssetsWithExtension, syncFileExtensions[fileExtension].ios);
  }
  if (prevAndroidAssetsWithExtension.length > 0) {
    log.info(`Cleaning previously linked ${fileExtension} assets from android project`);
    cleanAssetsAndroid(prevAndroidAssetsWithExtension, syncFileExtensions[fileExtension].android);
  }
  if (iosAssetsWithExtension.length > 0) {
    log.info(`Linking ${fileExtension} assets to ios project`);
    copyAssetsIos(iosAssetsWithExtension, syncFileExtensions[fileExtension].ios);
  }
  if (androidAssetsWithExtension.length > 0) {
    log.info(`Linking ${fileExtension} assets to android project`);
    copyAssetsAndroid(androidAssetsWithExtension, syncFileExtensions[fileExtension].android);
  }
});

const baseNameOnly = assets => assets.map(asset => path.basename(asset));

manifest.ios.write(baseNameOnly(iosAssets));
manifest.android.write(baseNameOnly(androidAssets));
