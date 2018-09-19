module.exports = source => `
var getSoundCustomModule = require('scripts/transform/sound').default;
${source}

module.exports = getSoundCustomModule(module.exports);
`.substr(1); // to remove first empty line
