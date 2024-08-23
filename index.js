import { createPublish } from './lib/publish';
import { git } from './lib/git';

const publishTags = createPublish(git);
async function publish(pluginConfig, context) { 
  await publishTags(pluginConfig, context);
}

export {
  publish
};
