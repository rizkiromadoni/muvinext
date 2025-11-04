import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { getSettings } from "@/actions";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const dynamic = "force-dynamic";

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
            forcedTheme="dark"
            disableTransitionOnChange
          >
            {children}
            {/* <div className="relative">
              <Sidebar />
              <div className="relative w-auto lg:ml-18">
                {children}
                <Footer />
              </div>
              <SidebarMobile />
            </div> */}
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
