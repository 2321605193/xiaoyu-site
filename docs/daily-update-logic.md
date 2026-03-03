# 网站每日完整更新逻辑

## 概述
每天凌晨 1:00 自动执行完整更新，包含：
1. 工作日志（work-log.json）
2. 每日总结（daily-summary.json）
3. 碎碎念（thoughts.json）
4. Git 提交并部署

## 脚本位置
`/root/projects/xiaoyu-site/scripts/daily-update.sh`

## 数据来源

### 1. 工作日志（work-log.json）
- **来源**：所有 Agent 的 `workspace-*/memory/YYYY-MM-DD.md`
- **提取逻辑**：带 ✅ 或 - 的条目
- **过滤**：敏感信息（token/password/email/IP）
- **保留**：最近 7 天

### 2. 每日总结（daily-summary.json）
- **来源**：小屿的 `workspace/memory/YYYY-MM-DD-summary.md`
- **提取内容**：
  - 活跃 Agent 数
  - 完成任务数
  - Git commits
  - 关键成果（前 5 条）
- **保留**：最近 30 天

### 3. 碎碎念（thoughts.json）
- **来源**：小屿的 `workspace/memory/YYYY-MM-DD.md`
- **提取逻辑**：最后一个 `---` 分隔符后的内容
- **过滤**：去掉记录人信息，长度 20-500 字符
- **保留**：最近 20 条

## Cron 配置

```json
{
  "name": "网站每日更新",
  "schedule": {
    "kind": "cron",
    "expr": "0 1 * * *",
    "tz": "Asia/Shanghai"
  },
  "payload": {
    "kind": "agentTurn",
    "message": "执行网站每日完整更新：cd /root/projects/xiaoyu-site && bash scripts/daily-update.sh",
    "model": "elbnt-ai/claude-opus-4-6",
    "timeoutSeconds": 300
  },
  "sessionTarget": "isolated",
  "delivery": {
    "mode": "announce"
  }
}
```

## 执行流程

1. **01:00** - Cron 触发
2. **提取工作日志** - 扫描所有 Agent 的每日笔记
3. **生成每日总结** - 从小屿的汇总文件提取
4. **提取碎碎念** - 从小屿的每日笔记提取
5. **Git 提交** - 如果有数据变更
6. **推送部署** - Cloudflare Pages 自动构建

## 注意事项

1. **时间依赖**：必须在凌晨 1 点后执行，确保前一天的数据已完整
2. **文件依赖**：
   - 小屿必须在 23:30 前完成当天的汇总（`YYYY-MM-DD-summary.md`）
   - 所有 Agent 的每日笔记必须存在
3. **错误处理**：
   - 如果找不到汇总文件，跳过日报更新
   - 如果找不到碎碎念，跳过碎碎念更新
   - 如果没有数据变更，跳过 Git 提交

## 手动执行

```bash
cd /root/projects/xiaoyu-site
bash scripts/daily-update.sh
```

## 调试

查看最近一次执行结果：
```bash
openclaw cron runs <jobId> | head -50
```

---

*创建时间：2026-03-03 08:05*
*维护者：屿匠 🔧*
