import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import SidebarMobile from "@/components/SidebarMobile";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { getSettings } from "@/actions";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return {
    title: {
      default: settings.find((item: any) => item.name === "site-title")?.value ||
      "NextJS",
      template: settings.find((item: any) => item.name === "site-template")?.value || undefined,
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
      url:
        settings.find((item: any) => item.name === "site-url")?.value ||
        "http://localhost:3000",
      siteName:
        settings.find((item: any) => item.name === "site-name")?.value ||
        "NextJS",
      locale:
        settings.find((item: any) => item.name === "site-locale")?.value ||
        "en_US",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();
  const footScript = settings.find(
    (item: any) => item.name === "footer-script"
  )?.value;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} antialiased`}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative">
              <Sidebar />
              <div className="relative w-auto lg:ml-18">
                {children}
                <Footer />
              </div>
              <SidebarMobile />
            </div>
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
        {footScript && footScript.length > 0 && (
          <div dangerouslySetInnerHTML={{ __html: footScript }} />
        )}
      </body>
    </html>
  );
}
