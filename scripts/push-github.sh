#!/bin/sh
# GitHub へ push（初回のみリポジトリ作成が必要）
set -e
cd "$(dirname "$0")/.."

REPO="tomoyakun1221/personal-trainer-site"
REMOTE="https://github.com/${REPO}.git"

if ! git remote get-url origin >/dev/null 2>&1; then
  git remote add origin "$REMOTE"
fi

echo "GitHub に push します: $REPO"
echo "ブラウザでログインを求められたら GitHub アカウントで認証してください。"
echo ""

git push -u origin main

echo ""
echo "完了: https://github.com/$REPO"
