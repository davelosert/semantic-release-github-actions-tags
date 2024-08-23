import { describe, it, expect } from 'vitest';
import { resolveTags } from './resolveTags.js';

describe('resolveTags()', () => {
  it('given tag v1.0.0, returns array with v1 and v1.0', () => {
    expect(resolveTags('v1.0.0')).toEqual(['v1', 'v1.0']);
  });

  it('given tag 4.5.0, returns array with v4 and v4.5', () => {
    expect(resolveTags('v4.5.0')).toEqual(['v4', 'v4.5']);
  });
  
  it('given tag 3.2.1, returns array with v3 and v3.2', () => {
    expect(resolveTags('3.2.1')).toEqual(['3', '3.2']);
  });
});
