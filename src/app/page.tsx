'use client';
import MyHeader from "./ui/home/MyHeader";
import MyMain from './ui/home/MyMain';

export default function HomePage() {
  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}>
      <MyHeader/>
      <MyMain/>
    </div>
  );
}
