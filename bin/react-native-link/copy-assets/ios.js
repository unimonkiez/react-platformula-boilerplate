// Used by react-native, is available (don't want to flood the package.json)
// eslint-disable-next-line
const fs = require('fs-extra');
const path = require('path');
// eslint-disable-next-line
const xcode = require('xcode');
// eslint-disable-next-line
const log = require('npmlog');
const createGroupWithMessage = require('react-native/local-cli/link/ios/createGroupWithMessage');
const getPlist = require('react-native/local-cli/link/ios/getPlist');
const writePlist = require('react-native/local-cli/link/ios/writePlist');

const projectConfig = {
  pbxprojPath: '',
  sourceDir: '',
};

/**
 * This function works in a similar manner to its Android version,
 * except it does not copy assets but creates Xcode Group references
 */
module.exports = function linkAssetsIOS(files, { addFont }) {
  const project = xcode.project(projectConfig.pbxprojPath).parseSync();
  const plist = getPlist(project, projectConfig.sourceDir);

  createGroupWithMessage(project, 'LinkedResources');

  function addResourceFile(f) {
    return (f || [])
      .map(asset => (
        project.addResourceFile(
          path.relative(projectConfig.sourceDir, asset),
          { target: project.getFirstTarget().uuid },
        )
      ))
      .filter(file => file) // xcode returns false if file is already there
      .map(file => file.basename);
  }

  addResourceFile(files);

  fs.writeFileSync(
    projectConfig.pbxprojPath,
    project.writeSync(),
  );

  writePlist(project, projectConfig.sourceDir, plist);
};
