import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

import AudienceSection from "@/components/LandingPage/components/AudienceSection";
import Hero from "@/components/LandingPage/components/HeroPage";
import LegacySection from "@/components/LandingPage/components/LegacySection";
import OriginSection from "@/components/LandingPage/components/OriginSection";
import PromiseSection from "@/components/LandingPage/components/PromiseSection";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="w-full h-full">



      {/* Main Sections */}
      <Hero />
      <OriginSection />
      <AudienceSection />
      <PromiseSection />
      <LegacySection />

    </div>
  );
}