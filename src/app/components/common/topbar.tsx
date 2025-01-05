'use client';

import ThemeToggle from "../../../lib/toggleTheme";
import Link from "next/link";
import { FaCompress, FaExpand } from "react-icons/fa";
import { FiMenu, FiBell, FiUser } from "react-icons/fi";

interface TopbarProps {
  toggleMobileSidebar: () => void;
  selectedTab: string;
  changeTab: (tabName: string) => void;
  toggleFullScreen: () => void;
  isFullScreen: boolean;
}

const Topbar: React.FC<TopbarProps> = ({ toggleMobileSidebar, selectedTab, changeTab, toggleFullScreen, isFullScreen }) => {
  return (
    <header className="bg-white w-full dark:bg-gray-800 shadow-md">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">

        <div className="flex items-center gap-4">
          <FiMenu
            className="text-gray-800 dark:text-gray-100 cursor-pointer text-2xl md:hidden"
            onClick={toggleMobileSidebar}
          />
          <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            {selectedTab}
          </h1>
        </div>

        <div className="flex items-center gap-8">
          <button className="text-gray-700 dark:text-gray-200" onClick={() => { toggleFullScreen() }}>{!isFullScreen ? <FaExpand/> : <FaCompress />}</button>

          <ThemeToggle/>

            <Link href={"/notifications"} onClick={() => changeTab("Notifications")}>
                <FiBell className="text-gray-800 dark:text-gray-100 cursor-pointer text-xl" />
          </Link>
          
          <Link href={"/profile"} onClick={() => changeTab("Profile")}>
                <FiUser className="text-gray-800 dark:text-gray-100 cursor-pointer text-xl" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
