const { resolveTags } = require('./resolveTags');

function createPrepare(git) {
  return async (pluginConfig, context) => {
    const resolvedTags = resolveTags(context.nextRelease.gitTag);

    context.logger.log(`Setting Target Tags "${resolvedTags.join('" and "')}" on Source Tag "${context.nextRelease.gitTag}" and pushing it to remote.`);

    await git.forcePushTags({
      sourceTag: context.nextRelease.gitTag,
      targetTags: resolvedTags
    });

    context.logger.log(`Tags "${resolvedTags.join('" and "')}" created successfully.`);
  }
}

module.exports = {
  createPrepare
};
