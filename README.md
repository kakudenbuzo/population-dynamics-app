# population-dynamics-app

## 挙動が確認できるURL
- https://population-dynamics-app.vercel.app/

## 作業時間
- 総作業時間: 約**10時間**
  - 調査:３時間
  - コーディング:4時間
  - デプロイ作業:3時間
 
## 工夫したポイント
### 1. グラフの目盛り幅を動的に決定
縦軸の目盛り幅を各グラフの最大値の10分の1になるように、グラフごとに計算を行った。
これにより、グラフごとに最適化された目盛り幅にでき、グラフの見やすくしている。

### 2.グラフ数値の視認性
グラフに表示する数値をRESAS(地域経済分析システム) APIの返却値をそのまま使うのではなく、
三桁ごとにカンマを入れたり、必要に応じて漢字(万など)に置き換えることで視認性を高めた。

### ３. API KEYの保護
API KEYは、環境変数で定義しソースコード上からは確認できないようにした。
また、クライアント側からも隠蔽されるように設定しAPIの実行はサーバーミドルウェアを使ってサーバーサイドで
行われるように設定した。

## 開発環境

- 使用言語: TypeScript
- フレームワーク: Nuxt.js(v2系)
- テストフレームワーク: Jest
- エディタ: VSCode
- リンター: Prettier,ESLint

### 環境構築手順
#### 1. Node.jsのインストール
https://nodejs.org/en から最新版のLTSをインストール

#### 2. リポジトリのクローン
任意のディレクトリで以下を実行し、プロジェクトをクローンする。

```
git clone https://github.com/kakudenbuzo/population-dynamics-app.git
```
#### 3. パッケージインストール
プロジェクトのルートに移動し、`npm ci`を実行
```
cd population-dynamics-app
npm ci
```
#### 4. envファイルの作成
プロジェクトのルートに`.env.development`を作成する。

項目は`.env.example`を参考にする。

`HOST_NAME`は`http://localhost:3000`を設定する。

`API_KEY`は[RESAS関連サービス利用登録](https://opendata.resas-portal.go.jp/form.html)から利用登録を行い発行されたものを設定する。

#### 5. ローカルでのアプリ起動
上記を全て行った後、プロジェクトルート上で下記のコマンドを実行する。

```
npm run dev
```
http://localhost:3000 にアクセスし、画面が正常に表示されれば環境構築完了。
