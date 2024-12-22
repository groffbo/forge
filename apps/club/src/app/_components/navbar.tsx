"use client";

import type { MotionValue } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

import { cn } from "@forge/ui";
import { Button } from "@forge/ui/button";

import MobileSheet from "./navbar-sheet";

const links = [
  { name: "About", href: "/about" },
  { name: "Team", href: "/team" },
  { name: "Hackathons", href: "/hackathons" },
  { name: "Links", href: "/links" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const { scrollY }: { scrollY: MotionValue<number> } = useScroll();
  const [hidden, setHidden] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    if (previous && latest > previous && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <>
      <motion.nav
        animate={{ y: hidden ? "-100%" : 0 }}
        transition={{ type: "tween", duration: 0.2 }}
        className={cn(
          "fixed z-50 flex h-16 w-full items-center justify-between overflow-hidden bg-violet-950 px-2 md:px-4",
        )}
      >
        <div className="hidden h-full items-center justify-center py-2 hover:cursor-pointer md:flex">
          <Link
            href="/"
            passHref
            legacyBehavior
            className="hover:cursor-pointer"
          >
            <Image
              src="/logos/kh-banner-white.svg"
              alt="kh-logo"
              width={200}
              height={250}
              className="hover:cursor-pointer md:p-6"
            />
          </Link>
        </div>
        <MobileSheet links={links} />
        <div className="hidden md:flex">
          <ul className="flex items-center space-x-4">
            {links.map((link) => (
              <li key={link.name}>
                <Link href={link.href} passHref legacyBehavior>
                  <Button variant="ghost" className="text-lg text-white">
                    {link.name}
                  </Button>
                </Link>
              </li>
            ))}
            <Button
              className="rounded-xl bg-violet-800 text-xl text-white"
              size={"lg"}
            >
              Sign In
            </Button>
          </ul>
        </div>
      </motion.nav>
    </>
  );
}
