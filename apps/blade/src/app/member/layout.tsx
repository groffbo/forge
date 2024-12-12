import { SidebarProvider } from "@forge/ui/sidebar";

import { MemberSidebar } from "./_components/member-sidebar";

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <MemberSidebar />
      {children}
    </SidebarProvider>
  );
}
