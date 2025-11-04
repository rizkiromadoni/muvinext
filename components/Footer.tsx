import React from "react";
import { getSetting } from "@/actions";
import { PopcornIcon } from "@phosphor-icons/react/dist/ssr";

const Footer = async () => {
  const siteNameDB = await getSetting("site-name");
  const siteName = siteNameDB || "Muvinext";

  return (
    <div className="p-10 mb-20 lg:mb-0 flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
          <PopcornIcon className="size-6" alt="Logo" />
        </div>
        {/* <Image src="/vercel.svg" className='w-8 h-8' width={40} height={40} alt={"Logo"} /> */}
        <span className="text-3xl font-bold">{siteName.toUpperCase()}</span>
      </div>
      <div className="text-xs">
        <p className="opacity-80">Made with Love By Anonymous</p>
        <p className="opacity-80">
          This project uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
      </div>
    </div>
  );
};

export default Footer;
