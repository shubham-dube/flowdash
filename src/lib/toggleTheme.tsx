'use client';

import { useTheme } from 'next-themes';
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="bg-transparent flex items-center justify-center"
    >
      {theme === 'dark' ? <FaSun/> : <FaMoon className="text-gray-800"/>}
    </button>
  );
};

export default ThemeToggle;
