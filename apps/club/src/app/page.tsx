import { env } from "~/env";
import About from "./_components/landing/about";
import CalendarPage from "./_components/landing/calendar";
import Discover from "./_components/landing/discover";
import Hero from "./_components/landing/hero";
import Impact from "./_components/landing/impact";
import Sponsors from "./_components/landing/sponsors";
import { api } from "./trpc/server";

export default async function HomePage() {
  const [events, memberCount] = await Promise.all([
    api.event.getEvents.query(),
    api.member.getMemberCount.query(),
  ]);

  return (
    <main className="relative z-10 text-white">
      <div className="bg-gradient-to-b from-purple-900 to-[#1d1a2e]">
        <Hero bladeUrl={env.BLADE_URL} />
      </div>
      <div className="bg-gradient-to-b from-[#1d1a2e] to-[#24162e] md:pb-64 -mt-1 pt-1">
        <About />
      </div>
      <div className="bg-gradient-to-b from-[#24162e] via-[#1c182b] to-[#12101c] md:pb-64 -mt-1 pt-1">
        <Impact />
      </div>
      <div className="bg-gradient-to-b from-[#12101c] via-[#1d1530] to-[#281a37] md:pb-64 -mt-1 pt-1">
        <Sponsors />
      </div>
      <div className="bg-gradient-to-b from-[#281a37] via-[#2a1c3c] to-[#1b112b] md:pb-64 -mt-1 pt-1">
        <CalendarPage events={events} />
      </div>
      <div className="bg-gradient-to-b from-[#1b112b]  to-[#4c1d95] -mt-1 pt-1">
        <Discover memberCount={memberCount} />
      </div>
    </main>



  );
}
