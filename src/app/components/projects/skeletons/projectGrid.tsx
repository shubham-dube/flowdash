interface ProjectsGridSkeletonProps {
    wantMetaOptions: boolean;
}

const ProjectsGridSkeleton: React.FC<ProjectsGridSkeletonProps> = ({ wantMetaOptions }) => {
    return (
        <div className="flex items-center space-x-2 mt-4 w-full">
            <div className="bg-white dark:bg-gray-800 border w-[100%] border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div
                    className={`grid grid-cols-1 sticky ${wantMetaOptions ? "sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3" : ""
                        } gap-4`}
                >
                    {[1, 2, 3, 4, 5].map((key) => (
                        <div
                            key={key}
                            className="relative p-4 border rounded-lg bg-gray-100 dark:bg-gray-900 animate-pulse"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-start">
                                <div className="w-[80%] space-y-2">
                                    <div className="w-3/4 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                    <div className="w-1/2 h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                </div>
                                <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                            </div>

                            {/* Progress Section */}
                            <div className="mt-4 space-y-3">
                                <div className="flex justify-between items-center">
                                    <div className="w-20 h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                    <div className="w-10 h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                </div>
                                <div className="relative w-full h-2 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                <div className="flex justify-between">
                                    <div className="w-1/4 h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                    <div className="w-1/4 h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                </div>
                            </div>

                            {/* Footer */}
                            <hr className="my-4 border-gray-300 dark:border-gray-700" />
                            <div className="flex justify-between items-center">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map((memberKey) => (
                                        <div
                                            key={memberKey}
                                            className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full border-2 border-gray-100 dark:border-gray-900"
                                        ></div>
                                    ))}
                                </div>
                                <div className="w-20 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectsGridSkeleton;
