const fileLoader = require('file-loader');

module.exports = function jssFontLoader(ttfContent) {
  const source = fileLoader.call(
    this,
    ttfContent,
  );
  const sourceValue = JSON.parse(source.replace('module.exports = __webpack_public_path__ + ', '').replace(';', ''));
  const lastSlashIndex = sourceValue.lastIndexOf('/');
  const lastDotIndex = sourceValue.lastIndexOf('.');
  const fileName = sourceValue.substring(lastSlashIndex + 1, lastDotIndex);

  return `
var getFontCustomModule = require('bin/transform/font').default;

module.exports = getFontCustomModule(${JSON.stringify(fileName)});
`.substr(1); // to remove first empty line
};

module.exports.raw = true;
