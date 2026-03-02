#!/bin/bash
# 博客自动同步脚本
# 从屿墨 workspace 提取已完成文章，转换为 MDX 格式并发布到网站

set -e

WRITER_WORKSPACE="/root/.openclaw/workspace-writer"
ARTICLES_DIR="$WRITER_WORKSPACE/articles"
BLOG_DIR="/root/projects/xiaoyu-site/content/blog"
IMAGES_DIR="/root/projects/xiaoyu-site/public/images/blog"

# 确保目标目录存在
mkdir -p "$BLOG_DIR"
mkdir -p "$IMAGES_DIR"

# 定义文章元数据映射（手动维护）
# 格式：源文件名|slug|标题|日期|标签|描述|状态
declare -A ARTICLES=(
  ["bounty-hunter-13-v3.md"]="bounty-hunter-13|涨薪500块后，我用AI员工替代了3个外包|2026-03-02|AI编程,OpenClaw,一人公司|16个Agent的自我进化实战，从前端到AI编程的转型故事|published"
)

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

# 转换 Markdown 为 MDX
convert_to_mdx() {
  local source_file="$1"
  local metadata="$2"
  
  IFS='|' read -r slug title date tags description status <<< "$metadata"
  
  if [[ "$status" != "published" ]]; then
    echo "⏭️  跳过未发布文章: $source_file"
    return
  fi
  
  local target_file="$BLOG_DIR/${slug}.mdx"
  
  # 读取源文件内容
  local content=$(cat "$ARTICLES_DIR/$source_file")
  
  # 敏感信息过滤
  content=$(filter_sensitive "$content")
  
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
  
  echo "✅ 已同步: $source_file → ${slug}.mdx"
}

# 同步图片
sync_images() {
  if [[ -d "$ARTICLES_DIR/images" ]]; then
    cp -r "$ARTICLES_DIR/images/"* "$IMAGES_DIR/" 2>/dev/null || true
    echo "✅ 图片已同步"
  fi
}

# 主流程
echo "🚀 开始同步博客..."

for source_file in "${!ARTICLES[@]}"; do
  if [[ -f "$ARTICLES_DIR/$source_file" ]]; then
    convert_to_mdx "$source_file" "${ARTICLES[$source_file]}"
  else
    echo "⚠️  源文件不存在: $source_file"
  fi
done

sync_images

echo "✨ 博客同步完成"
