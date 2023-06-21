import { describe, test, expect } from '@jest/globals';
import {
  PopulationCompotision,
  PopulationCompotisionData,
} from '~/models/PopulationComposition';

describe('models/PopulationCompositionData.ts', () => {
  test('コンストラクタのテスト', () => {
    const year = '1000';
    const value = 1000;
    const populationCompotisionData = new PopulationCompotisionData(
      year,
      value
    );
    expect(populationCompotisionData.year).toBe(year);
    expect(populationCompotisionData.value).toBe(value);
  });
});

describe('models/PopulationComposition.ts', () => {
  test('コンストラクタのテスト', () => {
    const prefCode = 0;
    const label = 'test';
    const dataList = [new PopulationCompotisionData('1000', 1000)];
    const populationCompotision = new PopulationCompotision(
      prefCode,
      label,
      dataList
    );
    expect(populationCompotision.prefCode).toBe(prefCode);
    expect(populationCompotision.label).toBe(label);
    expect(populationCompotision.dataList).toBe(dataList);
  });
  describe('get chartDataのテスト', () => {
    test('1980年~2000年のデータが正しく返却される', () => {
      const dataList = [
        new PopulationCompotisionData('1980', 1000),
        new PopulationCompotisionData('1990', 1200),
        new PopulationCompotisionData('2000', 1500),
      ];
      const populationCompotision = new PopulationCompotision(
        0,
        'test',
        dataList
      );
      const actual = populationCompotision.chartData;
      const expected = {
        labels: ['1980', '1990', '2000'],
        datasets: [
          {
            label: 'test',
            backgroundColor: '#A855F7',
            data: [1000, 1200, 1500],
          },
        ],
      };
      expect(actual).toStrictEqual(expected);
    });
    test('1980年より前のデータは返却値に含めない', () => {
      const dataList = [
        new PopulationCompotisionData('1979', 500),
        new PopulationCompotisionData('1980', 1000),
        new PopulationCompotisionData('1990', 1200),
        new PopulationCompotisionData('2000', 1500),
      ];
      const populationCompotision = new PopulationCompotision(
        0,
        'test',
        dataList
      );
      const actual = populationCompotision.chartData;
      const expected = {
        labels: ['1980', '1990', '2000'],
        datasets: [
          {
            label: 'test',
            backgroundColor: '#A855F7',
            data: [1000, 1200, 1500],
          },
        ],
      };
      expect(actual).toStrictEqual(expected);
    });
    test('2000年より後のデータは返却値に含めない', () => {
      const dataList = [
        new PopulationCompotisionData('1980', 1000),
        new PopulationCompotisionData('1990', 1200),
        new PopulationCompotisionData('2000', 1500),
        new PopulationCompotisionData('2001', 1600),
      ];
      const populationCompotision = new PopulationCompotision(
        0,
        'test',
        dataList
      );
      const actual = populationCompotision.chartData;
      const expected = {
        labels: ['1980', '1990', '2000'],
        datasets: [
          {
            label: 'test',
            backgroundColor: '#A855F7',
            data: [1000, 1200, 1500],
          },
        ],
      };
      expect(actual).toStrictEqual(expected);
    });
  });
});
