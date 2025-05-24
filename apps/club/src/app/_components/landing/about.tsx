"use client";

import NeonTkSVG from "./assets/neon-tk";
import SwordSVG from "./assets/sword";
import TerminalSVG from "./assets/terminal";

export default function About() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        <h1 className="font-pragati mb-16 text-2xl font-bold leading-tight tracking-tight text-white [text-shadow:0px_0px_40px_#6B21A8,0px_0px_20px_#6B21A8,0px_0px_10px_#6B21A8] md:text-5xl lg:text-6xl">
          ABOUT US
        </h1>

        <div className="relative">
          <p className="font-poppins px-4 text-lg font-semibold leading-relaxed tracking-wide text-white/80 md:px-12 md:text-2xl">
            <span className="bg-gradient-to-r from-purple-800 via-purple-300 to-white bg-clip-text font-black text-transparent">Knight Hacks</span> is the largest Software Development and only Hackathon
            organization at the University of Central Florida. Our mission is to
            serve the technologist community of Florida by running various
            workshops to sharpen technical skills, socials to help foster a
            passionate community, and projects/mentorship programs to help
            refine professional skills. Every October, we run our annual
            Hackathon, welcoming hundreds of passionate students from all
            throughout the nation to UCF for a weekend full of programming!
            Passion is contagious, and Knight Hacks is a super spreader.
          </p>
        </div>
      </div>

      <SwordSVG className="animate-float absolute -bottom-20 right-20 hidden h-auto w-full max-w-[400px] text-purple-400 opacity-50 md:block" />
      <NeonTkSVG className="animate-float absolute left-10 top-16 hidden h-[200px] w-full max-w-[400px] text-purple-400 opacity-50 md:block" />
      <TerminalSVG className="animate-float absolute -bottom-48 left-[-60px] hidden h-auto w-full max-w-[500px] text-purple-800 opacity-40 md:block" />


    </div>
  );
}
