'use client';

import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import Sidebar from "../components/common/sidebar";
import MobileNav from "../components/common/mobileNav";
import Topbar from "../components/common/topbar";
import PrivateRoute from "../../lib/PrivateRoute";
import { Realtime } from "ably";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [selectedTab, setTab] = useState("Dashboard");
  const [isFullScreen, setFullScreen] = useState(false);

  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);
  const changeTab = (tabName: string) => {
    setTab(tabName);
  };

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

  const token: string | undefined = Cookies.get('jwtToken') ;

  const ably = new Realtime({ key: process.env.NEXT_PUBLIC_ABLY_API_KEY }); 
  const userChannel = ably.channels.get('user-presence');

  const sendPresenceUpdate = (isActive: boolean) => {
    if (!token) return;
  
    const jwtPayload: JWTPayload = jwt.decode(token) as JWTPayload;
  
    userChannel.publish('update-presence', {
      userId: jwtPayload._id,
      isActive,
      lastActiveAt: new Date().toISOString(),
    });
  };
  
  useEffect(() => {
    sendPresenceUpdate(true);
  
    const handleVisibilityChange = () => {
      sendPresenceUpdate(document.visibilityState === 'visible');
    };
  
    const handleBeforeUnload = () => {
      sendPresenceUpdate(false);
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);
  
    return () => {
      sendPresenceUpdate(false);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <PrivateRoute><main className="flex-1 overflow-y-auto">{children}</main></PrivateRoute>
      </div>

      {/* Mobile Navigation */}
      <MobileNav selectedTab={selectedTab} changeTab={changeTab} />
    </div>
  );
}
