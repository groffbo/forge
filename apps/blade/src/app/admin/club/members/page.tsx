import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@forge/auth";

import { SIGN_IN_PATH } from "~/consts";
import { api, HydrateClient } from "~/trpc/server";
import MemberTable from "./_components/members-table";
import ScannerPopUp from "./_components/scanner";

export const metadata: Metadata = {
  title: "Blade | Members",
  description: "Manage Knight Hacks members.",
};

export default async function Members() {
  // authentication
  const session = await auth();
  if (!session) {
    redirect(SIGN_IN_PATH);
  }

  const isAdmin = await api.auth.getAdminStatus();
  if (!isAdmin) {
    redirect("/");
  }

  // if (isPending) return <div>Loading...</div>;
  // if (error) return <div>Error: {error?.message}</div>
  return (
    <HydrateClient>
      <main className="container h-screen">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="py-12">
            <h1 className="pb-4 text-center text-3xl font-extrabold tracking-tight sm:text-5xl">
              Member Dashboard
            </h1>
            <div className="mb-2 flex justify-center">
              <ScannerPopUp eventType="Member" />
            </div>
          </div>
        </div>
        <div className="rounded-xl pb-8">
          <MemberTable />
        </div>
      </main>
    </HydrateClient>
  );
}
