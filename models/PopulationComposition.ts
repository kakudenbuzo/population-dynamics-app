import { ChartData } from 'chart.js';

export class PopulationCompotisionData {
  year: string;
  value: number;
  constructor(year: string, value: number) {
    this.year = year;
    this.value = value;
  }
}

export class PopulationCompotision {
  prefCode: number;
  label: string;
  dataList: PopulationCompotisionData[];

  constructor(
    prefCode: number,
    label: string,
    dataList: PopulationCompotisionData[]
  ) {
    this.prefCode = prefCode;
    this.label = label;
    this.dataList = dataList;
  }

  /**
   * chart.js用にデータを加工して返す
   * @returns chart.jsのChartData
   */
  get chartData(): ChartData {
    const labels = [];
    const data = [];
    for (const populationData of this.dataList) {
      if (Number(populationData.year) > 2000) break;
      labels.push(populationData.year);
      data.push(populationData.value);
    }
    return {
      labels,
      datasets: [{ label: this.label, backgroundColor: '#A855F7', data }],
    };
  }
}
