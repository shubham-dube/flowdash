'use client';
import MyHeader from "./components/home/MyHeader";
import MyMain from './components/home/MyMain';

export default function HomePage() {
  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}>
      <MyHeader/>
      <MyMain/>
    </div>
  );
}
