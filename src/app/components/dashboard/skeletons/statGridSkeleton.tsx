

const StatGridSkelleton = () => {

  return (
    <div className="flex flex-col sm:flex-row space-y-5 sm:space-y-0 sm:space-x-5">
      {/* Skeleton Card */}
      {[1, 2, 3].map((key) => (
        <div
          key={key}
          className="flex-1 bg-white dark:bg-gray-800 p-5 rounded-xl shadow animate-pulse"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700" />
            <div className="flex flex-col space-y-2">
              <div className="w-32 h-4 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="w-16 h-6 bg-gray-300 dark:bg-gray-700 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatGridSkelleton;