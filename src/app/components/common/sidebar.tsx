'use client';

import { FiSettings, FiLogOut } from "react-icons/fi";
import { FaTachometerAlt, FaTasks, FaProjectDiagram, FaBell } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

interface SidebarProps {
  isMobileOpen: boolean;
  toggleMobileSidebar: () => void;
  selectedTab: string;
  changeTab: (tabName: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, toggleMobileSidebar, selectedTab, changeTab }) => {
  
  const navItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, href: "/dashboard" },
    { name: "Projects", icon: <FaProjectDiagram />, href: "/projects" },
    { name: "My Tasks", icon: <FaTasks />, href: "/tasks" },
    { name: "Notifications", icon: <FaBell />, href: "/profile" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 bg-white dark:bg-gray-800 shadow-md h-full">
        {renderSidebarContent()}
      </div>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-64 bg-white dark:bg-gray-800 shadow-md h-full">
            {renderSidebarContent()}
          </div>
          <div
            className="flex-1 bg-black bg-opacity-50"
            onClick={toggleMobileSidebar}
          ></div>
        </div>
      )}
    </>
  );

  function renderSidebarContent() {
    return (
      <>
        <div className="px-4 py-3">
          <div className="items-center flex gap-3 dark:hidden">
          <Image
                src="/logo-blue.png"
                alt="website-name"
                width={40} 
                height={40}
            />
          <Image
                src="/website-name-blue.png"
                alt="website-name"
                width={100} 
                height={16}
                className="mr-2" 
            />
          </div>
          <div className="items-center hidden dark:flex gap-3">
          <Image
                src="/logo-white.png"
                alt="website-name"
                width={40} 
                height={40}
            />
          <Image
                src="/website-name-white.png"
                alt="website-name"
                width={100} 
                height={16}
                className="mr-2" 
            />
          </div>
        </div>
        <div className="px-4 py-2">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none"
          />
        </div>
        <nav className="mt-6 space-y-2">
          {navItems.map((item, index) => (
            <Link
              key={index} href={item.href}
              className={`flex items-center gap-4 px-4 cursor-pointer py-3 text-gray-700 dark:text-gray-300 
              hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md ${selectedTab === item.name ? 'bg-gray-200 dark:bg-gray-700' : 'text-gray-800 dark:text-gray-100'}
              `} onClick={() => changeTab(item.name)} >

              {item.icon}
              <span>{item.name}</span>

            </Link>
          ))}
        </nav>
        <div className="absolute bottom-4 left-0 px-4">
          <Link
            href="/settings"
            className="flex items-center gap-4 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
          >
            <FiSettings />
            <span>Settings</span>
          </Link>

          <Link
            href="/logout"
            className="flex items-center gap-4 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
          >
            <FiLogOut />
            <span>Logout</span>
          </Link>
        </div>
      </>
    );
  }
};

export default Sidebar;
