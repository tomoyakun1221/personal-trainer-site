# Render へのデプロイ手順

## 1. GitHub に push

GitHub は **パスワードでは push できません**（SSH 鍵 または Personal Access Token が必要です）。

### 方法 A: SSH（推奨）

```bash
cd /Users/amanotomoya/Desktop/personal-trainer-site
sh scripts/setup-github-ssh.sh   # 初回のみ（鍵の表示）
```

表示された `ssh-ed25519 AAAA...` の1行を  
https://github.com/settings/ssh/new に貼り付けて **Add SSH key**。

その後:

```bash
sh scripts/push-github.sh
```

### 方法 B: トークン（PAT）

1. https://github.com/settings/tokens/new → Scope: **repo** → Generate token  
2. `export GITHUB_TOKEN=ghp_...`  
3. `sh scripts/push-github-token.sh`

リポジトリ: https://github.com/tomoyakun1221/personal-trainer-site

## 2. Render で Blueprint デプロイ

1. [Render Dashboard](https://dashboard.render.com/) にログイン
2. **New +** → **Blueprint**
3. GitHub の `tomoyakun1221/personal-trainer-site` を接続・選択
4. `render.yaml` が読み込まれるので **Apply**
5. 5〜15 分ほどでデプロイ完了（初回ビルドは時間がかかります）

## 3. 公開 URL

デプロイ完了後、サービス `tsp-gym` の URL が表示されます（例: `https://tsp-gym.onrender.com`）。

## 4. 管理画面

- URL: `https://<あなたのURL>/admin/login`
- Email: `admin@example.com`
- Password: `password123`（**公開後は必ず変更してください**）

## トラブル時

- **Deploy failed**: Render の Logs タブでビルドログを確認
- **DB 接続エラー**: Blueprint で `tsp-db`（PostgreSQL）が作成されているか確認
- **画像が表示されない**: 無料プランではディスクが揮発する場合があります。再デプロイ後 `RUN_DB_SEED=true` でシードが走ります
