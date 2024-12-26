import Link from "next/link";
import { FaTachometerAlt, FaTasks, FaProjectDiagram, FaBell, FaCog } from "react-icons/fa";

interface MobileNavProps {
    selectedTab: string;
    changeTab: (tabName: string) => void;
  }

const MobileNav: React.FC<MobileNavProps> = ({changeTab }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 shadow-md md:hidden">
      <div className="flex justify-between px-4 py-2">
        {[
          { name: "Dashboard", icon: <FaTachometerAlt />, href: "/dashboard" },
          { name: "Projects", icon: <FaProjectDiagram />, href: "/projects" },
          { name: "My Tasks", icon: <FaTasks />, href: "/tasks" },
          { name: "Notifications", icon: <FaBell />, href: "/profile" },
          { name: "Settings", icon: <FaCog />, href: "/settings" },
        ].map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex flex-col items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            onClick={() => changeTab(item.name)} >
            {item.icon}
            <span className="text-xs">{item.name}</span>
          </Link>
        ))}
        
      </div>
    </div>
  );
}

export default MobileNav;