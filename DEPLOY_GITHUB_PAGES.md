# GitHub Pages デプロイ（無料）

公開 URL: **https://tomoyakun1221.github.io/personal-trainer-site/**

## 初回のみ（GitHub 設定）

1. リポジトリ https://github.com/tomoyakun1221/personal-trainer-site を開く
2. **Settings** → **Pages**
3. **Build and deployment** → Source: **Deploy from a branch**
4. Branch: **gh-pages** / **/(root)** → Save
5. `main` へ push すると GitHub Actions が `gh-pages` へ自動デプロイ（約 2〜3 分）

手動デプロイ（Actions が動かない場合）:

```bash
sh scripts/deploy-gh-pages.sh
```

## コードを push

```bash
cd /Users/amanotomoya/Desktop/personal-trainer-site
sh scripts/push-github.sh
```

## 注意（GitHub Pages の制限）

- **フロントのみ**公開（Rails API・管理画面は含まれません）
- コンテンツはリポジトリ内の静的データで表示されます
- 画像・文章を変える場合はコードを編集して push してください

## 管理画面が必要な場合

ローカルで `docker compose up` を使うか、将来サーバー（Render 等）で API を別途ホストしてください。
