'use client';

import { useTheme } from 'next-themes';
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const renderIcon = (theme:string)=>{
    if(theme === 'dark'){
      return <FaSun/>;
    } else return <FaMoon className="text-gray-800"/>;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="bg-transparent flex items-center justify-center"
    >
      {theme && renderIcon(theme as string)}
    </button>
  );
};

export default ThemeToggle;
