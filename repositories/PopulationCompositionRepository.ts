import api from './api';
import {
  PopulationCompotision,
  PopulationCompotisionData,
} from '~/models/PopulationComposition';

interface Response {
  message: string | undefined;
  result: {
    data: [{ label: string; data: [{ year: number; value: number }] }];
  };
}
export default class PrefectureRepository {
  async fetchByPrefCode(prefCode: number): Promise<PopulationCompotision[]> {
    const res = await api.get<Response>(
      `population/composition/perYear?prefCode=${prefCode}`
    );
    const dataList = res.data.result.data;
    const result = [];
    for (const data of dataList) {
      const compositionDataList = data.data;
      const populationCompotisionDataList = [];
      for (const compositionData of compositionDataList) {
        const populationCompotisionData = new PopulationCompotisionData(
          String(compositionData.year),
          compositionData.value
        );
        populationCompotisionDataList.push(populationCompotisionData);
      }
      result.push(
        new PopulationCompotision(
          prefCode,
          data.label,
          populationCompotisionDataList
        )
      );
    }
    return result;
  }
}
