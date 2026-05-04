import Hero from "@/components/ui/Hero";
import MissionSection from "@/components/ui/MissionSection";
import MinistriesGrid from "@/components/ui/MinistriesGrid";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Hero />
      <MissionSection />
      <MinistriesGrid />
    </div>
  );
}
