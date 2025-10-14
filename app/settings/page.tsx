import SettingsForm from "@/components/settings-form";
import React from "react";

export const metadata = {
  title: "Settings",
  description: "Manage your website settings.",
};

const SettingsPage = async () => {
  const res = await fetch(new URL("/api/settings", process.env.NEXT_PUBLIC_SITE_URL!), {
    method: "GET",
    cache: "no-store",
  });
  const options = await res.json();

  return (
    <div className="flex min-h-svh w-full justify-center p-6 md:p-10">
      <div className="w-full">
        <SettingsForm options={options} />
      </div>
    </div>
  );
};

export default SettingsPage;
