
const OverviewSkeleton = () => {
    return (
        <div className="mt-4 space-y-4 animate-pulse">
            {/* SemiCircleChart and ProjectMetaData Section */}
            <div className="lg:flex w-full gap-4">
                {/* SemiCircleChart Skeleton */}
                <div className="flex flex-col lg:w-4/6 w-full">
                    <div className="relative bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-4 h-full">
                        <div className="absolute top-4 left-4 w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                        <div className="absolute top-[65%] left-1/2 transform -translate-x-1/2 w-20 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                        <div className="w-full h-64 bg-gray-300 dark:bg-gray-600 rounded mt-4"></div>
                    </div>
                </div>

                {/* ProjectMetaData Skeleton */}
                <div className="flex flex-col lg:w-2/3 mt-4 lg:mt-0 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-4">
                    <div className="flex justify-between items-center w-full mb-4">
                        <div className="w-32 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                        <div className="w-16 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    </div>
                    <div className="p-4 space-y-5 bg-gray-300 dark:bg-gray-600 border-l-8 border-gray-400 dark:border-gray-500 rounded-lg w-full h-full">
                        {Array(5)
                            .fill(null)
                            .map((_, index) => (
                                <div key={index} className="flex space-x-6 justify-between items-center">
                                    <div className="w-1/2 h-4 bg-gray-400 dark:bg-gray-500 rounded"></div>
                                    <div className="w-1/2 h-4 bg-gray-400 dark:bg-gray-500 rounded"></div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            {/* Project Description Section */}
            <div className="flex flex-col bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-4">
                <div className="flex justify-between items-center w-full mb-4">
                    <div className="w-40 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </div>
                <div className="p-4 space-y-3 bg-gray-300 dark:bg-gray-600 border-l-8 border-gray-400 dark:border-gray-500 rounded-lg w-full h-32"></div>
            </div>
        </div>

    )
}

export default OverviewSkeleton;