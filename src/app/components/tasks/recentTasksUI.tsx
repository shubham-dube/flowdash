import { ITask } from '@/types/models';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import {  FaClock, FaExclamationCircle, FaFlag, FaProjectDiagram, } from 'react-icons/fa';
import { DateTimeFormatOptions } from '@/types/ui.props';


const RecentTasksUI: React.FC<{ tasks: ITask[] }> = ({ tasks }) => {
  const [completedTasks, setCompletedTasks] = useState<ITask[]>([]);

  const token = Cookies.get('jwtToken');

  const fetchCompletedTasks = async () => {
    try {
      const response = await fetch(`/api/task?status=completed&limit=${3}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      const data = await response.json();
      setCompletedTasks(data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
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
    fetchCompletedTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  return (
    <div className="flex flex-col space-y-4 lg:w-4/6 lg:mr-4">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg py-4 h-full">
        <h2 className="text-sm mb-4 text-center">RECENT COMPLETED TASKS</h2>
        <div>
          <div className="flex justify-between items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-sm font-medium">
            <span className="lg:w-3/12 md:w-3/12 w-5/12 flex items-center"><FaFlag className="mr-2" />Title</span>
            <span className="w-2/12 flex items-center lg:flex hidden"><FaExclamationCircle className="mr-2" />Priority</span>
            <span className="w-4/12 flex items-center lg:flex md:flex hidden"><FaProjectDiagram className="mr-2" />Project</span>
            <span className="lg:w-3/12 w-5/12 flex items-center"><FaClock className="mr-2" />Completed On</span>
          </div>
          {completedTasks.map((task) => (
            <div
              key={task._id}
              className="flex justify-between items-center px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-sm"
            >
              <span className="lg:w-3/12 md:w-3/12 w-5/12 pr-2">{task.title}</span>

              <span className="w-2/12 lg:block hidden"><span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${task.priority === 'low'
                ? 'border border-green-500 text-green-500'
                : task.priority === 'medium'
                  ? 'border border-yellow-500 text-yellow-500'
                  : 'border border-red-500 text-red-500'
                }`} > {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} </span></span>

              <span className="w-4/12 lg:block md:block hidden">{task.projectId.title}</span>
              <span className="lg:w-3/12 w-5/12 flex justify-between">{formatDateString(task.lastUpdated)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecentTasksUI;