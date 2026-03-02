#!/bin/bash
# 屿墨 - 生成每日工作总结草稿
# 由 AI 自动生成，小屿审核修改后发布

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

# 生成草稿（使用 OpenClaw 的 AI 能力）
cat > "$DRAFT_FILE" <<EOF
# $YESTERDAY 工作总结草稿

**状态**: 待审核 ⏳
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

## AI 生成的总结（待小屿审核修改）

> 📝 请小屿审核以下内容，修改后更新到 daily-summary.json

### 总结内容
[待 AI 生成 - 需要调用 OpenClaw API]

### 亮点
- [待补充]
- [待补充]
- [待补充]

### 数据
\`\`\`json
{
  "date": "$YESTERDAY",
  "content": "[待补充]",
  "highlights": [
    "[待补充]",
    "[待补充]",
    "[待补充]"
  ],
  "stats": {
    "activeAgents": $ACTIVE_AGENTS,
    "completedTasks": $COMPLETED_TASKS,
    "codeChanges": "[待补充]"
  }
}
\`\`\`

---

## 审核指南

1. 阅读原始数据，理解当天工作内容
2. 修改 AI 生成的总结，确保：
   - 语言自然流畅（小屿的口吻）
   - 突出重点工作和成果
   - 体现团队协作和进展
3. 补充亮点（3-5 条）
4. 补充代码变更量（如 +500 lines）
5. 将最终 JSON 复制到 daily-summary.json 的 summaries 数组开头
6. 删除此草稿文件

EOF

echo "✅ 草稿已生成: $DRAFT_FILE"
echo ""
echo "📋 下一步："
echo "1. 小屿审核并修改草稿"
echo "2. 将最终 JSON 添加到 src/data/daily-summary.json"
echo "3. 删除草稿文件"
echo ""
echo "💡 提示：可以让屿墨调用 AI API 自动生成总结内容"
