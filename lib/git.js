const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { GitError } = require('./errors/GitError');

const git = {
  forcePushTags: async ({sourceTag, targetTags}) => {
    try {
      for(const targetTag of targetTags) {
        // Delete the current target tag locally
        await exec(`git push origin :refs/tags/${targetTag}`);
        // recreate the tag pointing to the new source tag
        await exec(`git tag -f ${targetTag} ${sourceTag}`);
        // push the tag to the remote
        await exec(`git push origin ${targetTag}`);
      }
    } catch (e) {
      throw new GitError(e);
    }
  }
}

module.exports = {
  git
};
