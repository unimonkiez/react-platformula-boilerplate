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
const { ios: projectConfig } = require('../config');

/**
 * This function works in a similar manner to its Android version,
 * except it does not copy assets but creates Xcode Group references
 */
module.exports = function cleanAssetsIOS(files, { addFont }) {
  const project = xcode.project(projectConfig.pbxprojPath).parseSync();
  const plist = getPlist(project, projectConfig.sourceDir);

  createGroupWithMessage(project, 'Resources');

  function removeResourceFile(f) {
    return (f || [])
      .map(asset => (
        project.removeResourceFile(
          path.relative(projectConfig.sourceDir, asset),
          { target: project.getFirstTarget().uuid },
        )
      ))
      .filter(file => file) // xcode returns false if file is already there
      .map(file => file.basename);
  }

  const removedFiles = removeResourceFile(files);

  if (addFont) {
    const existingFonts = (plist.UIAppFonts || []);
    const allFonts = existingFonts.filter(file => removedFiles.indexOf(file) === -1);
    plist.UIAppFonts = Array.from(new Set(allFonts)); // use Set to dedupe w/existing
  }

  fs.writeFileSync(
    projectConfig.pbxprojPath,
    project.writeSync(),
  );

  writePlist(project, projectConfig.sourceDir, plist);
};
