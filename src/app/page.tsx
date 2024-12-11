'use client';

import ThemeToggle from "@/app/utils/toggleTheme";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="p-4 border-b dark:border-gray-700">
        <h1 className="text-xl font-bold">Task Manager</h1>
        <ThemeToggle/>
      </header>
      <main className="p-4">
        <p>Welcome to the Task Manager! Use the navigation to explore features.</p>
      </main>
      <footer className="p-4 border-t dark:border-gray-700 text-center">
        <small>&copy; 2024 Task Manager. All rights reserved.</small>
      </footer>
    </div>
  );
}
