#!/bin/bash
# daily-update.sh - 网站每日完整更新（凌晨 1 点执行）
# 包含：工作日志 + 日报 + 碎碎念

set -euo pipefail

SITE_DIR="/root/projects/xiaoyu-site"
OPENCLAW_DIR="/root/.openclaw"
DATA_DIR="$SITE_DIR/src/data"
YESTERDAY=$(date -d "yesterday" +%Y-%m-%d 2>/dev/null || date -v-1d +%Y-%m-%d 2>/dev/null)
TODAY=$(date +%Y-%m-%d)

echo "🚀 开始每日完整更新（$YESTERDAY）"
echo ""

# ============================================
# 1. 提取工作日志（work-log.json）
# ============================================
echo "📋 [1/4] 提取工作日志..."
bash "$SITE_DIR/scripts/extract-daily.sh"
echo ""

# ============================================
# 2. 生成每日总结（daily-summary.json）
# ============================================
echo "📝 [2/4] 生成每日总结..."

python3 "$SITE_DIR/scripts/generate-daily-summary.py" "$YESTERDAY"

echo ""

# ============================================
# 3. 提取碎碎念（thoughts.json）
# ============================================
echo "💭 [3/4] 提取碎碎念..."

# 从小屿的每日笔记中提取碎碎念
XIAOYU_MEMORY="$OPENCLAW_DIR/workspace/memory/$YESTERDAY.md"

if [ -f "$XIAOYU_MEMORY" ]; then
  export XIAOYU_MEMORY YESTERDAY DATA_DIR
  python3 <<'PYTHON'
import json
import re
import os

memory_file = os.environ['XIAOYU_MEMORY']
yesterday = os.environ['YESTERDAY']
data_dir = os.environ['DATA_DIR']

# 读取每日笔记
with open(memory_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 提取最后一个 --- 分隔符后的内容（通常是总结或碎碎念）
parts = content.split('---')
if len(parts) > 1:
    last_part = parts[-1].strip()
    # 去掉记录人信息
    last_part = re.sub(r'\*记录人：.*\*', '', last_part).strip()
    
    if len(last_part) > 20 and len(last_part) < 500:
        # 读取现有 thoughts.json
        thoughts_json = os.path.join(data_dir, 'thoughts.json')
        with open(thoughts_json, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # 检查是否已存在该日期的条目
        existing_dates = [t['date'] for t in data['thoughts']]
        
        if yesterday not in existing_dates:
            # 获取下一个 ID
            max_id = max([int(t['id']) for t in data['thoughts']], default=0)
            next_id = str(max_id + 1).zfill(3)
            
            # 新条目
            new_thought = {
                "id": next_id,
                "date": yesterday,
                "content": last_part,
                "tags": ["日常", "工作"]
            }
            
            # 追加到开头
            data['thoughts'].insert(0, new_thought)
            
            # 只保留最近 20 条
            data['thoughts'] = data['thoughts'][:20]
            
            # 写回文件
            with open(thoughts_json, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            
            print('✅ thoughts.json 已更新')
        else:
            print('⚠️  该日期的碎碎念已存在，跳过')
    else:
        print('⚠️  未找到有效的碎碎念内容')
else:
    print('⚠️  未找到碎碎念分隔符')
PYTHON

else
  echo "⚠️  未找到小屿的每日笔记：$XIAOYU_MEMORY"
fi

echo ""

# ============================================
# 4. Git 提交并部署
# ============================================
echo "🚀 [4/4] Git 提交并部署..."

cd "$SITE_DIR"

# 检查是否有变更
if git diff --quiet src/data/; then
  echo "⚠️  没有数据变更，跳过提交"
else
  git add src/data/
  git commit -m "data: 每日更新 $YESTERDAY

- work-log.json: 工作日志
- daily-summary.json: 每日总结
- thoughts.json: 碎碎念

自动生成于 $(date '+%Y-%m-%d %H:%M:%S')"
  
  git push
  
  echo "✅ Git push 成功"
  echo "⏳ Cloudflare Pages 构建已触发"
fi

echo ""
echo "✨ 每日更新完成"
