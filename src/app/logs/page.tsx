'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, User } from 'lucide-react';
import { getWorkLog, getAgents } from '@/lib/data';

export default function LogsPage() {
  const workLog = getWorkLog();
  const agents = getAgents();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Group by date
  const groupedLogs = useMemo(() => {
    const filtered = workLog.filter(log => {
      const matchesSearch = searchQuery === '' || 
        log.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.agent.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesAgent = !selectedAgent || log.agent === selectedAgent;
      const matchesDate = !selectedDate || log.date === selectedDate;
      return matchesSearch && matchesAgent && matchesDate;
    });

    const grouped = new Map<string, typeof workLog>();
    filtered.forEach(log => {
      const date = log.date;
      if (!grouped.has(date)) grouped.set(date, []);
      grouped.get(date)!.push(log);
    });

    return Array.from(grouped.entries()).sort((a, b) => b[0].localeCompare(a[0]));
  }, [workLog, searchQuery, selectedAgent, selectedDate]);

  const dates = Array.from(new Set(workLog.map(l => l.date))).sort().reverse();
  const agentIds = Array.from(new Set(workLog.map(l => l.agent)));

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            工作日志
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            小屿团队的每日工作记录，透明化展示
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2" size={20} style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="搜索工作内容..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{
                background: 'var(--sea-card)',
                border: '1px solid var(--sea-border)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          {/* Agent & Date Filters */}
          <div className="flex flex-wrap gap-4">
            <select
              value={selectedAgent || ''}
              onChange={e => setSelectedAgent(e.target.value || null)}
              className="px-4 py-2 rounded-lg text-sm outline-none"
              style={{
                background: 'var(--sea-card)',
                border: '1px solid var(--sea-border)',
                color: 'var(--text-primary)',
              }}
            >
              <option value="">全部 Agent</option>
              {agentIds.map(id => {
                const agent = agents.find(a => a.id === id);
                return (
                  <option key={id} value={id}>
                    {agent?.emoji} {agent?.name || id}
                  </option>
                );
              })}
            </select>

            <select
              value={selectedDate || ''}
              onChange={e => setSelectedDate(e.target.value || null)}
              className="px-4 py-2 rounded-lg text-sm outline-none"
              style={{
                background: 'var(--sea-card)',
                border: '1px solid var(--sea-border)',
                color: 'var(--text-primary)',
              }}
            >
              <option value="">全部日期</option>
              {dates.map(date => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>

            {(searchQuery || selectedAgent || selectedDate) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedAgent(null);
                  setSelectedDate(null);
                }}
                className="px-4 py-2 rounded-lg text-sm transition-colors"
                style={{
                  background: 'rgba(34, 211, 238, 0.1)',
                  color: 'var(--brand-cyan)',
                }}
              >
                清除筛选
              </button>
            )}
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-12">
          {groupedLogs.map(([date, logs], i) => (
            <motion.div
              key={date}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <Calendar size={20} style={{ color: 'var(--brand-cyan)' }} />
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {date}
                </h2>
                <div className="flex-1 h-px" style={{ background: 'var(--sea-border)' }} />
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {logs.length} 条记录
                </span>
              </div>

              <div className="space-y-4">
                {logs.map((log, j) => {
                  const agent = agents.find(a => a.id === log.agent);
                  return (
                    <div
                      key={j}
                      className="p-4 rounded-xl"
                      style={{
                        background: 'var(--sea-card)',
                        border: '1px solid var(--sea-border)',
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{log.emoji || agent?.emoji || '🤖'}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                              {agent?.name || log.agent}
                            </span>
                          </div>
                          <p style={{ color: 'var(--text-secondary)' }}>{log.content}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {groupedLogs.length === 0 && (
          <div className="text-center py-16" style={{ color: 'var(--text-muted)' }}>
            没有找到匹配的工作记录
          </div>
        )}
      </div>
    </div>
  );
}
