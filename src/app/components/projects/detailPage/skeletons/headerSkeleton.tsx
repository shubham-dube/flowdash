const HeaderSkeleton = () => {
    return (
        <div className="relative bg-grad-image flex h-64 bg-cover bg-right bg-no-repeat rounded-lg animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-200 dark:to-gray-700 border-t rounded-lg"></div>
            <div className="absolute flex w-full bottom-0 left-0 mb-3 p-4">
                <div className="lg:w-1/2 w-2/3 ml-5 mr-3 flex items-center space-x-2 text-xl font-semibold">
                    <div className="w-10 h-10 p-2 shadow-lg bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    <div className="w-32 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </div>
                <div className="lg:w-1/2 w-1/3 ml-3 flex flex-col lg:flex-row items-start lg:items-center space-y-5 lg:space-y-0 lg:space-x-20">
                    <div className="lg:w-1/3 flex flex-col items-start">
                        <div className="w-16 h-4 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
                        <div className="w-20 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    </div>
                    <div className="lg:w-1/3 flex flex-col items-start">
                        <div className="w-16 h-4 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
                        <div className="w-20 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    </div>
                    <div className="lg:w-1/3 flex flex-col items-start">
                        <div className="w-16 h-4 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
                        <div className="w-20 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default HeaderSkeleton;