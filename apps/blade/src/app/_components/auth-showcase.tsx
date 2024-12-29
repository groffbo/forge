import { auth, signIn, signOut } from "@forge/auth";
import { Button } from "@forge/ui/button";

import { api } from "~/trpc/server";
import TestConnection from "../../../../../packages/api/src/minio/minio-client";

export async function AuthShowcase() {
  const session = await auth();

  const generateQRCode = async () => {
    await api.qr.createQRCode();
  };

  const isMember = async () => {
    const member = await api.member.getMember();

    if (!member) {
      await api.qr.generateQRCodeAndUpload();
    }
  };

  if (!session) {
    return (
      <form>
        <Button
          size="lg"
          formAction={async () => {
            "use server";
            await signIn("discord");
          }}
        >
          Sign in with Discord
        </Button>
      </form>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        <span>Logged in as {session.user.name}</span>
      </p>

      <form>
        <Button
          size="lg"
          formAction={async () => {
            "use server";
            await signOut();
          }}
        >
          Sign out
        </Button>
        {generateQRCode()}
        {TestConnection()}
        {isMember()}
      </form>
    </div>
  );
}
