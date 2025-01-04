const StatLoadingSkeleton = () => {
    return (
        <div className="flex flex-col lg:w-2/6 lg:mt-0 space-y-2 justify-between h-full">

            {/* Skeleton for Projects Stats */}
            <div className="flex justify-between items-center text-sm font-medium space-x-2 h-full">
                {/* Skeleton for No. Of Projects */}
                <div className="flex flex-col w-1/2 bg-white dark:bg-gray-800 rounded-lg p-4 h-full animate-pulse">
                    <div className="w-3/4 h-4 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
                    <div className="flex items-center space-x-3 mt-5">
                        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                        <div className="w-16 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    </div>
                </div>

                {/* Skeleton for Projects Completed */}
                <div className="flex flex-col w-1/2 bg-white dark:bg-gray-800 rounded-lg p-4 h-full animate-pulse">
                    <div className="w-3/4 h-4 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
                    <div className="flex items-center space-x-3 mt-5">
                        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                        <div className="w-16 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    </div>
                </div>
            </div>

            {/* Skeleton for Tasks Stats */}
            <div className="flex justify-between items-center text-sm font-medium space-x-2 h-full">
                {/* Skeleton for No. Of Tasks */}
                <div className="flex flex-col w-1/2 bg-white dark:bg-gray-800 rounded-lg p-4 h-full animate-pulse">
                    <div className="w-3/4 h-4 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
                    <div className="flex items-center space-x-3 mt-5">
                        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                        <div className="w-16 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    </div>
                </div>

                {/* Skeleton for Tasks Completed */}
                <div className="flex flex-col w-1/2 bg-white dark:bg-gray-800 rounded-lg p-4 h-full animate-pulse">
                    <div className="w-3/4 h-4 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
                    <div className="flex items-center space-x-3 mt-5">
                        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                        <div className="w-16 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default StatLoadingSkeleton;