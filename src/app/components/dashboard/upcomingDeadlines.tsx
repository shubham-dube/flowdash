'use client'
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { ITask } from "@/types/models";
import TaskDetailsUIComponent from "../tasks/Popups/taskDetailsUI";
import { DateTimeFormatOptions } from "@/types/ui.props";
import OngoingTasksSkeleton from "./skeletons/onGoingTaskSkeleton";

const UpcomingDeadlines = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [taskDetailsPopup, setTaskDetailsPopup] = useState<boolean>(false);
    const [clickedTask, setClickedTask] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const token: string = Cookies.get('jwtToken') as string;
    const jwtPayload: JWTPayload = jwt.decode(token) as JWTPayload;

    const today = new Date();
    const sevenDayAfter = new Date();
    sevenDayAfter.setDate(today.getDate() + 20);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/task?assignedTo=${jwtPayload._id}&limit=20&status=in-progress,to-do&deadlineBefore=${sevenDayAfter.toISOString()}&deadlineAfter=${today.toISOString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            const data = await response.json();
            setTasks(data.tasks);
            setLoading(false);
        } catch (error) {
            setLoading(true);
            console.error('Error fetching tasks:', error);
        }
    };

    function formatDateString(dateString: Date, wantTime: boolean = true): string {
        const date = new Date(dateString);

        const options: Partial<DateTimeFormatOptions> = {
            month: 'short',
            day: 'numeric',
            hour12: false
        };
        if (wantTime) {
            options.hour = 'numeric';
            options.minute = 'numeric';
        }

        const formattedDate = date.toLocaleString('en-US', options);
        return formattedDate;
    }

    useEffect(() => {
        fetchTasks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return <OngoingTasksSkeleton />
    }

    return (
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl w-full shadow">
            <h4 className="text-md font-semibold mb-3 text-gray-500 dark:text-gray-200">UPCOMING DEADLINES (Top 20)</h4>
            <ul className="space-y-2">
                {tasks.map((task) => (
                    <li key={task._id} className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-3 rounded rounded-lg">
                        <span>{task.title}</span>
                        <span className="text-red-500 text-sm">{formatDateString(task.deadline as Date, false)}</span>
                        <span className="text-blue-500 mr-3 hover:cursor-pointer"><FaEye onClick={() => {
                            setClickedTask(task._id);
                            setTaskDetailsPopup(true);
                        }} /></span>
                    </li>
                ))
                }
            </ul>
            <div className='absolute z-50'>
                {taskDetailsPopup && <TaskDetailsUIComponent task={tasks.find(obj => obj._id === clickedTask) as ITask} setShowTaskDetailsPopup={setTaskDetailsPopup} fetchTasks={fetchTasks} />}
            </div>
        </div>
    )
}

export default UpcomingDeadlines;