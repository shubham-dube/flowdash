import { useEffect, useState } from 'react';
import { FaCheckCircle, FaCircle, FaClock, FaEllipsisH, FaEllipsisV, FaFlag, FaProjectDiagram, FaSortNumericDown, FaUser } from 'react-icons/fa';
import useDeviceSize from '../common/deviceUtils';
import { DateTimeFormatOptions, ProjectListAndGridProps } from '../../../types/ui.props';
import { AvatarWithName } from '../tasks/Popups/statusAndPriorityVisual';
import { ITask } from '../../../types/models';
import { useRouter } from 'next/navigation';
import ProjectsGridSkeleton from './skeletons/projectGrid';
import DetailedTasksListSkeleton from '../tasks/skeletons/taskListSkeleton';
import Spinner from '../common/circularLoadingIndicator';

const ProjectListAndGrid: React.FC<ProjectListAndGridProps> = ({ projects, isCardView, limit, setLimit,
    currentPage, setCurrentPage, totalProjects, setIsCardView, loading,wantMetaOptions = true }) => {
    const router = useRouter();
    const [isNavigated, setIsNavigated] = useState<boolean>(false);

    const [menuOpen, setMenuOpen] = useState("");
    const { width } = useDeviceSize();

    const toggleProjectMenu = (id: string) => {
        if (menuOpen === id) {
            setMenuOpen("");
        }
        else {
            setMenuOpen(id);
        }
    }

    const getCompletedTasksCount = (tasks: ITask[]) => {
        const completedTasks = tasks.filter((task) => task.status === 'completed');
        return completedTasks.length;
    }

    const getInProgressTasksCount = (tasks: ITask[]) => {
        const inProgressTasks = tasks.filter((task) => task.status === 'in-progress');
        return inProgressTasks.length;
    }

    const totalPages = Math.ceil(totalProjects / limit);

    const changePage = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    function formatDateString(dateString: Date) {
        const date = new Date(dateString);

        const options: Partial<DateTimeFormatOptions> = {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour12: false
        };

        const formattedDate = date.toLocaleString('en-US', options);
        return formattedDate;
    }

    useEffect(() => {
        if (width < 768) {
            if (!isCardView) setIsCardView(true);
        } else if (width >= 768 && width < 1024) {
            if (!isCardView) setIsCardView(true);
        } else {
            console.log('Desktop view');
        }
    }, [isCardView, setIsCardView, width]);

    if(isCardView && loading){
        return <ProjectsGridSkeleton wantMetaOptions={true}/>
    }

    return (<div className="projects-section">
        <div className="flex items-center space-x-2 mt-4 w-full">
            <div className="bg-white dark:bg-gray-800 border w-[100%] border-gray-200 dark:border-gray-700 rounded-lg p-4">

                {wantMetaOptions && (
                    <div className="mb-4 float">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Projects per page:
                        </label>
                        <select
                            name='limits'
                            title='limits'
                            className="p-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 
                        dark:text-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                            value={limit}
                            onChange={(e) => setLimit(parseInt(e.target.value, 10))}
                        >
                            {[5, 10, 20, 50].map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                )}


                {isCardView ? (
                    <div className={`grid grid-cols-1 sticky ${wantMetaOptions? "sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3": ""} gap-4`}>
                        {projects.map((project) => {
                            const completedTasksCount = getCompletedTasksCount(project.tasks);
                            const inProgressTasksCount = getInProgressTasksCount(project.tasks);
                            const totalTasks = project.tasks.length;

                            const completedPercentage = (completedTasksCount / totalTasks) * 100;
                            const inProgressPercentage = (inProgressTasksCount / totalTasks) * 100;
                            return (
                                <div
                                    key={project._id}
                                    className="relative p-4 border rounded-lg bg-gray-100 dark:bg-gray-900"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="w-[80%]">

                                            <h3 className="flex space-x-2 items-center text-gray-800 dark:text-white"><FaProjectDiagram /> <span >{project.title}</span></h3>
                                            <p className='text-xs'>Deadline: {formatDateString(project.deadline)}</p>
                                        </div>
                                        <div className="relative">
                                            <button
                                                title='projectMenuButton'
                                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                                                onClick={() => toggleProjectMenu(project._id)}
                                            >
                                                <FaEllipsisH/>
                                            </button>
                                            {menuOpen === project._id && (
                                                <div className="absolute right-0 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
                                                    <button className="w-full text-left px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                                                        onClick={() => { router.push(`projects/${project._id}`); setIsNavigated(true); }}>Details</button>
                                                    {/* <button className="w-full text-left px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Mark as Completed</button> */}
                                                    {/* <button className="w-full text-left px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500">Delete</button> */}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-2 flex flex-col space-y-2">
                                        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-200">
                                            <span><span className="text-xl font-semibold">{completedTasksCount}</span> <span>/ {totalTasks} tasks</span></span>
                                            <span className="text-xs">{Math.round(completedPercentage)}%</span>
                                        </div>
                                        <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className={`absolute h-full bg-green-500 transition-all duration-300`}
                                                style={{ width: `${completedPercentage}%` }}
                                            ></div>
                                            <div
                                                className={`absolute h-full bg-blue-500 transition-all duration-300`}
                                                style={{ width: `${inProgressPercentage}%`, left: `${completedPercentage}%` }}
                                            ></div>
                                        </div>
                                        <div className='flex justify-between items-center text-xs text-gray-500 dark:text-gray-200'>
                                            <span className='flex items-center text-green-500 text-xs'><FaCircle size={5} className='mr-2' /> Completed</span>
                                            <span className='flex items-center text-blue-500 text-xs'><FaCircle size={5} className='mr-2' /> In Progress</span>
                                        </div>
                                    </div>

                                    <hr className="my-2 border-gray-300 dark:border-gray-700" />
                                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center">
                                            {project.teamMembers.map((member, index) => (
                                                <div
                                                    key={member._id}
                                                    className={`relative rounded-full border-2 border-white dark:border-gray-800 overflow-hidden ${index > 0 ? '-ml-3' : ''
                                                        }`}
                                                >
                                                    <AvatarWithName user={member} wantName={false} />
                                                </div>
                                            ))}
                                        </div>

                                        <span
                                            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${project.status === 'completed'
                                                ? 'border border-green-500 text-green-500'
                                                : project.status === 'active'
                                                    ? 'border border-blue-500 text-blue-500'
                                                    : project.status === 'archived'
                                                        ? 'border border-yellow-500 text-yellow-500'
                                                        : 'border border-gray-500 text-gray-500'
                                                }`}
                                        >
                                            Status: {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : loading?<DetailedTasksListSkeleton/>: 
                (
                    <div>
                        <div className="flex justify-between items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-sm font-medium">
                            <span className="w-1/12 flex items-center"><FaSortNumericDown className="mr-2" />S no.</span>
                            <span className="w-2/12 flex items-center"><FaFlag className="mr-2" />Title</span>
                            <span className="w-1/12 flex items-center"><FaCheckCircle className="mr-2" />Status</span>
                            <span className="w-3/12 flex items-center px-5"><FaProjectDiagram className="mr-2" />Tasks</span>
                            <span className="w-2/12 flex items-center"><FaUser className="mr-2" />Created By</span>
                            <span className="w-1/12 flex items-center"><FaUser className="mr-2" />Members</span>
                            <span className="w-2/12 flex items-center pl-5"><FaClock className="mr-2" />Deadline</span>
                        </div>
                        {projects.map((project, index) => {
                            const completedTasksCount = getCompletedTasksCount(project.tasks);
                            const inProgressTasksCount = getInProgressTasksCount(project.tasks);
                            const totalTasks = project.tasks.length;

                            const completedPercentage = (completedTasksCount / totalTasks) * 100;
                            const inProgressPercentage = (inProgressTasksCount / totalTasks) * 100;
                            return (
                                <div
                                    key={project._id}
                                    className="flex justify-between items-center px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-sm"
                                >
                                    <span className="w-1/12">{index + 1}</span>
                                    <span className="w-2/12">{project.title}</span>

                                    <span className="w-1/12"><span className={`ml-2 inline-block px-2 py-1 text-xs font-semibold rounded-full ${project.status === 'completed'
                                        ? 'border border-green-500 text-green-500'
                                        : project.status === 'active'
                                            ? 'border border-blue-500 text-blue-500'
                                            : project.status === 'archived'
                                                ? 'border border-yellow-500 text-yellow-500'
                                                : 'border border-gray-500 text-gray-500'
                                        }`} > {project.status.charAt(0).toUpperCase() + project.status.slice(1)} </span></span>

                                    <span className="w-3/12 px-5">
                                        <div className="mt-2 flex flex-col space-y-2">
                                            <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-200">
                                                <span><span className="text-xl font-semibold">{completedTasksCount}</span> <span>/ {totalTasks} tasks</span></span>
                                                <span className="text-xs">{Math.round(completedPercentage)}%</span>
                                            </div>
                                            <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`absolute h-full bg-green-500 transition-all duration-300`}
                                                    style={{ width: `${completedPercentage}%` }}
                                                ></div>
                                                <div
                                                    className={`absolute h-full bg-blue-500 transition-all duration-300`}
                                                    style={{ width: `${inProgressPercentage}%`, left: `${completedPercentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </span>
                                    <span className="w-2/12"> <AvatarWithName user={project.createdBy} /></span>

                                    <span className="w-1/12">
                                        <div className="flex items-center">
                                            {project.teamMembers.map((member, index) => (
                                                <div
                                                    key={member.id}
                                                    className={`relative rounded-full border-2 border-white dark:border-gray-800 overflow-hidden ${index > 0 ? '-ml-3' : ''
                                                        }`}
                                                >
                                                    <AvatarWithName user={member} wantName={false} />
                                                </div>
                                            ))}
                                        </div>
                                    </span>

                                    <span className="w-2/12 flex justify-between pl-5">{formatDateString(project.deadline)}
                                        <div className="relative">
                                            <button
                                                className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 "
                                                onClick={() => toggleProjectMenu(project._id)}>
                                                <FaEllipsisV />
                                            </button>
                                            {menuOpen === project._id && (
                                                <div className="absolute right-0 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
                                                    <button className="w-full text-left px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                                                        onClick={() => { router.push(`projects/${project._id}`); setIsNavigated(true) }}>
                                                        Details</button>
                                                    {/* <button className="w-full text-left px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Mark as Completed</button>
                                                    <button className="w-full text-left px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500">Delete</button> */}
                                                </div>
                                            )}
                                        </div>
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}

                {wantMetaOptions && (
                    <div className="flex justify-between items-center mt-4">
                        <button
                            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                            onClick={() => changePage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                            onClick={() => changePage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                )}

            </div>
        </div>
        {isNavigated && (
            <div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center'> 
            <Spinner className='h-10 w-10 border-white '/></div>
        )}
    </div>
    );
}

export default ProjectListAndGrid;