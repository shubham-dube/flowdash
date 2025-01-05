import React, { useState } from 'react';
import { FaEdit, FaExpand, FaCompress, FaCircle, FaInfoCircle, FaCalendar, FaProjectDiagram, FaUsers, FaFileAlt, FaUser, FaBan } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Cookies from 'js-cookie';
import { ITask } from '../../../../types/models';
import { AvatarWithName, PriorityIndicator, StatusIndicator } from './statusAndPriorityVisual';
import { DateTimeFormatOptions } from '../../../../types/ui.props';

interface Props {
    task: ITask;
    fetchTasks: () => void;
    setShowTaskDetailsPopup: (value: boolean) => void;
}

const TaskDetailsUIComponent: React.FC<Props> = ({ task, fetchTasks, setShowTaskDetailsPopup }) => {
    const [taskDetails, setTaskDetails] = useState<Partial<ITask>>(task);
    const [isEditingMode, setEditingMode] = useState<boolean>(false);
    const [isFullScreen, setFullScreen] = useState<boolean>(false);

    const token = Cookies.get('jwtToken');

    const updateTask = (field: string, value: unknown) => {
        setTaskDetails((prev) => ({ ...prev, [field]: value }));
    };

    const saveChanges = async () => {
        try {
            const response = await fetch('/api/task', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(taskDetails),
            });

            if (response.ok) {
                fetchTasks();
                setShowTaskDetailsPopup(false);
            } else {
                console.error('Failed to update task');
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    function formatDateString(dateString: Date) {
        const date = new Date(dateString);

        const options: Partial<DateTimeFormatOptions> = {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour12: false,
        };

        const formattedDate = date.toLocaleString('en-US', options);
        return formattedDate;
    }

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className={`bg-white dark:bg-gray-800 ${!isFullScreen ? 'md:w-[50%] mx-5' : 'w-full h-full'}  p-8 rounded-lg`}>
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <button onClick={() => { setFullScreen(!isFullScreen) }}>{!isFullScreen ? <FaExpand /> : <FaCompress />}</button>
                        <h2 className="text-sm text-gray-700 dark:text-white">
                            {taskDetails.projectId?.title || ''} / {taskDetails.status || ''}</h2>
                    </div>
                    <div className='flex space-x-7 items-center'>
                        {!isEditingMode ? (
                            <FaEdit
                            onClick={() => setEditingMode(true)}
                            className="ml-2 text-gray-500 cursor-pointer hover:text-gray-700"
                        />
                        ) : (
                            <FaBan
                            onClick={() => setEditingMode(false)}
                            className="ml-2 text-gray-500 cursor-pointer hover:text-gray-700"/>
                        )}
                        <button
                            onClick={() => setShowTaskDetailsPopup(false)}
                            className="text-white bg-red-500 hover:bg-red-600 px-2 py-1 w-8 h-8 rounded">
                            X
                        </button>
                    </div>
                </div>

                <div className="mt-4 space-y-4">
                    <div className="flex items-center">
                        {isEditingMode ? (
                            <input
                                type="text"
                                value={taskDetails.title || ''}
                                onChange={(e) => updateTask('title', e.target.value)}
                                className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            />
                        ) : (
                            <p className="text-gray-700 dark:text-white text-3xl">{taskDetails.title || ''}</p>
                        )}
                    </div>

                    <div className="flex flex-col space-y-3">
                        <div className="flex items-center">
                            <label className="w-1/3 flex block text-sm items-center text-gray-500 dark:text-gray-200 space-x-2 mr-2 font-medium text-gray-700 dark:text-gray-300"><FaCircle className='text-gray-400' /> <p>Status</p></label>
                            <div className='w-2/3'>
                                {isEditingMode ? (
                                    <select
                                        value={taskDetails.status || ''}
                                        onChange={(e) => updateTask('status', e.target.value)}
                                        className="text-sm block px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500">
                                        <option value="to-do">To-Do</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                        <option value="blocked">Blocked</option>
                                        <option value="in-review">In Review</option>
                                    </select>
                                ) : (
                                    <StatusIndicator status={taskDetails.status as string} wantIcon={true} />
                                )}
                            </div>
                        </div>

                        <div className="flex items-center">
                            <label className="w-1/3 flex block text-sm items-center text-gray-500 dark:text-gray-200 space-x-2 mr-2 font-medium text-gray-700 dark:text-gray-300"><FaInfoCircle className='text-gray-400' /> <p>Priority</p></label>
                            <div className='w-2/3'>
                                {isEditingMode ? (
                                    <select
                                        value={taskDetails.priority || ''}
                                        onChange={(e) => updateTask('priority', e.target.value)}
                                        className="text-sm block px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500">
                                        <option value="very-low">Very Low</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                        <option value="very-high">Very High</option>
                                    </select>
                                ) : (
                                    <PriorityIndicator priority={taskDetails.priority as string} wantIcon={true} />
                                )}
                            </div>
                        </div>

                        <div className="flex items-center">
                            <label className="w-1/3 flex block text-sm items-center text-gray-500 dark:text-gray-200 space-x-2 mr-2 font-medium text-gray-700 dark:text-gray-300"><FaCalendar className='text-gray-400' /> <p>Due Date</p></label>
                            {isEditingMode ? (
                                <DatePicker
                                    selected={taskDetails.deadline ? new Date(taskDetails.deadline) : null}
                                    onChange={(date) => updateTask('deadline', date)}
                                    className="w-2/3 text-sm block px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                />
                            ) : (
                                <p className="w-2/3 text-sm">{taskDetails.deadline ? formatDateString(taskDetails.deadline) : 'No deadline'}</p>
                            )}
                        </div>

                        <div className="flex items-center">
                            <label className="w-1/3 flex block text-sm items-center text-gray-500 dark:text-gray-200 space-x-2 mr-2 font-medium text-gray-700 dark:text-gray-300"><FaProjectDiagram className='text-gray-400' /> <p>Project</p></label>
                            <p className="w-2/3 text-gray-800 dark:text-gray-200">{taskDetails.projectId?.title} ({taskDetails.projectId.teamMembers.length} Members)</p>
                        </div>

                        <div className="flex items-center">
                            <label className="w-1/3 flex block text-sm items-center text-gray-500 dark:text-gray-200 space-x-2 mr-2 font-medium text-gray-700 dark:text-gray-300"><FaUsers className='text-gray-400' /> <p>Assignee</p></label><div className="flex space-x-2">

                                {taskDetails.assignedTo?.map((user) => (
                                    <AvatarWithName user={user} key={user.id} />
                                ))}</div>

                        </div>

                        <div className="flex items-center">
                            <label className="w-1/3 flex block text-sm items-center text-gray-500 dark:text-gray-200 space-x-2 mr-2 font-medium text-gray-700 dark:text-gray-300"><FaUser className='text-gray-400' /> <p>Created By</p></label>
                            <div className='w-2/3'>
                                <AvatarWithName user={taskDetails.assignedBy} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="w-1/3 flex block text-sm items-center text-gray-500 dark:text-gray-200 space-x-2 mr-2 font-medium text-gray-700 dark:text-gray-300"><FaFileAlt className='text-gray-400' /> <p>Description</p></label>
                        <div className="flex items-center space-x-2">
                            {isEditingMode ? (
                                <textarea
                                    value={taskDetails.description || ''}
                                    onChange={(e) => updateTask('description', e.target.value)}
                                    className="mt-2 text-sm block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                />
                            ) : (
                                <div className='mt-2 text-sm border border-gray-300 rounded rounded-lg p-3'>{taskDetails.description}</div>
                            )}
                        </div>
                    </div>

                    {isEditingMode && (
                        <div className="flex justify-end mt-4 space-x-2">
                        <button
                            onClick={() => setShowTaskDetailsPopup(false)}
                            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300">
                            Cancel
                        </button>
                        <button
                            onClick={saveChanges}
                            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500">
                            Save
                        </button>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskDetailsUIComponent;
