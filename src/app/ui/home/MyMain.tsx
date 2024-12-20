'use-client'

import Link from "next/link"

const MyMain = ()=>{
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-orange-200 dark:bg-gradient-to-br dark:from-blue-900 dark:to-orange-600">
        
        <h1 className="font-great-vibes text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Simplified Task Management with Team
        </h1>
        <h1 className="font-great-vibes text-4xl font-bold text-gray-800 dark:text-gray-200">
          Collaborate in Real Time
        </h1>
        
        <p className="mt-4 text-gray-600 dark:text-gray-200">
          Manage your tasks efficiently and collaborate in real-time.
        </p>
        <Link href="/signin">
          <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Get Started
          </button>
        </Link>
        <br />
        
      </main>
    )
}

export default MyMain;