import { ChartData } from 'chart.js';

export enum PopulationType {
  Total = '総人口',
  Youth = '年少人口',
  WorkingAge = '生産年齢人口',
  Elderly = '老年人口',
}

export class PopulationCompotisionData {
  year: string;
  value: number;
  constructor(year: string, value: number) {
    this.year = year;
    this.value = value;
  }
}

export class PopulationCompotision {
  // 表示するデータの年の下限
  static readonly MIN_YEAR = 1980;
  // 表示するデータの年の上限
  static readonly MAX_YEAR = 2000;

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
      if (Number(populationData.year) < PopulationCompotision.MIN_YEAR)
        continue;
      if (Number(populationData.year) > PopulationCompotision.MAX_YEAR) break;
      labels.push(populationData.year);
      data.push(populationData.value);
    }
    return {
      labels,
      datasets: [{ label: this.label, backgroundColor: '#A855F7', data }],
    };
  }
}
