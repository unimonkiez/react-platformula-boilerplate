module.exports = source => `
var getSvgCustomModule = require('scripts/transform/svg').default;
${source}

module.exports = getSvgCustomModule(module.exports);
`.substr(1); // to remove first empty line
