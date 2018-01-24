const path = require('path');
const { execSync } = require('child_process');

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

exec('node ./bin/react-native-link/link-assets.js');
