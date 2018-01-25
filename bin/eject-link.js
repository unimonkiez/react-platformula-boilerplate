const path = require('path');
const { execSync } = require('child_process');

const args = process.argv.slice(2);
const isIos = args.indexOf('-ios') !== -1;
const isAndroid = args.indexOf('-android') !== -1;

const rootPath = path.resolve(__dirname, '..');

const exec = command => execSync(command, {
  cwd: rootPath,
  stdio: [0, 1, 2],
});

try {
  exec('react-native eject');
} catch (e) {
  console.log('Already have ios or andoird folders, continues');
}

exec('react-native link');

exec(`react-native-asset -p ${rootPath} ${isIos ? '-ios-a ./dist/ios/link-asset' : ''} ${isAndroid ? '-android-a ./dist/android/link-asset' : ''}`);
