const TasksChartSkeleton: React.FC<{ title?: string }> = ({ title = "" }) => {
  return (
    <div className={`flex flex-col ${title === "" ? "lg:w-2/6" : "w-full"} mt-4 lg:mt-0`}>
      <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 h-full animate-pulse">
        {/* Title Skeleton */}
        <h2 className="absolute top-4 left-1/2 transform -translate-x-1/2 h-4 w-1/3 bg-gray-300 dark:bg-gray-700 rounded"></h2>

        {/* Chart Skeleton */}
        <div className="w-full h-56 flex justify-center items-center">
          <div className="relative w-32 h-32">
            {/* Simulated Pie Chart */}
            <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-gray-300 dark:border-gray-700"></div>
            <div className="absolute top-2 left-2 w-28 h-28 rounded-full border-4 border-gray-200 dark:border-gray-600"></div>
            <div className="absolute top-4 left-4 w-24 h-24 rounded-full border-4 border-gray-100 dark:border-gray-500"></div>
          </div>
        </div>

        {/* Legend Skeleton */}
        <div className="mt-4 flex justify-center space-x-2">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-700"></div>
              <div className="h-3 w-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasksChartSkeleton;
