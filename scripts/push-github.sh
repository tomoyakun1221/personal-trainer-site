#!/bin/sh
set -e
cd "$(dirname "$0")/.."

if ! git remote get-url origin | grep -q "git@github.com"; then
  echo "SSH が未設定です。先に実行してください:"
  echo "  sh scripts/setup-github-ssh.sh"
  exit 1
fi

echo "GitHub 接続を確認しています..."
if ! ssh -T git@github.com 2>&1 | grep -qi "successfully authenticated"; then
  echo ""
  echo "SSH 鍵が GitHub に未登録の可能性があります。"
  echo "  sh scripts/setup-github-ssh.sh"
  echo "の表示に従い https://github.com/settings/ssh/new に鍵を追加してから再実行してください。"
  exit 1
fi

echo "push します..."
git push -u origin main

echo ""
echo "完了: https://github.com/tomoyakun1221/personal-trainer-site"
