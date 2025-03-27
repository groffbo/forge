import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@forge/auth";

import { api, HydrateClient } from "~/trpc/server";
import { TacoTuesday } from "../_components/discord-modal";
import { SessionNavbar } from "../_components/navigation/session-navbar";
import { UserInterface } from "../_components/user-interface";

export const metadata: Metadata = {
  title: "Blade | Dashboard",
  description: "Manage your Knight Hacks account.",
};

export default async function Dashboard() {
  const session = await auth();
  const isMember = await api.auth.getDiscordMemberStatus();
  
  // email test
  // commented out because it will send an email every time the page is loaded
  // const sendGmail = await api.email.sendEmail({to: "test@email.com", subject: "Test", body: "This is a test email"});

  if (!session) {
    redirect("/");
  }

  return (
    <HydrateClient>
      <SessionNavbar />
      <main className="container h-screen py-16">
        <TacoTuesday initialState={!isMember} />
        <UserInterface />
      </main>
    </HydrateClient>
  );
}
