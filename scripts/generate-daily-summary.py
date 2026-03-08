#!/usr/bin/env python3
"""
generate-daily-summary.py - 自动聚合各 Agent memory 生成日报
不再依赖小屿手动写 summary 文件，直接从各 workspace 的 memory/ 提取

用法:
  python3 generate-daily-summary.py                  # 生成昨天的日报
  python3 generate-daily-summary.py 2026-03-05       # 生成指定日期
  python3 generate-daily-summary.py --backfill 7     # 回填最近 7 天
"""

import json
import os
import re
import sys
from datetime import datetime, timedelta
from pathlib import Path

OPENCLAW_DIR = "/root/.openclaw"
DATA_DIR = "/root/projects/xiaoyu-site/src/data"
SUMMARY_JSON = os.path.join(DATA_DIR, "daily-summary.json")

# Agent 配置
AGENTS = {
    "workspace": {"name": "小屿", "emoji": "🏝️"},
    "workspace-coder": {"name": "屿匠", "emoji": "🔧"},
    "workspace-writer": {"name": "屿墨", "emoji": "✒️"},
    "workspace-designer": {"name": "屿绘", "emoji": "🎨"},
    "workspace-growth": {"name": "屿潮", "emoji": "📈"},
    "workspace-finance": {"name": "屿算", "emoji": "💰"},
    "workspace-security": {"name": "屿盾", "emoji": "🛡️"},
    "workspace-ops": {"name": "屿舵", "emoji": "⚙️"},
    "workspace-wechat-mp": {"name": "屿微", "emoji": "📱"},
    "workspace-zhihu": {"name": "屿知", "emoji": "💡"},
    "workspace-xiaohongshu": {"name": "屿薯", "emoji": "📕"},
    "workspace-twitter": {"name": "屿推", "emoji": "🐦"},
    "workspace-short-video": {"name": "屿映", "emoji": "🎬"},
    "workspace-juejin": {"name": "屿掘", "emoji": "⛏️"},
    "workspace-bilibili-yt": {"name": "屿播", "emoji": "📺"},
    "workspace-weibo": {"name": "屿风", "emoji": "🌊"},
}

# 敏感词过滤
SENSITIVE_RE = re.compile(
    r"token|password|passwd|secret|api_key|apikey|private_key|ssh_key|"
    r"credential|auth_token|bearer|access_key|gmail|oauth|client_id|"
    r"project_id|fj2321|fanjun|email=|git config|copper-vertex|serpapi|"
    r"keyring|密码|密钥|私钥|凭据|授权",
    re.IGNORECASE,
)


def parse_memory_file(filepath: str) -> dict:
    """解析单个 Agent 的 memory 文件，提取任务和亮点"""
    if not os.path.exists(filepath):
        return {"tasks": [], "highlights": [], "has_content": False}

    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # 跳过几乎空的文件（只有标题）
    lines = [l.strip() for l in content.split("\n") if l.strip() and not l.strip().startswith("#")]
    if len(lines) < 3:
        return {"tasks": [], "highlights": [], "has_content": False}

    tasks = []
    highlights = []

    for line in content.split("\n"):
        stripped = line.strip()

        # 跳过空行、纯标题行
        if not stripped or stripped.startswith("# "):
            continue

        # 敏感信息过滤
        if SENSITIVE_RE.search(stripped):
            continue

        # 提取 ✅ 完成的任务作为亮点
        if "✅" in stripped:
            # 清理 markdown 格式：去掉列表符号、序号、✅
            clean = re.sub(r"^[\s\-*●·]+", "", stripped)
            clean = re.sub(r"^\d+\.\s*", "", clean)
            clean = clean.replace("✅", "").strip()
            clean = re.sub(r"\*\*(.+?)\*\*", r"\1", clean)  # 去粗体
            if clean and len(clean) > 5:
                tasks.append(clean)
                # 提取核心短语作为亮点
                short = clean.split("（")[0].split("—")[0].strip()
                # 如果以中文冒号结尾，保留完整
                if "：" in short and not short.endswith("："):
                    short = short  # 保留 "品牌首发文 #001 发布"
                elif "：" in short:
                    short = short.split("：")[0].strip()
                if 5 < len(short) < 60:
                    highlights.append(short)

        # 提取 ## 标题中的关键信息（非复盘/回顾类）
        elif stripped.startswith("## "):
            title = stripped.lstrip("# ").strip()
            # 去掉时间前缀 "01:00 xxx" -> "xxx"
            title = re.sub(r"^\d{2}:\d{2}\s+", "", title)
            if (title and len(title) > 3
                and not title.startswith("---")
                and "复盘" not in title
                and "回顾" not in title
                and "状态" not in title
                and "待办" not in title):
                tasks.append(title)

    return {
        "tasks": tasks,
        "highlights": highlights[:5],
        "has_content": bool(tasks),
    }


