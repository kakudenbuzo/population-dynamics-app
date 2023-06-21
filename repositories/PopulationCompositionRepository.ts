import api from './api';
import {
  PopulationCompotision,
  PopulationCompotisionData,
  PopulationType,
} from '~/models/PopulationComposition';

interface Response {
  message: string | undefined;
  result: {
    data: [{ label: string; data: [{ year: number; value: number }] }];
  };
}
export default class PrefectureRepository {
  async fetchByPrefCodeAndPopulationType(
    prefCode: number,
    populationType: PopulationType
  ): Promise<PopulationCompotision> {
    const res = await api.get<Response>(
      `population/composition/perYear?prefCode=${prefCode}`
    );

    const dataList = res.data.result.data;

    for (const data of dataList) {
      if (data.label !== populationType) continue;
      const compositionDataList = data.data;
      const populationCompotisionDataList = [];
      for (const compositionData of compositionDataList) {
        const populationCompotisionData = new PopulationCompotisionData(
          String(compositionData.year),
          compositionData.value
        );
        populationCompotisionDataList.push(populationCompotisionData);
      }
      return new PopulationCompotision(
        prefCode,
        data.label,
        populationCompotisionDataList
      );
    }
    throw new Error('データ取得に失敗しました。');
  }
}
