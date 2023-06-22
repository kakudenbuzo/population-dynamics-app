import axios from 'axios';

const baseURL = 'https://opendata.resas-portal.go.jp/api/v1';

const api = axios.create({
  baseURL,
});

api.defaults.headers.common['X-API-KEY'] = process.env.API_KEY;

export default async function (req: any, res: any, _next: any) {
  try {
    // APIエンドポイントのパスを取得
    const path = req.originalUrl;
    const replaced = path.replace('/server-api', '');

    // クライアントからのリクエストをサーバーサイドで実行
    const response = await api.get(replaced);

    // レスポンスをクライアントに返す
    res.statusCode = response.status;
    res.end(JSON.stringify(response.data));
  } catch (error) {
    res.statusCode = 500;
    res.end('Server Error');
  }
}
