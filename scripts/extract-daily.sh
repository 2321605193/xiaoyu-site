#!/bin/bash
# extract-daily.sh - 从 Agent memory 提取工作记录，生成网站数据
# 每天 23:00 由 OpenClaw Cron 触发

set -euo pipefail

SITE_DIR="/root/projects/xiaoyu-site"
OPENCLAW_DIR="/root/.openclaw"
DATA_DIR="$SITE_DIR/src/data"
TODAY=$(date +%Y-%m-%d)

# Agent 配置: workspace目录名 -> Agent信息
declare -A AGENT_NAMES=(
  ["workspace"]="小屿"
  ["workspace-coder"]="屿匠"
  ["workspace-writer"]="屿墨"
  ["workspace-designer"]="屿绘"
  ["workspace-growth"]="屿潮"
  ["workspace-finance"]="屿算"
  ["workspace-security"]="屿盾"
  ["workspace-ops"]="屿舵"
  ["workspace-wechat-mp"]="屿微"
  ["workspace-zhihu"]="屿知"
  ["workspace-xiaohongshu"]="屿薯"
  ["workspace-twitter"]="屿推"
  ["workspace-short-video"]="屿映"
  ["workspace-juejin"]="屿掘"
  ["workspace-bilibili-yt"]="屿播"
  ["workspace-weibo"]="屿风"
)

declare -A AGENT_EMOJIS=(
  ["workspace"]="🏝️"
  ["workspace-coder"]="🔧"
  ["workspace-writer"]="✒️"
  ["workspace-designer"]="🎨"
  ["workspace-growth"]="📈"
  ["workspace-finance"]="💰"
  ["workspace-security"]="🛡️"
  ["workspace-ops"]="⚙️"
  ["workspace-wechat-mp"]="📱"
  ["workspace-zhihu"]="💡"
  ["workspace-xiaohongshu"]="📕"
  ["workspace-twitter"]="🐦"
  ["workspace-short-video"]="🎬"
  ["workspace-juejin"]="⛏️"
  ["workspace-bilibili-yt"]="📺"
  ["workspace-weibo"]="🌊"
)

# 敏感词过滤列表
SENSITIVE_PATTERNS="token|password|passwd|secret|api_key|apikey|private_key|ssh_key|credential|auth_token|bearer|access_key|gmail|oauth|client_id|project_id|fj2321|fanjun|email=|git config|git init.*remote|copper-vertex|serpapi|keyring|密码|密钥|私钥|凭据|授权"

echo "[$(date)] 开始提取每日工作记录..."

# === 提取工作日志 ===
WORKLOG_JSON="$DATA_DIR/work-log.json"

# 初始化 JSON
echo '{"generated":"'"$TODAY"'","days":[' > "$WORKLOG_JSON"

FIRST_DAY=true
# 提取最近 7 天的记录
for OFFSET in $(seq 0 6); do
  DATE=$(date -d "$TODAY - $OFFSET days" +%Y-%m-%d 2>/dev/null || date -v-${OFFSET}d +%Y-%m-%d 2>/dev/null)
  
  ENTRIES=""
  FIRST_ENTRY=true
  
  for WS_DIR in "$OPENCLAW_DIR"/workspace*/; do
    WS_NAME=$(basename "$WS_DIR")
    MEMORY_FILE="$WS_DIR/memory/$DATE.md"
    
    if [ ! -f "$MEMORY_FILE" ]; then
      continue
    fi
    
    AGENT_NAME="${AGENT_NAMES[$WS_NAME]:-$WS_NAME}"
    AGENT_EMOJI="${AGENT_EMOJIS[$WS_NAME]:-📋}"
    
    # 提取带 ✅ 或 - 的条目，过滤敏感信息
    while IFS= read -r line; do
      # 清理行首标记
      CONTENT=$(echo "$line" | sed 's/^[[:space:]]*[-*✅⚠️📌●·]*//' | sed 's/^[[:space:]]*//')
      
      # 跳过空行
      [ -z "$CONTENT" ] && continue
      
      # 安全过滤
      if echo "$CONTENT" | grep -qiE "$SENSITIVE_PATTERNS"; then
        continue
      fi
      
      # 跳过标题行
      if echo "$line" | grep -qE "^#+"; then
        continue
      fi
      
      # 转义 JSON 特殊字符
      CONTENT=$(echo "$CONTENT" | sed 's/\\/\\\\/g; s/"/\\"/g; s/\t/\\t/g')
      
      if [ "$FIRST_ENTRY" = true ]; then
        FIRST_ENTRY=false
      else
        ENTRIES="$ENTRIES,"
      fi
      
      ENTRIES="$ENTRIES{\"agent\":\"$AGENT_NAME\",\"emoji\":\"$AGENT_EMOJI\",\"content\":\"$CONTENT\"}"
      
    done < <(grep -E "^[[:space:]]*[-*✅⚠️📌]" "$MEMORY_FILE" 2>/dev/null || true)
  done
  
  if [ -n "$ENTRIES" ]; then
    if [ "$FIRST_DAY" = true ]; then
      FIRST_DAY=false
    else
      echo "," >> "$WORKLOG_JSON"
    fi
    echo "{\"date\":\"$DATE\",\"entries\":[$ENTRIES]}" >> "$WORKLOG_JSON"
  fi
done

echo "]}" >> "$WORKLOG_JSON"

# 验证 JSON
if python3 -m json.tool "$WORKLOG_JSON" > /dev/null 2>&1; then
  echo "[$(date)] work-log.json 生成成功"
else
  echo "[$(date)] ⚠️ work-log.json JSON 格式异常，尝试修复..."
  python3 -c "
import json
with open('$WORKLOG_JSON', 'r') as f:
    content = f.read()
# 尝试修复常见问题
content = content.replace(',]', ']').replace(',}', '}')
data = json.loads(content)
with open('$WORKLOG_JSON', 'w') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
print('修复成功')
" 2>&1 || echo "修复失败，保留原文件"
fi

echo "[$(date)] 提取完成"
echo "[$(date)] work-log.json: $(wc -c < "$WORKLOG_JSON") bytes"
