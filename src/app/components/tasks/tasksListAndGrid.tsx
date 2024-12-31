import { useEffect, useState } from 'react';
import { FaCheckCircle, FaClock, FaEllipsisV, FaExclamationCircle, FaFlag, FaProjectDiagram, FaSortNumericDown, FaUser } from 'react-icons/fa';
import TaskDetailsUIComponent from './Popups/taskDetailsUI';
import useDeviceSize from '../common/deviceUtils';

const TaskListAndGrid: React.FC<TaskListAndGridProps> = ({ tasks, isCardView, limit, setLimit,
    currentPage, setCurrentPage, totalTasks, fetchTasks, setIsCardView }) => {

    const [menuOpen, setMenuOpen] = useState("");
    const [TaskDetailsPopup, setShowTaskDetailsPopup] = useState(false);
    const { width } = useDeviceSize();

    const toggleTaskMenu = (id: string) => {
        if (menuOpen === id) {
            setMenuOpen("");
        }
        else {
            setMenuOpen(id);
        }
    }

    const totalPages = Math.ceil(totalTasks / limit);

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
            hour: '2-digit',
            minute: '2-digit',
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

    return (<div className="tasks-section">
        <div className="flex items-center space-x-2 mt-4 w-full">
            <div className="bg-white dark:bg-gray-800 border w-[100%] border-gray-200 dark:border-gray-700 rounded-lg p-4">

                <div className="mb-4 float">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Tasks per page:
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

                {isCardView ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {tasks.map((task) => (
                            <div
                                key={task._id}
                                className="relative p-4 border rounded-lg bg-gray-100 dark:bg-gray-900"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="w-[80%]">
                                        <h3 className="font-semibold">{task.title}</h3>
                                        <p className="text-sm line-clamp-4 ">{task.description}</p>
                                    </div>
                                    <div className="relative">
                                        <button
                                            title='taskMenuButton'
                                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                                            onClick={() => toggleTaskMenu(task._id)}
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </button>
                                        {menuOpen === task._id && (
                                            <div className="absolute right-0 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
                                                <button className="w-full text-left px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setShowTaskDetailsPopup(true)}>Details</button>
                                                {/* <button className="w-full text-left px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Mark as Completed</button> */}
                                                {/* <button className="w-full text-left px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500">Delete</button> */}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <span
                                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${task.priority === 'very-low'
                                                ? 'border border-gray-400 text-gray-400'
                                                : task.priority === 'low'
                                                    ? 'border border-yellow-300 text-yellow-300'
                                                    : task.priority === 'medium'
                                                        ? 'border border-yellow-500 text-yellow-500'
                                                        : task.priority === 'high'
                                                            ? 'border border-orange-500 text-orange-500'
                                                            : task.priority === 'very-high'
                                                                ? 'border border-red-500 text-red-500'
                                                                : 'border border-gray-500 text-gray-500' 
                                            }`}
                                    >
                                        Priority: {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                    </span>
                                    <span
                                        className={`ml-2 inline-block px-2 py-1 text-xs font-semibold rounded-full ${task.status === 'completed'
                                                ? 'border border-green-500 text-green-500'
                                                : task.status === 'to-do'
                                                    ? 'border border-gray-800 text-gray-800' 
                                                    : task.status === 'in-progress'
                                                        ? 'border border-blue-500 text-blue-500' 
                                                        : task.status === 'in-review'
                                                            ? 'border border-yellow-500 text-yellow-500' 
                                                            : task.status === 'blocked'
                                                                ? 'border border-red-500 text-red-500' 
                                                                : 'border border-gray-500 text-gray-500' 
                                            }`}
                                    >
                                        Status: {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                                    </span>
                                </div>
                                <div className="mt-2">
                                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                        <FaProjectDiagram className="mr-2 text-gray-500 dark:text-gray-400" />{task.projectId.title}
                                    </span>
                                </div>
                                <hr className="my-2 border-gray-300 dark:border-gray-700" />
                                <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                                    <div className='flex items-center'>
                                        <FaUser className="mr-2 text-gray-500 dark:text-gray-400" /> {task.assignedBy.displayName}
                                    </div>
                                    <span className='flex items-center'><FaClock className="mr-2 text-gray-500 dark:text-gray-400" />{formatDateString(task.lastUpdated)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <div className="flex justify-between items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-sm font-medium">
                            <span className="w-1/12 flex items-center"><FaSortNumericDown className="mr-2" />S no.</span>
                            <span className="w-2/12 flex items-center"><FaFlag className="mr-2" />Title</span>
                            <span className="w-1/12 flex items-center"><FaExclamationCircle className="mr-2" />Priority</span>
                            <span className="w-2/12 flex items-center"><FaCheckCircle className="mr-2" />Status</span>
                            <span className="w-2/12 flex items-center"><FaProjectDiagram className="mr-2" />Project</span>
                            <span className="w-2/12 flex items-center"><FaUser className="mr-2" />Created By</span>
                            <span className="w-3/12 flex items-center"><FaClock className="mr-2" /> Last Updated</span>
                        </div>
                        {tasks.map((task, index) => (
                            <div
                                key={task._id}
                                className="flex justify-between items-center px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-sm"
                            >
                                <span className="w-1/12">{index + 1}</span>
                                <span className="w-2/12">{task.title}</span>

                                <span className="w-1/12"><span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${task.priority === 'low'
                                    ? 'border border-green-500 text-green-500'
                                    : task.priority === 'medium'
                                        ? 'border border-yellow-500 text-yellow-500'
                                        : 'border border-red-500 text-red-500'
                                    }`} > {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} </span></span>

                                <span className="w-2/12"><span className={`ml-2 inline-block px-2 py-1 text-xs font-semibold rounded-full ${task.status === 'completed'
                                    ? 'border border-green-500 text-green-500'
                                    : task.status === 'to-do'
                                        ? 'border border-orange-500 text-orange-500'
                                        : 'border border-gray-500 text-gray-500'
                                    }`} > {task.status.charAt(0).toUpperCase() + task.status.slice(1)} </span></span>

                                <span className="w-2/12">{task.projectId.title}</span>
                                <span className="w-2/12">{task.assignedBy.displayName}</span>
                                <span className="w-3/12 flex justify-between">{formatDateString(task.lastUpdated)}
                                    <div className="relative">
                                        <button
                                            className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 "
                                            onClick={() => toggleTaskMenu(task._id)}>
                                            <FaEllipsisV />
                                        </button>
                                        {menuOpen === task._id && (
                                            <div className="absolute right-0 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
                                                <button className="w-full text-left px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                                                    onClick={() => setShowTaskDetailsPopup(true)}>
                                                    Details</button>
                                                <button className="w-full text-left px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Mark as Completed</button>
                                                <button className="w-full text-left px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500">Delete</button>
                                            </div>
                                        )}
                                    </div>
                                </span>
                            </div>
                        ))}
                    </div>
                )}

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
            </div>
        </div>

        {TaskDetailsPopup && <TaskDetailsUIComponent task={tasks.find(obj => obj._id === menuOpen)} setShowTaskDetailsPopup={setShowTaskDetailsPopup} fetchTasks={fetchTasks} />}
    </div>
    );
}

export default TaskListAndGrid;