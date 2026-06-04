# パーソナルトレーナー向けホームページ（TSP）

Ruby on Rails（APIモード）+ React（TypeScript）+ MySQL で構築したパーソナルトレーニングジム TSP 向けサイトです。

## 機能

| ページ | 説明 |
|--------|------|
| トップ | ヒーロー、料金、実績・お客様の声、マシン紹介 |
| プロフィール | トレーナー紹介（天野智也） |
| 料金表 | 体験コース・回数券コース |
| 実績 | ビフォーアフター一覧 |
| 会社概要 | 事業所情報・連絡先 |
| 管理画面 | コンテンツCRUD |

連絡先: [Instagram](https://www.instagram.com/tomoya_personal_trainer/) / メール

## 技術スタック

- **API**: Rails 7.1 API, MySQL, JWT認証, Active Storage（画像）
- **Frontend**: React 18, TypeScript, Vite, React Router（スマホ対応レイアウト）
- **インフラ**: Docker Compose / 本番用 Dockerfile

## 起動方法（開発・Docker）

```bash
cd personal-trainer-site
docker compose up --build
```

| URL | 内容 |
|-----|------|
| http://localhost:5173 | 公開サイト（開発） |
| http://localhost:5173/admin/login | 管理画面 |

### 管理画面ログイン（初期）

- **Email**: `admin@example.com`
- **Password**: `password123`

## スマートフォンで確認する（開発中）

1. PC とスマホを同じ Wi‑Fi に接続
2. `docker compose up` で起動
3. PC の IP アドレスを確認（例: `192.168.1.10`）
4. スマホのブラウザで `http://192.168.1.10:5173` を開く

## 本番ビルド（ローカルで公開テスト）

誰でもアクセスできる状態を **自分の PC / サーバー上** で試す場合:

```bash
# 1. シークレット生成
sh scripts/generate-secrets.sh

# 2. .env.production を作成して値を貼り付け
cp .env.production.example .env.production

# 3. 起動（フロント + API を 1 つにまとめて配信）
sh scripts/deploy-local-prod.sh
```

ブラウザで **http://localhost:8080**（ポートは `.env.production` の `PORT` で変更可）

同じネットワークのスマホからは `http://<PCのIP>:8080` で確認できます。

## インターネット公開（デプロイ）

### 方法 A: Fly.io（推奨）

1. [Fly.io](https://fly.io) でアカウント作成
2. [flyctl](https://fly.io/docs/hands-on/install-flyctl/) をインストール
3. リポジトリで以下を実行:

```bash
fly launch --no-deploy
fly postgres create   # または MySQL を別途用意し DB_* を設定
fly secrets set SECRET_KEY_BASE="$(openssl rand -hex 64)"
fly secrets set JWT_SECRET="$(openssl rand -hex 32)"
fly secrets set DB_HOST=... DB_USERNAME=... DB_PASSWORD=...
fly secrets set APP_HOST="your-app.fly.dev"
fly secrets set CORS_ORIGINS="https://your-app.fly.dev"
fly volumes create tsp_storage --size 1
fly deploy
```

※ MySQL を使う場合は [PlanetScale](https://planetscale.com) 等の外部 DB を `DB_HOST` に指定してください。

### 方法 B: Render

1. GitHub にプッシュ
2. [Render](https://render.com) → **New** → **Blueprint**
3. リポジトリの `render.yaml` を選択してデプロイ
4. 表示された URL を `APP_HOST` / `CORS_ORIGINS` に設定

### 方法 C: VPS（さくら・ConoHa 等）

```bash
git clone <your-repo>
cd personal-trainer-site
cp .env.production.example .env.production
# シークレットを編集
docker compose -f docker-compose.prod.yml --env-file .env.production up -d --build
```

Nginx で 80/443 を `8080` にプロキシすれば独自ドメインでも公開できます。

## 本番デプロイ時の注意

- `SECRET_KEY_BASE` / `JWT_SECRET` は必ずランダムな長い文字列に変更
- 管理画面パスワードを必ず変更
- `APP_HOST` に本番ドメイン（例: `tsp.example.com`）を設定
- Active Storage の画像は `storage` ボリュームまたは S3 を利用

## プロジェクト構成

```
personal-trainer-site/
├── api/                 # Rails API
├── frontend/            # React + TypeScript
├── Dockerfile           # 本番用（フロントビルド込み）
├── docker-compose.yml   # 開発
├── docker-compose.prod.yml
├── fly.toml
└── render.yaml
```

## ライセンス

MIT
