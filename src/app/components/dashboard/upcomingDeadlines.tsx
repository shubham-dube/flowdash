'use client'
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { ITask } from "../../../types/models";
import TaskDetailsUIComponent from "../tasks/Popups/taskDetailsUI";
import { DateTimeFormatOptions } from "../../../types/ui.props";
import OngoingTasksSkeleton from "./skeletons/onGoingTaskSkeleton";
import { AnimatePresence, motion } from "framer-motion";

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
            <AnimatePresence>
                    {tasks.map((task) => (
                        <motion.li 
                            key={task._id} 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-3 rounded-lg"
                        >
                            <span className="w-[60%]">{task.title}</span>
                            <div className="flex items-center justify-end w-[40%]">
                                <span className="text-red-500 text-sm mr-5">
                                    {formatDateString(task.deadline as Date, false)}
                                </span>
                                <motion.span 
                                    whileHover={{ scale: 1.2 }} 
                                    whileTap={{ scale: 0.9 }} 
                                    className="text-blue-500 mr-3 hover:cursor-pointer"
                                >
                                    <FaEye onClick={() => {
                                        setClickedTask(task._id);
                                        setTaskDetailsPopup(true);
                                    }} />
                                </motion.span>
                            </div>
                        </motion.li>
                    ))}
                </AnimatePresence>
            </ul>
            <AnimatePresence>
                {taskDetailsPopup && (
                    <motion.div
                        className="absolute z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <TaskDetailsUIComponent task={tasks.find(obj => obj._id === clickedTask) as ITask} setShowTaskDetailsPopup={setTaskDetailsPopup} fetchTasks={fetchTasks} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default UpcomingDeadlines;