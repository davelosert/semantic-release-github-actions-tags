const { createPublish } = require('./lib/publish');
const { git }  = require('./lib/git');

const publishTags = createPublish(git);
async function publish(pluginConfig, context) { 
  await publishTags(pluginConfig, context);
}

module.exports = {
  publish
};
