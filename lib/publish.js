import { resolveTags } from './resolveTags.js';

function createPublish(git) {
  return async (pluginConfig, context) => {
    const resolvedTags = resolveTags(context.nextRelease.gitTag);

    context.logger.log(`Setting Target Tags "${resolvedTags.join('" and "')}" on Source Tag "${context.nextRelease.gitTag}" and pushing it to remote.`);

    await git.forcePushTags({
      sourceTag: context.nextRelease.gitTag,
      targetTags: resolvedTags,
      repositoryUrl: context.options.repositoryUrl
    });

    context.logger.log(`Tags "${resolvedTags.join('" and "')}" created successfully.`);
  }
}

export {
  createPublish
};
