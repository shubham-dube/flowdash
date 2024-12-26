'use client';

import ThemeToggle from "@/lib/toggleTheme";
import Link from "next/link";
import { FiMenu, FiBell, FiUser } from "react-icons/fi";

interface TopbarProps {
  toggleMobileSidebar: () => void;
  selectedTab: string;
  changeTab: (tabName: string) => void;
}

const Topbar: React.FC<TopbarProps> = ({ toggleMobileSidebar, selectedTab, changeTab }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
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
