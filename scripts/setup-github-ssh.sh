#!/bin/sh
# GitHub へ SSH で push するための設定（パスワード認証は使えません）
set -e

KEY="$HOME/.ssh/id_ed25519_github"
PUB="${KEY}.pub"
REPO="git@github.com:tomoyakun1221/personal-trainer-site.git"

mkdir -p "$HOME/.ssh"
chmod 700 "$HOME/.ssh"

if [ ! -f "$KEY" ]; then
  echo "SSH 鍵を作成しています..."
  ssh-keygen -t ed25519 -f "$KEY" -N "" -C "tomoyakun1221@github.com"
fi

# GitHub 用 SSH 設定
CONFIG="$HOME/.ssh/config"
if ! grep -q "Host github.com" "$CONFIG" 2>/dev/null; then
  cat >> "$CONFIG" <<EOF

Host github.com
  HostName github.com
  User git
  IdentityFile $KEY
  IdentitiesOnly yes
EOF
  chmod 600 "$CONFIG"
  echo "~/.ssh/config に GitHub 用の設定を追加しました。"
fi

cd "$(dirname "$0")/.."
git remote set-url origin "$REPO"

echo ""
echo "=========================================="
echo " 次の公開鍵を GitHub に登録してください"
echo "=========================================="
echo ""
cat "$PUB"
echo ""
echo "1. ブラウザで開く: https://github.com/settings/ssh/new"
echo "2. Title: MacBook TSP など任意の名前"
echo "3. Key: 上の ssh-ed25519 で始まる1行をすべてコピー＆ペースト"
echo "4. Add SSH key をクリック"
echo ""
echo "リポジトリがまだ無い場合:"
echo "  https://github.com/new → 名前 personal-trainer-site → Create"
echo ""
echo "登録後、次を実行:"
echo "  cd $(pwd) && git push -u origin main"
echo ""
