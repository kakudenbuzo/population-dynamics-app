import { ChartData, ChartOptions } from 'chart.js';

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
    const backgroundColor = '#A855F7';
    for (const populationData of this.dataList) {
      if (Number(populationData.year) < PopulationCompotision.MIN_YEAR)
        continue;
      if (Number(populationData.year) > PopulationCompotision.MAX_YEAR) break;
      labels.push(populationData.year);
      data.push(populationData.value);
    }
    return {
      labels,
      datasets: [{ label: this.label, backgroundColor, data }],
    };
  }

  /**
   * chart.js用にoptionsデータを加工して返す
   * @returns chart.jsのChartOptions
   */
  get chartOptionData(): ChartOptions {
    return {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        callbacks: {
          label: (item: any) => {
            let value = item.yLabel;
            value = value.toString();
            value = value.split(/(?=(?:...)*$)/);
            value = value.join(',');
            return `${value}人`;
          },
          title: (item: any) => {
            const label = item[0].label;
            return `${label}年`;
          },
        },
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              stepSize: this.stepSize,
              // 縦軸に表示する数字を桁数に応じて万、億、兆に置き換える
              callback: (value: any, _index: any, _values: any) => {
                value = value.toString();
                const threshold = 10000;
                if (value >= threshold) {
                  const units = ['万', '億', '兆'];
                  let unitIndex = 0;
                  while (value >= threshold && unitIndex < units.length) {
                    value = value / threshold;
                    unitIndex++;
                  }
                  value =
                    Math.floor(value).toLocaleString() + units[unitIndex - 1];
                } else {
                  value = value.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
                }
                return value;
              },
            },
          },
        ],
      },
      legend: {
        display: false,
      },
    };
  }

  private get stepSize(): number {
    // 最大値を取得
    let maxNumber = 0;
    for (const data of this.dataList) {
      if (maxNumber < data.value) {
        maxNumber = data.value;
      }
    }
    // 最大値の最上位桁以外を0で丸める
    const maxNumberString = String(maxNumber);
    const digitNumber = maxNumberString.length;
    let rounded = maxNumberString[0];
    for (let i = 0; i < digitNumber - 1; i++) {
      rounded += '0';
    }

    return Number(rounded) / 10;
  }
}
