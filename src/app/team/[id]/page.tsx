import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { StatusDot } from "@/components/ui/StatusDot";
import { Tag } from "@/components/ui/Tag";
import { getAllAgents, getAgentById, getAgentLevel, getAgentWorkLog } from "@/lib/data";
import { filterSensitiveEntries } from "@/lib/sensitive-filter";

export function generateStaticParams() {
  return getAllAgents().map((agent) => ({
    id: agent.id,
  }));
}

export function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  // Next.js 15: params is async but generateMetadata can handle promises
  // We use a sync fallback for static generation
  return params.then(({ id }) => {
    const agent = getAgentById(id);
    if (!agent) return { title: "Agent 未找到" };
    return {
      title: `${agent.emoji} ${agent.name} — 小屿团队`,
      description: agent.role,
    };
  });
}

export default async function AgentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const agent = getAgentById(id);

  if (!agent) {
    notFound();
  }

  const level = getAgentLevel(id);
  const workLog = getAgentWorkLog(agent.name);

  return (
    <div className="min-h-screen px-6 pb-24 pt-32">
      <div className="mx-auto max-w-3xl">
        {/* Back */}
        <Link
          href="/team"
          className="mb-10 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-brand-cyan"
        >
          <ArrowLeft size={16} />
          返回团队
        </Link>

        {/* Profile */}
        <div className="mb-10 rounded-2xl border border-sea-border bg-sea-card p-8">
          <div className="flex items-start gap-6">
            <span className="text-7xl">{agent.emoji}</span>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">{agent.name}</h1>
                <StatusDot status={agent.status} showLabel size="md" />
              </div>
              {level && (
                <span className="mt-1 inline-block text-sm text-text-secondary">
                  {level}
                </span>
              )}
              <p className="mt-3 text-lg text-text-secondary">{agent.role}</p>

              <div className="mt-2 text-xs text-text-secondary/60">
                Agent ID:{" "}
                <code className="rounded bg-sea-deep px-2 py-0.5 font-mono text-brand-cyan">
                  {agent.id}
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-10">
          <h2 className="mb-4 text-xl font-semibold">技能标签</h2>
          <div className="flex flex-wrap gap-2">
            {agent.tags.map((tag) => (
              <Tag key={tag} variant="cyan">
                {tag}
              </Tag>
            ))}
          </div>
        </div>

        {/* Work log */}
        <div>
          <h2 className="mb-4 text-xl font-semibold">最近工作日志</h2>
          {workLog.length === 0 ? (
            <p className="text-sm text-text-secondary">暂无工作记录</p>
          ) : (
            <div className="space-y-6">
              {workLog.slice(0, 5).map((day) => (
                <div key={day.date}>
                  <h3 className="mb-3 text-sm font-medium text-text-secondary">
                    {day.date}
                  </h3>
                  <div className="space-y-2 border-l-2 border-sea-border pl-4">
                    {filterSensitiveEntries(day.entries).map((entry, i) => (
                      <div
                        key={i}
                        className="text-sm leading-relaxed text-text-secondary"
                      >
                        {entry.content}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
