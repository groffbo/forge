"use client";

import React from "react";
import Link from "next/link";
import HeroSVG from "./hero-assets/hero-icon";
import TypingText from "./hero-assets/typing-text";
import CoolButton from "./assets/coolbutton";

const Hero = ({bladeUrl  }: { bladeUrl: string }) => {
  return (
    <section className="relative min-h-screen px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid min-h-[calc(100vh-6rem)] items-center gap-8 lg:grid-cols-2">
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <h1 className="font-pragati mb-6 text-2xl font-bold leading-tight tracking-tight text-white [text-shadow:0px_0px_40px_#6B21A8,0px_0px_20px_#6B21A8,0px_0px_10px_#6B21A8] md:text-5xl lg:text-6xl">
              Bridging the gap between the classroom and the tech industry
            </h1>
            <TypingText
              text="Empowering students with real-world skills and industry connections"
              className="mb-8 text-xl text-gray-300 md:text-xl"
              repeat={false}
            />
            <div className="relative z-0 mt-8 flex max-w-max cursor-pointer items-center overflow-hidden rounded-lg p-[3px]">
              <div className="moving-border absolute inset-0 h-full w-full rounded-lg bg-[conic-gradient(from_0deg,#9722b6_20deg,#8b5cf6_140deg,transparent_240deg)]" />
              <div className="relative z-10">
                <Link href={bladeUrl}>
                  <CoolButton label="Get Started" />
                </Link>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative">
              <HeroSVG className="relative mx-auto h-full w-full max-w-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
