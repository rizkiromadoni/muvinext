import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import SidebarMobile from "@/components/SidebarMobile";
import { getSettings } from "@/models/settings";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return {
    title: {
      default:
        settings.find((item: any) => item.name === "site-title")?.value ||
        "NextJS",
      template:
        settings.find((item: any) => item.name === "site-template")?.value ||
        "%s",
    },
    description:
      settings.find((item: any) => item.name === "site-description")?.value ||
      "created by NextJS",
    openGraph: {
      title:
        settings.find((item: any) => item.name === "site-title")?.value ||
        "NextJS",
      description:
        settings.find((item: any) => item.name === "site-description")?.value ||
        "created by NextJS",
      url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      siteName:
        settings.find((item: any) => item.name === "site-name")?.value ||
        "NextJS",
      locale:
        settings.find((item: any) => item.name === "site-locale")?.value ||
        "en_US",
    },
  };
}

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const settings = await getSettings();
  const footScript = settings.find(
    (item: any) => item.name === "footer-script"
  )?.value;

  return (
    <>
      <div className="relative">
        <Sidebar />
        <div className="relative w-auto lg:ml-18">
          {children}
          <Footer />
        </div>
        <SidebarMobile />
      </div>
      {footScript && footScript.length > 0 && (
        <div dangerouslySetInnerHTML={{ __html: footScript }} />
      )}
    </>
  );
};

export default MainLayout;
