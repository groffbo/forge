"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import SponsorCard from "./sponsors-assets/sponsor-card";

const companies = [
  { name: "BNY MELLON", logo: "/logos/bny-mellon.svg" },
  { name: "EA", logo: "/logos/ea.svg" },
  { name: "Facebook", logo: "/logos/facebook.svg" },
  { name: "Geico", logo: "/logos/geico.svg" },
  { name: "Google Cloud", logo: "/logos/google-cloud.svg" },
  { name: "IBM", logo: "/logos/ibm.svg" },
  { name: "Lockheed Martin", logo: "/logos/lockheed-martin.svg" },
  { name: "Microsoft", logo: "/logos/microsoft.svg" },
  { name: "Synopsys", logo: "/logos/synopsys.svg" },
];

export default function Sponsors() {
  gsap.registerPlugin(ScrollTrigger);

  const headerRef = useRef<HTMLDivElement>(null);
  const sponsorContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="flex flex-col items-center justify-center py-16 md:h-screen"
    >
      <h2
        ref={headerRef}
        className="mb-32 text-center font-pragati text-3xl font-bold md:pb-16 text-white drop-shadow-glow md:text-5xl"
      >
        Trusted by top companies
      </h2>

      <div
        ref={sponsorContainerRef}
        className="flex flex-wrap justify-center gap-6 px-4"
      >
        {companies.map((company) => (
          <SponsorCard
            key={company.name}
            sponsor={company.name}
            imgUrl={company.logo}
          />
        ))}
      </div>
    </section>
  );
}
