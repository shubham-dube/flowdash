'use client';

import { useState } from "react";
import Sidebar from "../components/common/sidebar";
import MobileNav from "../components/common/mobileNav";
import Topbar from "../components/common/topbar";

export default function RootLayout({children}: {children: React.ReactNode;}) {

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [selectedTab, setTab] = useState("Dashboard");

  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);
  const changeTab = (tabName: string) => setTab(tabName);
  
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">

      <Sidebar isMobileOpen={isMobileOpen} selectedTab={selectedTab} 
      toggleMobileSidebar={toggleMobileSidebar} changeTab={changeTab} />

      <div className="flex-1 flex flex-col">
        <Topbar toggleMobileSidebar={toggleMobileSidebar} selectedTab={selectedTab} changeTab={changeTab} />
        {children}
      </div>

      <MobileNav selectedTab={selectedTab}  changeTab={changeTab}/>

    </div>
  );
}