#!/bin/bash
# 博客自动同步脚本 v2.0
# 从 /root/.openclaw/output/.website-selected/ 读取精选文章，转换为 MDX 格式并发布到网站

set -e

SELECTED_DIR="/root/.openclaw/output/.website-selected"
BLOG_DIR="/root/projects/xiaoyu-site/content/blog"
IMAGES_DIR="/root/projects/xiaoyu-site/public/images/blog"

# 确保目标目录存在
mkdir -p "$BLOG_DIR"
mkdir -p "$IMAGES_DIR"

# 敏感词过滤函数
filter_sensitive() {
  local content="$1"
  
  # 过滤邮箱
  content=$(echo "$content" | sed -E 's/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/[邮箱已隐藏]/g')
  
  # 过滤手机号（中国）
  content=$(echo "$content" | sed -E 's/1[3-9][0-9]{9}/[手机号已隐藏]/g')
  
  # 过滤 IP 地址
  content=$(echo "$content" | sed -E 's/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/[IP已隐藏]/g')
  
  # 过滤 API Key/Token（常见格式）
  content=$(echo "$content" | sed -E 's/(api[_-]?key|token|secret)[[:space:]]*[:=][[:space:]]*[a-zA-Z0-9_-]{20,}/\1: [已隐藏]/gi')
  
  echo "$content"
}

# 从文件名提取元数据
extract_metadata() {
  local filename="$1"
  local content="$2"
  
  # 从文件名提取日期和主题
  # 格式：YYYY-MM-DD-主题.md
  local date=$(echo "$filename" | grep -oE '^[0-9]{4}-[0-9]{2}-[0-9]{2}')
  local slug=$(echo "$filename" | sed -E 's/^[0-9]{4}-[0-9]{2}-[0-9]{2}-//; s/\.md$//')
  
  # 从内容提取标题（第一个 # 标题）
  local title=$(echo "$content" | grep -m1 '^# ' | sed 's/^# //')
  
  # 从内容提取副标题或描述（第二行或 ** 包裹的内容）
  local description=$(echo "$content" | grep -m1 '^\*\*' | sed 's/^\*\*//; s/\*\*.*$//' | sed 's/^副标题：//' | sed 's/^副标题//')
  
  # 如果没有描述，使用标题
  if [[ -z "$description" ]]; then
    description="$title"
  fi
  
  # 默认标签（可以根据内容关键词智能提取）
  local tags="AI,知识管理"
  
  # 根据内容关键词添加标签
  if echo "$content" | grep -qi "OpenClaw\|Agent"; then
    tags="$tags,OpenClaw"
  fi
  if echo "$content" | grep -qi "编程\|开发"; then
    tags="$tags,AI编程"
  fi
  if echo "$content" | grep -qi "一人公司"; then
    tags="$tags,一人公司"
  fi
  
  echo "$slug|$title|$date|$tags|$description"
}

# 转换 Markdown 为 MDX
convert_to_mdx() {
  local source_file="$1"
  local filename=$(basename "$source_file")
  
  # 读取源文件内容（自动跟随软链接）
  local content=$(cat "$source_file")
  
  # 提取元数据
  local metadata=$(extract_metadata "$filename" "$content")
  IFS='|' read -r slug title date tags description <<< "$metadata"
  
  # 如果提取失败，跳过
  if [[ -z "$slug" || -z "$title" || -z "$date" ]]; then
    echo "⚠️  无法提取元数据: $filename"
    return
  fi
  
  local target_file="$BLOG_DIR/${slug}.mdx"
  
  # 敏感信息过滤
  content=$(filter_sensitive "$content")
  
  # 转义 MDX 特殊语法
  # 1. [配图X：...] 在 MDX 中会被当作 JSX 组件
  content=$(echo "$content" | sed 's/\[配图/\&#91;配图/g')
  
  # 2. <数字 会被当作 JSX 标签（如 <3KB），需要转义为 &lt;
  content=$(echo "$content" | sed 's/<\([0-9]\)/\&lt;\1/g')
  
  # 生成 MDX frontmatter
  cat > "$target_file" <<EOF
---
title: $title
date: $date
tags: [${tags//,/, }]
description: $description
cover: /images/blog/${slug}-cover.jpg
---

$content
EOF
  
  echo "✅ 已同步: $filename → ${slug}.mdx"
}

# 主流程
echo "🚀 开始同步博客..."
echo "📂 源目录: $SELECTED_DIR"
echo "📂 目标目录: $BLOG_DIR"
echo ""

# 检查源目录是否存在
if [[ ! -d "$SELECTED_DIR" ]]; then
  echo "❌ 源目录不存在: $SELECTED_DIR"
  exit 1
fi

# 统计文件数
file_count=$(find "$SELECTED_DIR" -maxdepth 1 -name "*.md" -type f -o -type l | wc -l)
echo "📄 找到 $file_count 篇文章"
echo ""

# 遍历所有 .md 文件（包括软链接）
synced=0
for source_file in "$SELECTED_DIR"/*.md; do
  # 跳过 README.md
  if [[ $(basename "$source_file") == "README.md" ]]; then
    continue
  fi
  
  # 检查文件是否存在（软链接目标是否存在）
  if [[ ! -f "$source_file" ]]; then
    echo "⚠️  文件不存在或软链接失效: $(basename "$source_file")"
    continue
  fi
  
  convert_to_mdx "$source_file"
  synced=$((synced + 1))
done

echo ""
echo "✨ 博客同步完成：$synced 篇文章已同步"
