/**  
  * This test can be used to manually test the git force push functionality.
  * Requires a manual setup and cleanup like this:
  * Run before: git tag -a testTag -m 'Just adding a test tag'
  * Test: node test/git.e2e.js
  * Cleanup:
  *   - git tag -d testTag testTargetTag1 testTargetTag2
  *   - git push --delete origin testTag testTargetTag1 testTargetTag2
 */

const { git }  = require('../lib/git');

git.forcePushTags({
  sourceTag: 'testTag',
  targetTags: ['testTargetTag1', 'testTargetTag2']
});
