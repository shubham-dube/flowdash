const DetailedTasksListSkeleton = () => (
    <div>
      <div className="flex justify-between items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-sm font-medium animate-pulse">
        {Array(7)
          .fill(null)
          .map((_, i) => (
            <span key={i} className="h-4 w-1/6 bg-gray-300 dark:bg-gray-700 rounded"></span>
          ))}
      </div>
      {Array(2)
        .fill(null)
        .map((_, i) => (
          <div
            key={i}
            className="flex justify-between space-x-3 items-center px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-sm"
          >
            {Array(7)
              .fill(null)
              .map((_, j) => (
                <span key={j} className="h-4 w-1/6 bg-gray-300 dark:bg-gray-700 rounded"></span>
              ))}
          </div>
        ))}
    </div>
  );
  
  export default DetailedTasksListSkeleton;