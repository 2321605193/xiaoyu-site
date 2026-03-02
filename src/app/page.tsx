import { Hero } from "@/components/home/Hero";
import { TeamMatrix } from "@/components/home/TeamMatrix";
import { DailyReport } from "@/components/home/DailyReport";
import { AboutFounder } from "@/components/home/AboutFounder";
import Projects from "@/components/home/Projects";
import { ContactSection } from "@/components/home/ContactSection";
import { getAgentsData } from "@/lib/data";

export default function Home() {
  const agentsData = getAgentsData();

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

      <DailyReport />

      {/* Divider */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-sea-border to-transparent" />
      </div>

      <AboutFounder />

      {/* Divider */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-sea-border to-transparent" />
      </div>

      <Projects />

      {/* Divider */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-sea-border to-transparent" />
      </div>

      <ContactSection />
    </>
  );
}
