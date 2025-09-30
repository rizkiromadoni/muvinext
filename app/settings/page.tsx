import SettingsForm from "@/components/settings-form";
import React from "react";

const SettingsPage = () => {
  return (
    <div className="flex min-h-svh w-full justify-center p-6 md:p-10">
      <div className="w-full">
        <SettingsForm />
      </div>
    </div>
  );
};

export default SettingsPage;
