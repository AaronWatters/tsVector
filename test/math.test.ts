

import { describe, expect, it } from 'vitest';
import { add, subtract } from '../src/index';

describe('Math Functions', () => {
  it('should add numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('should subtract numbers correctly', () => {
    expect(subtract(5, 3)).toBe(2);
  });
});
