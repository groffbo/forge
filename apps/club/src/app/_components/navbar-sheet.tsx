import Image from "next/image";
import Link from "next/link";

import { HamburgerMenuIcon } from "@forge/ui";
import { Button } from "@forge/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@forge/ui/sheet";

export default function MobileSheet({
  links,
}: {
  links: { name: string; href: string }[];
}) {
  return (
    <div className="flex items-center justify-center gap-4 md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="rounded-xl bg-violet-800">
            <HamburgerMenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"} className="bg-violet-950">
          <SheetHeader>
            <div className="flex h-full items-center justify-center py-2 hover:cursor-pointer md:hidden">
              <Link
                href="/"
                passHref
                legacyBehavior
                className="hover:cursor-pointer"
              >
                <Image
                  src="/logos/kh-banner-white.svg"
                  alt="kh-logo"
                  layout="fixed"
                  width={150}
                  height={100}
                  className="hover:cursor-pointer"
                />
              </Link>
            </div>
          </SheetHeader>
          <ul className="flex w-full flex-col items-center justify-center gap-4 py-8">
            {links.map((link) => (
              <li key={link.name} className="w-full text-center">
                <Link href={link.href} passHref legacyBehavior>
                  <Button variant="ghost" className="w-full text-xl text-white">
                    {link.name}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
          <SheetFooter>
            {" "}
            <Button size={"lg"}>Sign In</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
