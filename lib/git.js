import { promisify } from 'util';
import { exec as pureExec } from 'child_process';
import { GitError } from './errors/GitError.js';

const exec = promisify(pureExec);

const git = {
  forcePushTags: async ({sourceTag, targetTags, repositoryUrl}) => {
    try {
      for(const targetTag of targetTags) {
        // Delete the current target tag on the remote if it exists
        await exec(`git push ${repositoryUrl} :refs/tags/${targetTag}`);
        // recreate the tag pointing to the new source tag
        await exec(`git tag -f ${targetTag} ${sourceTag}`);
        // push the tag to the remote
        await exec(`git push ${repositoryUrl} ${targetTag}`);
      }
    } catch (e) {
      throw new GitError(e);
    }
  }
}

export {
  git
};
