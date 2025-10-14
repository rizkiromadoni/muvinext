import { getSettings } from "@/actions";
import SettingsForm from "@/components/settings-form";
import React from "react";

export const metadata = {
  title: "Settings",
  description: "Manage your website settings.",
};

const SettingsPage = async () => {
  const options = await getSettings();

  return (
    <div className="flex min-h-svh w-full justify-center p-6 md:p-10">
      <div className="w-full">
        <SettingsForm options={options} />
      </div>
    </div>
  );
};

export default SettingsPage;
