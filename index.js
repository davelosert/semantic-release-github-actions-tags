const { createPrepare } = require('./lib/prepare');
const { git }  = require('./lib/git');

const prepareTags = createPrepare(git);
async function prepare(pluginConfig, context) { 
  await prepareTags(pluginConfig, context);
}

module.exports = {
  prepare
};
