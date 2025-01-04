
const OperationSkeleton = () => {
    return (
        <div className="flex flex-col w-full mt-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md animate-pulse">
            <div className="flex items-center justify-between w-full space-x-4">
                <div className="h-6 w-1/4 bg-gray-300 dark:bg-gray-700 rounded"></div>

                <div className="flex-grow mx-4 relative">
                    <div className="absolute left-3 top-3 h-4 w-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="w-full h-10 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="h-10 w-28 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="h-10 w-20 bg-gray-300 dark:bg-gray-700 rounded hidden lg:block"></div>
                </div>
            </div>
        </div>
    )
}

export default OperationSkeleton;