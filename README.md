現在バックエンド移行中
# multiMovie

https://multi-movie.vercel.app/

複数の YouTube の動画を一つのタブで再生するアプリです。
現在は URL の直打ちのみ対応してます。
4 つより動画が多い場合スタックとして管理し、動画終了時に新規再生されます。

## 開発環境

### フロントエンド

- TypeScript
- Next.js
- MUI

### バックエンド

- Ruby on Rails

### データベース

- MySQL
- Redis

### ユーザー認証

- Firebase

### 開発サーバー起動

```
docker-compose up --build
```

### バックエンド

http://localhost:3000

### フロントエンド

http://localhost:8000
