const fileLoader = require('file-loader');
const fontkit = require('fontkit');

module.exports = function jssFontLoader(ttfContent) {
  const { postscriptName } = fontkit.create(ttfContent);
  fileLoader.call(
    Object.assign({}, this, {
      query: Object.assign({}, this.query, {
        name: `${this.query.path}${postscriptName}.ttf`,
        path: undefined,
      }),
    }),
    ttfContent,
  );

  return `
var getFontCustomModule = require('bin/transform/font').default;

module.exports = getFontCustomModule(${JSON.stringify(postscriptName)});
`.substr(1); // to remove first empty line
};

module.exports.raw = true;
