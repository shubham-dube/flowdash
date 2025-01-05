'use client'
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { ITask } from "../../../types/models";
import TaskDetailsUIComponent from "../tasks/Popups/taskDetailsUI";
import { useRouter } from 'next/navigation';
import OngoingTasksSkeleton from "./skeletons/onGoingTaskSkeleton";
import Spinner from "../common/circularLoadingIndicator";

const OnGoingTasks = () => {
    const [isNavigated, setIsNavigated] = useState<boolean>(false);
    const [ongoingTasks, setOngoingTasks] = useState<ITask[]>([]);
    const [taskDetailsPopup, setTaskDetailsPopup] = useState<boolean>(false);
    const [clickedTask, setClickedTask] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const token: string = Cookies.get('jwtToken') as string;
    const jwtPayload: JWTPayload = jwt.decode(token) as JWTPayload;

    const fetchOngoingTasks = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/task?assignedTo=${jwtPayload._id}&status=in-progress`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            const data = await response.json();
            setOngoingTasks(data.tasks);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchOngoingTasks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return <OngoingTasksSkeleton />
    }

    return (
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl w-full shadow lg:min-h-[450]">
            <h4 className="text-md font-semibold justify-between flex items-center mb-3 text-gray-500 dark:text-gray-200">
                <span>ONGOING TASKS</span>
                <span onClick={() => {
                    router.push(`/tasks`);
                    setIsNavigated(true);
                }} className="hover:cursor-pointer text-sm text-blue-500 font-normal">View all</span>
            </h4>
            <ul className="space-y-2">
                {ongoingTasks.map((task) => (
                    <li key={task._id} className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-3 rounded rounded-lg">
                        <span>{task.title}</span>
                        <span className="text-blue-500 mr-3 hover:cursor-pointer"><FaEye onClick={() => {
                            setClickedTask(task._id);
                            setTaskDetailsPopup(true);
                        }} /></span>
                    </li>
                ))
                }
            </ul>
            <div className='absolute z-50'>
                {isNavigated && (
                    <div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center'>
                        <Spinner className='h-10 w-10 border-white ' /></div>
                )}
                {taskDetailsPopup && <TaskDetailsUIComponent task={ongoingTasks.find(obj => obj._id === clickedTask) as ITask} setShowTaskDetailsPopup={setTaskDetailsPopup} fetchTasks={fetchOngoingTasks} />}
            </div>
        </div>
    )
}

export default OnGoingTasks;