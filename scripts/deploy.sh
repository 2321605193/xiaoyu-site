#!/bin/bash
# deploy.sh - 自动提交并部署到 Cloudflare Pages
# 每天 23:00 由 OpenClaw Cron 触发

set -euo pipefail

SITE_DIR="/root/projects/xiaoyu-site"
TODAY=$(date +%Y-%m-%d)

cd "$SITE_DIR"

echo "[$(date)] 开始部署流程..."

# 1. 提取最新数据
bash scripts/extract-daily.sh

# 2. 检查是否有变更
if git diff --quiet src/data/work-log.json; then
  echo "[$(date)] work-log.json 无变更，跳过部署"
  exit 0
fi

# 3. 提交变更
git add src/data/work-log.json
git commit -m "chore: 每日自动更新 $TODAY"

# 4. 推送到 GitHub（触发 Cloudflare Pages 构建）
git push origin main

echo "[$(date)] 部署完成，Cloudflare Pages 将自动构建"
