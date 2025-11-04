import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import SidebarMobile from "@/components/SidebarMobile";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <Sidebar />
      <div className="relative w-auto lg:ml-18">
        {children}
        <Footer />
      </div>
      <SidebarMobile />
    </div>
  );
};

export default MainLayout;
