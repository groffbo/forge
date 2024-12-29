"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/react";

export default function DashboardComponent() {
  const router = useRouter();

  const { data: member, isLoading } = api.member.getMember.useQuery();
  const qrCode = api.qr.getQRCode.useQuery();

  if (isLoading) {
    return <div>Loading..</div>;
  }

  if (!member) {
    router.push("/");
    return <div>You are not a member! Sign up to be one!</div>;
  }

  return (
    <div>
      <Image
        src={"/tk-dashboard-img.svg"}
        alt="A picture of Tech Knight"
        width={200}
        height={200}
      />
      <div className="top-p flex justify-end pr-28">
        {qrCode ? (
          <Image
            src={qrCode.data?.qrCodeUrl}
            alt="User QR Code"
            width={200}
            height={200}
          />
        ) : (
          <p>No QR code found</p>
        )}
      </div>
      <h1>Dashboard</h1>
      <h1>Welcome {member.firstName}!</h1>
    </div>
  );
}
