const RecentCompletedTasksSkeleton = () => (
    <div className="flex flex-col space-y-4 lg:w-4/6 lg:mr-4">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg py-4 h-full animate-pulse">
        <div className="text-sm mb-4 text-center bg-gray-300 dark:bg-gray-700 h-5 w-1/4 mx-auto rounded"></div>
        <div>
          <div className="flex justify-between items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-sm font-medium">
            <span className="h-4 w-1/6 bg-gray-300 dark:bg-gray-700 rounded"></span>
            <span className="h-4 w-1/6 bg-gray-300 dark:bg-gray-700 rounded hidden lg:block"></span>
            <span className="h-4 w-1/6 bg-gray-300 dark:bg-gray-700 rounded hidden md:block"></span>
            <span className="h-4 w-1/6 bg-gray-300 dark:bg-gray-700 rounded"></span>
          </div>
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="flex justify-between items-center px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-sm">
                <span className="h-4 w-1/4 bg-gray-300 dark:bg-gray-700 rounded"></span>
                <span className="h-4 w-1/6 bg-gray-300 dark:bg-gray-700 rounded hidden lg:block"></span>
                <span className="h-4 w-1/4 bg-gray-300 dark:bg-gray-700 rounded hidden md:block"></span>
                <span className="h-4 w-1/4 bg-gray-300 dark:bg-gray-700 rounded"></span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
  
  export default RecentCompletedTasksSkeleton;