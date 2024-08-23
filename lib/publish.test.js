import { describe, it, expect, vi } from 'vitest';
import { createPublish }  from './publish.js';

describe('publish()', () => {
  const createMockedPublish = () => {
    const git = {
      forcePushTags: vi.fn()
    };
    
    const publish = createPublish(git);
    
    return {
      publish,
      git
    };
  }

  it('given nextRelease with Tag v1.1.2, force pushes tags v1 and v1.1', async () => {
    const mockContext = {
      nextRelease: { gitTag: 'v1.1.2' },
      logger: { log: vi.fn() },
      options: { repositoryUrl: 'https://repourl.com' }
    }
    
    const { publish, git } = createMockedPublish();
    
    await publish({}, mockContext);
    
    expect(git.forcePushTags).toHaveBeenCalledWith({
      sourceTag: 'v1.1.2',
      targetTags: ['v1', 'v1.1'],
      repositoryUrl: 'https://repourl.com'
    });
  });
  
  it('logs before and after pushing.', async () => {
    const mockContext = {
      nextRelease: { gitTag: 'v1.1.2' },
      logger: { log: vi.fn() },
      options: { repositoryUrl: 'https://repourl.com' }
    }
    
    const { publish } = createMockedPublish();
    
    await publish({}, mockContext);
    
    expect(mockContext.logger.log).toHaveBeenNthCalledWith(1, 'Setting Target Tags "v1" and "v1.1" on Source Tag "v1.1.2" and pushing it to remote.');
    expect(mockContext.logger.log).toHaveBeenNthCalledWith(2, 'Tags "v1" and "v1.1" created successfully.');
  });
});
