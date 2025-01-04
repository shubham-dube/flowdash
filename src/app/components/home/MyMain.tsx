'use-client'
import { useRouter } from "next/navigation";
import Spinner from '../common/circularLoadingIndicator';
import { useState } from "react";

const MyMain = ()=>{
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false)

  const handleClick = async (href:string) => {
    setLoading(true);
      router.push(href);
  };

    return (
        <main className="p-5 flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-orange-200 dark:bg-gradient-to-br dark:from-blue-900 dark:to-orange-600">
        
        <h1 className="font-great-vibes text-4xl font-bold text-center text-gray-800 dark:text-gray-200 mb-2">
          Simplified Task Management with Team
        </h1>
        <h1 className="font-great-vibes text-4xl font-bold text-center text-gray-800 dark:text-gray-200">
          Collaborate in Real Time
        </h1>
        
        <p className="mt-4 text-gray-600 dark:text-gray-200">
          Manage your tasks efficiently and collaborate in real-time.
        </p>
          <button onClick={()=>handleClick('/signin')} className=" flex mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          <Spinner className={`border-white h-5 w-5 ${isLoading? "block":"hidden"}` }/> {isLoading?"":"Get Started"}
          </button>
        <br />  
        
      </main>
    )
}

export default MyMain;