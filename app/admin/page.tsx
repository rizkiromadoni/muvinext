import { SiteHeader } from "@/components/site-header";
import { IconNews, IconSettings } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <>
      <SiteHeader title="Welcome" />
      <div className="absolute flex top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center
       gap-4">
        <Link className="rounded-md w-36 h-36 flex flex-col items-center justify-center border gap-2 hover:bg-sidebar-accent" href="/admin/blogs">
          <IconNews className="w-12 h-12 text-muted-foreground" />
          <span className="text-small font-medium text-muted-foreground">Blogs</span>
        </Link>
        <Link className="rounded-md w-36 h-36 flex flex-col items-center justify-center border gap-2 hover:bg-sidebar-accent" href="/admin/settings">
          <IconSettings className="w-12 h-12 text-muted-foreground" />
          <span className="text-small font-medium text-muted-foreground">Settings</span>
        </Link>
      </div>
    </>
  );
};

export default Page;
