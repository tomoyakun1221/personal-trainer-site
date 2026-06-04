#!/bin/sh
# Personal Access Token で push（SSH が使えない場合）
# 使い方:
#   1. https://github.com/settings/tokens/new?scopes=repo&description=TSP-push
#      → Generate token → 表示された ghp_... をコピー
#   2. ターミナルで:
#        export GITHUB_TOKEN=ghp_xxxxxxxx
#        sh scripts/push-github-token.sh
set -e

if [ -z "$GITHUB_TOKEN" ]; then
  echo "GITHUB_TOKEN が未設定です。"
  echo ""
  echo "1. https://github.com/settings/tokens/new を開く"
  echo "2. Note: TSP-push / Expiration: 90 days / Scope: repo にチェック"
  echo "3. Generate token → ghp_ で始まる文字列をコピー"
  echo "4. 次を実行:"
  echo '   export GITHUB_TOKEN=ghp_ここに貼り付け'
  echo "   sh scripts/push-github-token.sh"
  exit 1
fi

cd "$(dirname "$0")/.."
git remote set-url origin "https://github.com/tomoyakun1221/personal-trainer-site.git"

# トークンを URL に埋め込まず credential helper 経由で1回だけ使用
printf "protocol=https\nhost=github.com\nusername=tomoyakun1221\npassword=%s\n" "$GITHUB_TOKEN" | git credential-osxkeychain store 2>/dev/null || \
  printf "protocol=https\nhost=github.com\nusername=tomoyakun1221\npassword=%s\n" "$GITHUB_TOKEN" | git credential-store --file "$HOME/.git-credentials-tsp" store

export GIT_TERMINAL_PROMPT=0
git -c credential.helper=osxkeychain push -u origin main 2>/dev/null || \
  git -c "credential.helper=store --file=$HOME/.git-credentials-tsp" push -u origin main

echo ""
echo "完了: https://github.com/tomoyakun1221/personal-trainer-site"
echo "（トークンは GitHub の Settings からいつでも無効化できます）"
