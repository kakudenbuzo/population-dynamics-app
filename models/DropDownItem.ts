export default class DropDownItem {
  value: number;
  label: string;
  constructor(value: number, label: string) {
    this.value = value;
    this.label = label;
  }

  // non-POJOsの警告に対応
  toJSON() {
    return { ...this };
  }

  static getItemFromListByValue(
    items: DropDownItem[],
    value: number | string
  ): DropDownItem | undefined {
    return items.find((item) => item.value === Number(value));
  }
}
