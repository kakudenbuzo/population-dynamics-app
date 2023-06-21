import { describe, test, expect } from '@jest/globals';
import Prefecture from '~/models/Prefecture';

describe('models/Prefecture.ts', () => {
  test('コンストラクタのテスト', () => {
    const code = 0;
    const name = '北海道';

    const prefecture = new Prefecture(code, name);

    expect(prefecture.code).toBe(code);
    expect(prefecture.name).toBe(name);
  });
});
