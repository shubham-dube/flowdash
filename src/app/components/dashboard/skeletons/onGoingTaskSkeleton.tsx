const OngoingTasksSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl w-full shadow lg:min-h-[450px] animate-pulse">
      {/* Header */}
      <h4 className="text-md font-semibold flex justify-between items-center mb-3">
        <span className="h-4 w-1/4 bg-gray-300 dark:bg-gray-700 rounded"></span>
        <span className="h-3 w-16 bg-gray-300 dark:bg-gray-700 rounded"></span>
      </h4>

      {/* Task List Skeleton */}
      <ul className="space-y-2">
        {[1, 2, 3, 4].map((_, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-3 rounded-lg"
          >
            <span className="h-3 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></span>
            <span className="h-4 w-6 bg-gray-300 dark:bg-gray-700 rounded-full"></span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OngoingTasksSkeleton;
