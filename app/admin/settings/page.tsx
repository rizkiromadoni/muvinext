import React from "react";

import { prisma } from "@/lib/prisma";
import SettingsForm from "@/components/settings-form";
import { SiteHeader } from "@/components/site-header";

export const metadata = {
  title: "Settings",
  description: "Manage your website settings.",
};

const SettingsPage = async () => {
  const options = await prisma.settings.findMany();

  return (
    <>
    <SiteHeader title="Settings" />
    <div className="flex min-h-svh w-full justify-center p-6 md:p-10">
      <div className="w-full">
        <SettingsForm options={options} />
      </div>
    </div>
    </>
  );
};

export default SettingsPage;
