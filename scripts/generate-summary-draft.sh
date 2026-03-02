#!/bin/bash
# 屿墨 - 生成每日工作总结草稿（AI 增强版）
# 由 Claude Opus 4.6 自动生成草稿，小屿审核修改后发布

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
WORK_LOG="$PROJECT_ROOT/src/data/work-log.json"
SUMMARY_FILE="$PROJECT_ROOT/src/data/daily-summary.json"
DRAFT_DIR="$PROJECT_ROOT/drafts"

# 确保 drafts 目录存在
mkdir -p "$DRAFT_DIR"

# 获取昨天的日期（因为是凌晨 1 点运行，总结的是昨天的工作）
YESTERDAY=$(date -d "yesterday" +%Y-%m-%d)
DRAFT_FILE="$DRAFT_DIR/summary-$YESTERDAY.md"

echo "🎨 屿墨开始生成 $YESTERDAY 的工作总结草稿..."

# 提取昨天的工作记录
YESTERDAY_DATA=$(jq -r --arg date "$YESTERDAY" '
  .days[] | select(.date == $date) | .entries[] | 
  "- \(.agent) \(.emoji): \(.content)"
' "$WORK_LOG")

if [ -z "$YESTERDAY_DATA" ]; then
  echo "⚠️  没有找到 $YESTERDAY 的工作记录，跳过生成"
  exit 0
fi

# 统计数据
ACTIVE_AGENTS=$(jq -r --arg date "$YESTERDAY" '
  .days[] | select(.date == $date) | .entries | 
  map(.agent) | unique | length
' "$WORK_LOG")

COMPLETED_TASKS=$(jq -r --arg date "$YESTERDAY" '
  .days[] | select(.date == $date) | .entries | length
' "$WORK_LOG")

# 生成草稿文件（包含原始数据）
cat > "$DRAFT_FILE" <<EOF
# $YESTERDAY 工作总结草稿

**状态**: 待 AI 生成 🤖
**生成时间**: $(date '+%Y-%m-%d %H:%M:%S')
**生成者**: 屿墨 🎨

---

## 原始数据

### 统计
- 活跃 Agent: $ACTIVE_AGENTS 位
- 完成任务: $COMPLETED_TASKS 项

### 详细记录
$YESTERDAY_DATA

---

## AI 生成区域（待屿墨填充）

### 总结内容
[待生成]

### 亮点
- [待生成]
- [待生成]
- [待生成]

### 代码变更
[待生成]

---

## 最终 JSON（待小屿审核后添加到 daily-summary.json）

\`\`\`json
{
  "date": "$YESTERDAY",
  "content": "[待生成]",
  "highlights": [
    "[待生成]",
    "[待生成]",
    "[待生成]"
  ],
  "stats": {
    "activeAgents": $ACTIVE_AGENTS,
    "completedTasks": $COMPLETED_TASKS,
    "codeChanges": "[待生成]"
  }
}
\`\`\`

EOF

echo "✅ 草稿框架已生成: $DRAFT_FILE"
echo ""
echo "📝 草稿文件路径: $DRAFT_FILE"
echo "📊 统计: $ACTIVE_AGENTS 位 Agent，$COMPLETED_TASKS 项任务"
