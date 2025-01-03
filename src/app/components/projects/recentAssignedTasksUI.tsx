import { IProject, ITask } from '@/types/models';
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import {  FaClock,  FaExclamationCircle,  FaEye, FaFlag,  FaProjectDiagram, FaUser, } from 'react-icons/fa';
import { AvatarWithName } from '../tasks/Popups/statusAndPriorityVisual';
import TaskDetailsUIComponent from '../tasks/Popups/taskDetailsUI';
import { DateTimeFormatOptions } from '@/types/ui.props';


const RecentAssignedTasksUI: React.FC<{ projects: IProject[] }> = ({ projects }) => {
  const [recentAssignedTask, setRecentAssignedTasks] = useState<ITask[]>([]);
  const [taskDetailsPopup, setTaskDetailsPopup] = useState<boolean>(false);
  const [clickedTask, setClickedTask] = useState<string>("");

  const token: string = Cookies.get('jwtToken') as string;
  const jwtPayload: JWTPayload = jwt.decode(token) as JWTPayload;

  const fetchRecentAssignedTasks = async () => {
    try {
      const response = await fetch(`/api/task?assignedTo=${jwtPayload._id}&limit=3`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      const data = await response.json();
      setRecentAssignedTasks(data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  function formatDateString(dateString: Date) {
    const date = new Date(dateString);

    const options: Partial<DateTimeFormatOptions> = {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };

    const formattedDate = date.toLocaleString('en-US', options);
    return formattedDate;
  }

  useEffect(() => {
    fetchRecentAssignedTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

  return (
    <div className="flex flex-col space-y-4 lg:w-4/6 lg:mr-4 overflow-hidden">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 h-full overflow-hidden">
        <h2 className="text-sm mb-4 text-center">RECENTLY ASSIGNED TASKS</h2>
        <div >
          <div className="flex justify-between items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-sm font-medium ">
            <span className="lg:w-3/12 md:w-3/12 w-5/12 flex items-center"><FaFlag className="mr-2" />Title</span>
            <span className="w-3/12 flex items-center lg:flex md:flex hidden"><FaProjectDiagram className="mr-2" />Project</span>
            <span className="lg:w-3/12 w-4/12 flex items-center mr-3"><FaUser className="mr-2" />Assigned By</span>
            <span className="w-2/12 flex items-center lg:flex hidden mr-1"><FaClock className="mr-2" />Time</span>
            <span className="lg:w-1/12 w-2/12 flex items-center mr-2"><FaExclamationCircle className="mr-2" />Priority</span>
          </div>
          {recentAssignedTask.map((task) => (
            <div
              key={task._id}
              className="flex justify-between items-center px-4 py-2  dark:border-gray-600 text-sm"
            >
              <span className="lg:w-3/12 md:w-3/12 w-5/12 pr-2 flex"><button className='mr-2' onClick={()=>{setTaskDetailsPopup(true);
                  setClickedTask(task._id);}}> <FaEye/></button>{task.title}</span>
              <span className="w-3/12 lg:block md:block hidden">{task.projectId.title}</span>
              <span className="lg:w-3/12 w-4/12 mr-3"><AvatarWithName user={task.assignedBy}/></span>
              <span className="w-2/12 flex justify-between lg:block hidden mr-1">{formatDateString(task.createdAt)}</span>

              <span className="lg:w-1/12 w-2/12 mr-2 pr-2 flex justify-between"><span className={` inline-block px-2 py-1 text-xs font-semibold rounded-full ${task.priority === 'low'
                ? 'border border-green-500 text-green-500'
                : task.priority === 'medium'
                  ? 'border border-yellow-500 text-yellow-500'
                  : 'border border-red-500 text-red-500'
                }`} > {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} </span> </span>

            </div>
          ))}
        </div>
      </div>

      <div className='z-50'>
          {taskDetailsPopup && <TaskDetailsUIComponent task={recentAssignedTask.find(obj => obj._id === clickedTask) as ITask} setShowTaskDetailsPopup={setTaskDetailsPopup} fetchTasks={fetchRecentAssignedTasks} />}
      </div>
    </div>
  );
}

export default RecentAssignedTasksUI;