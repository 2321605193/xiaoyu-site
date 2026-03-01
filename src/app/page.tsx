import { Hero } from "@/components/home/Hero";
import { TeamMatrix } from "@/components/home/TeamMatrix";
import { WorkLog } from "@/components/home/WorkLog";
import { getAgentsData, getRecentDays } from "@/lib/data";

export default function Home() {
  const agentsData = getAgentsData();
  const recentDays = getRecentDays(3);

  return (
    <>
      <Hero />

      {/* Divider */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-sea-border to-transparent" />
      </div>

      <TeamMatrix levels={agentsData.levels} />

      {/* Divider */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-sea-border to-transparent" />
      </div>

      <WorkLog days={recentDays} />
    </>
  );
}
