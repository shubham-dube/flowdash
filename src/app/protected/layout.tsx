'use client';

import { useState } from "react";
import Sidebar from "../components/common/sidebar";
import MobileNav from "../components/common/mobileNav";
import Topbar from "../components/common/topbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [selectedTab, setTab] = useState("Dashboard");
  const [isFullScreen, setFullScreen] = useState(false);

  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);
  const changeTab = (tabName: string) => setTab(tabName);

  const toggleFullScreen = () => {
      if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
          setFullScreen(true);
      } else {
          if (document.exitFullscreen) {
              setFullScreen(false);
              document.exitFullscreen();
          }
      }
  };

  return (
    <div className="h-screen flex bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar
        isMobileOpen={isMobileOpen}
        selectedTab={selectedTab}
        toggleMobileSidebar={toggleMobileSidebar}
        changeTab={changeTab}
      />

      {/* Content Area */}
      <div className={`flex-1 flex flex-col md:ml-64 lg:mb-0 md:mb-0 mb-10 transition-all duration-300 ease-in-out overflow-auto`}>
        <Topbar
          toggleMobileSidebar={toggleMobileSidebar}
          selectedTab={selectedTab}
          changeTab={changeTab}
          toggleFullScreen={toggleFullScreen} 
          isFullScreen={isFullScreen}        
          />

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>

      {/* Mobile Navigation */}
      <MobileNav selectedTab={selectedTab} changeTab={changeTab} />
    </div>
  );
}
