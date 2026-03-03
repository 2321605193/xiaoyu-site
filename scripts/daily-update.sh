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

# 检查小屿是否已生成汇总
SUMMARY_FILE="$OPENCLAW_DIR/workspace/memory/$YESTERDAY-summary.md"

if [ -f "$SUMMARY_FILE" ]; then
  echo "✅ 找到小屿生成的汇总：$SUMMARY_FILE"
  
  # 使用 Python 直接处理文件，避免 shell 转义问题
  export SUMMARY_FILE YESTERDAY DATA_DIR
  python3 <<'PYTHON'
import json
import re
import os
from datetime import datetime

summary_file = os.environ['SUMMARY_FILE']
yesterday = os.environ['YESTERDAY']
data_dir = os.environ['DATA_DIR']

# 读取汇总文件
with open(summary_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 提取关键成果作为亮点
highlights = []
if '## 🎯 关键成果' in content:
    results_section = content.split('## 🎯 关键成果')[1].split('---')[0]
    for line in results_section.split('\n'):
        match = re.match(r'^\d+\.\s+\*\*(.+?)\*\*', line)
        if match:
            highlights.append(match.group(1).split('：')[0])

# 提取统计数据
active_agents = 0
completed_tasks = 0
code_changes = "N/A"

if '## 📊 整体数据' in content:
    stats_section = content.split('## 📊 整体数据')[1].split('---')[0]
    
    match = re.search(r'活跃 Agent 数\*\*：(\d+)', stats_section)
    if match:
        active_agents = int(match.group(1))
    
    match = re.search(r'完成任务数\*\*：(\d+)', stats_section)
    if match:
        completed_tasks = int(match.group(1))
    
    match = re.search(r'Git commits\*\*：([^\n]+)', stats_section)
    if match:
        code_changes = match.group(1).strip()

# 生成简短总结（从整体数据或关键成果提取）
summary_content = f"{active_agents} 个 Agent 活跃，完成 {completed_tasks}+ 项任务。"
if highlights:
    summary_content += " 主要成果：" + "、".join(highlights[:3]) + "。"

# 读取现有 daily-summary.json
summary_json = os.path.join(data_dir, 'daily-summary.json')
with open(summary_json, 'r', encoding='utf-8') as f:
    data = json.load(f)

# 新条目
new_entry = {
    "date": yesterday,
    "content": summary_content,
    "highlights": highlights[:5],
    "stats": {
        "activeAgents": active_agents,
        "completedTasks": completed_tasks,
        "codeChanges": code_changes
    }
}

# 检查是否已存在该日期的条目
existing_dates = [s['date'] for s in data['summaries']]
if yesterday in existing_dates:
    # 更新现有条目
    for i, s in enumerate(data['summaries']):
        if s['date'] == yesterday:
            data['summaries'][i] = new_entry
            break
else:
    # 追加到开头
    data['summaries'].insert(0, new_entry)

# 只保留最近 30 天
data['summaries'] = data['summaries'][:30]

# 更新生成时间
data['generated'] = datetime.now().strftime('%Y-%m-%dT%H:%M:%S+08:00')

# 写回文件
with open(summary_json, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print('✅ daily-summary.json 已更新')
PYTHON

else
  echo "⚠️  未找到小屿汇总，跳过日报更新"
fi

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
