#!/bin/bash
# deploy.sh - 提取数据 + git commit + push，触发 Cloudflare 构建
set -euo pipefail

SITE_DIR="/root/projects/xiaoyu-site"
cd "$SITE_DIR"

echo "[$(date)] === 开始每日更新 ==="

# 1. 提取工作记录
bash scripts/extract-daily.sh

# 2. 检查是否有变更
if git diff --quiet src/data/ src/content/; then
  echo "[$(date)] 没有数据变更，跳过部署"
  exit 0
fi

# 3. 提交推送
git add src/data/ src/content/
git commit -m "chore: 每日自动更新 $(date +%Y-%m-%d)"
git push origin main

echo "[$(date)] === 每日更新完成，Cloudflare 构建已触发 ==="