def try_parse_summary_file(summary_path: str):
    """尝试从小屿的 summary 文件解析（兼容多种格式）"""
    if not os.path.exists(summary_path):
        return None

    with open(summary_path, "r", encoding="utf-8") as f:
        content = f.read()

    result = {
        "active_agents": 0,
        "completed_tasks": 0,
        "code_changes": "N/A",
        "highlights": [],
    }

    # 提取活跃 Agent 数（兼容多种格式）
    m = re.search(r"活跃 Agent 数\*?\*?[：:]\s*(\d+)", content)
    if m:
        result["active_agents"] = int(m.group(1))

    # 提取完成任务数
    m = re.search(r"完成任务数\*?\*?[：:]\s*(\d+)", content)
    if m:
        result["completed_tasks"] = int(m.group(1))

    # 提取 Git commits
    m = re.search(r"Git commits\*?\*?[：:]\s*([^\n]+)", content)
    if m:
        result["code_changes"] = m.group(1).strip()

    # 提取关键成果
    for section_name in ["关键成果", "核心成果", "主要成果"]:
        if section_name in content:
            section = content.split(section_name, 1)[1]
            section = section.split("---")[0].split("\n## ")[0]
            for line in section.split("\n"):
                m = re.match(r"^\d+\.\s+\*\*(.+?)\*\*", line)
                if m:
                    result["highlights"].append(m.group(1).split("：")[0].split("—")[0].strip())

    # 验证是否有效
    if result["active_agents"] > 0 or result["highlights"]:
        return result
    return None


def generate_summary_for_date(date_str: str) -> dict:
    """为指定日期生成日报条目"""

    # 1. 先尝试从小屿 summary 文件解析
    summary_path = os.path.join(OPENCLAW_DIR, "workspace", "memory", f"{date_str}-summary.md")
    parsed = try_parse_summary_file(summary_path)

    # 2. 从各 Agent memory 聚合
    active_agents = []
    all_highlights = []
    total_tasks = 0

    for ws_name, info in AGENTS.items():
        memory_path = os.path.join(OPENCLAW_DIR, ws_name, "memory", f"{date_str}.md")
        result = parse_memory_file(memory_path)
        if result["has_content"]:
            active_agents.append(info["name"])
            total_tasks += len(result["tasks"])
            all_highlights.extend(result["highlights"])

    # 3. 合并数据（summary 文件优先，但用聚合数据补充）
    if parsed and parsed["active_agents"] > 0:
        active_count = parsed["active_agents"]
        task_count = parsed["completed_tasks"]
        # summary 文件的 highlights 也需要和聚合数据合并
        raw_highlights = (parsed["highlights"] or []) + all_highlights
        code_changes = parsed["code_changes"]
    else:
        active_count = len(active_agents)
        task_count = total_tasks
        raw_highlights = all_highlights
        code_changes = "N/A"

    # 去重 + 过滤低质量 highlights（先过滤，再截取）
    NOISE_PATTERNS = re.compile(
        r"^读取|^汇总|^检查|^记录|^更新.*看板$|生成日报|发送日报|发送给|每日复盘|"
        r"工作日志|自动触发|网站每日更新|提取.*json|Git 提交|git push|"
        r"Cron|触发.*构建|当前状态|工作回顾|记录人|^状态：|"
        r"推送到 GitHub|Cloudflare Pages 构建|创建《.*\.md》",
        re.IGNORECASE,
    )
    seen = set()
    highlights = []
    for h in raw_highlights:
        if h not in seen and not NOISE_PATTERNS.search(h):
            seen.add(h)
            highlights.append(h)
    highlights = highlights[:5]

    # 生成摘要文本
    if active_count > 0:
        content = f"{active_count} 个 Agent 活跃，完成 {task_count}+ 项任务。"
        if highlights:
            content += " 主要成果：" + "、".join(highlights[:3]) + "。"
    else:
        content = "无活跃记录。"

    return {
        "date": date_str,
        "content": content,
        "highlights": highlights,
        "stats": {
            "activeAgents": active_count,
            "completedTasks": task_count,
            "codeChanges": code_changes,
        },
    }


def update_summary_json(entries):
    """更新 daily-summary.json"""
    if os.path.exists(SUMMARY_JSON):
        with open(SUMMARY_JSON, "r", encoding="utf-8") as f:
            data = json.load(f)
    else:
        data = {"generated": "", "summaries": []}

    existing = {s["date"]: i for i, s in enumerate(data["summaries"])}

    for entry in entries:
        if entry["date"] in existing:
            data["summaries"][existing[entry["date"]]] = entry
            print(f"  更新: {entry['date']} ({entry['stats']['activeAgents']} agents, {entry['stats']['completedTasks']}+ tasks)")
        else:
            data["summaries"].append(entry)
            print(f"  新增: {entry['date']} ({entry['stats']['activeAgents']} agents, {entry['stats']['completedTasks']}+ tasks)")

    # 按日期降序排列
    data["summaries"].sort(key=lambda x: x["date"], reverse=True)

    # 保留最近 30 天
    data["summaries"] = data["summaries"][:30]

    # 更新时间戳
    data["generated"] = datetime.now().strftime("%Y-%m-%dT%H:%M:%S+08:00")

    with open(SUMMARY_JSON, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"✅ daily-summary.json 已更新 ({len(data['summaries'])} 条)")


def main():
    args = sys.argv[1:]

    if len(args) >= 2 and args[0] == "--backfill":
        days = int(args[1])
        print(f"📋 回填最近 {days} 天的日报...")
        entries = []
        for i in range(1, days + 1):
            date_str = (datetime.now() - timedelta(days=i)).strftime("%Y-%m-%d")
            entry = generate_summary_for_date(date_str)
            entries.append(entry)
        update_summary_json(entries)

    elif len(args) == 1 and not args[0].startswith("-"):
        date_str = args[0]
        print(f"📋 生成 {date_str} 的日报...")
        entry = generate_summary_for_date(date_str)
        update_summary_json([entry])

    else:
        yesterday = (datetime.now() - timedelta(days=1)).strftime("%Y-%m-%d")
        print(f"📋 生成昨天 ({yesterday}) 的日报...")
        entry = generate_summary_for_date(yesterday)
        update_summary_json([entry])


if __name__ == "__main__":
    main()
