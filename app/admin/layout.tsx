import React from "react";

import { AdminSidebar } from "@/components/admin-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getSettings } from "@/models/settings";

export const dynamic = "force-dynamic";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const settings = await getSettings()
  const siteName = settings.find((item: any) => item.name === "site-name")?.value || "";

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AdminSidebar variant="inset" siteName={siteName} />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
