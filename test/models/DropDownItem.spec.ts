import { describe, test, expect } from '@jest/globals';
import DropDownItem from '~/models/DropDownItem';
describe('models/DropDownItem.ts', () => {
  test('コンストラクタのテスト', () => {
    const value = 1;
    const label = 'label';
    const dropDownItem = new DropDownItem(value, label);
    expect(dropDownItem.label).toBe(label);
    expect(dropDownItem.value).toBe(value);
  });
  test('toJsonのテスト', () => {
    const value = 1;
    const label = 'label';
    const dropDownItem = new DropDownItem(value, label);
    const actual = dropDownItem.toJSON();
    const expected = { value, label };
    expect(actual).toStrictEqual(expected);
  });
  describe('getItemFromListByValueのテスト', () => {
    test('リストが空である場合はundefinedを返す', () => {
      const items: DropDownItem[] = [];
      const actual = DropDownItem.getItemFromListByValue(items, 1);
      expect(actual).toStrictEqual(undefined);
    });
    test('リストに1つ要素がある場合に正しく取得できる', () => {
      const expected = new DropDownItem(1, '1');
      const items = [expected];
      const actual = DropDownItem.getItemFromListByValue(items, 1);
      expect(actual).toStrictEqual(expected);
    });
    test('リストに2つ要素がある場合に正しく取得できる', () => {
      const expected = new DropDownItem(1, '1');
      const items = [new DropDownItem(0, '0'), expected];
      const actual = DropDownItem.getItemFromListByValue(items, 1);
      expect(actual).toStrictEqual(expected);
    });
    test('リスト内にマッチする要素がない場合はundefinedを返す', () => {
      const items = [new DropDownItem(0, '0'), new DropDownItem(1, '1')];
      const actual = DropDownItem.getItemFromListByValue(items, 2);
      expect(actual).toStrictEqual(undefined);
    });
  });
});
