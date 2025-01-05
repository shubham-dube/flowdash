'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure the component is mounted before rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  const renderIcon = (currentTheme: string) => {
    if (currentTheme === 'dark') {
      return <FaSun />;
    }
    return <FaMoon className="text-gray-800" />;
  };

  if (!mounted) {
    return null; // Avoid mismatches by not rendering until mounted
  }

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="bg-transparent flex items-center justify-center"
    >
      {renderIcon(theme || 'light')} {/* Provide a default fallback */}
    </button>
  );
};

export default ThemeToggle;
