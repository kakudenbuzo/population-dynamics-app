import api from './api'
import Prefecture from '~/models/Prefecture'

interface Response {
  message: string | undefined
  result: [{ prefCode: number; prefName: string }]
}
export default class PrefectureRepository {
  async fetchAll(): Promise<Prefecture[]> {
    try {
      const prefectures = []
      const res = await api.get<Response>('/prefectures')

      for (const prefData of res.data.result) {
        prefectures.push(new Prefecture(prefData.prefCode, prefData.prefName))
      }
      return prefectures
    } catch (error) {
      return []
    }
  }
}
