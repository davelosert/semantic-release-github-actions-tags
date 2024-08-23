import { createPublish } from './lib/publish.js';
import { git } from './lib/git.js';

const publishTags = createPublish(git);
async function publish(pluginConfig, context) { 
  await publishTags(pluginConfig, context);
}

export {
  publish
};
