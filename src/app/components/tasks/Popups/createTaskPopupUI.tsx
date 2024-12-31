/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { FaExclamationCircle, FaCheckCircle, FaProjectDiagram, FaUsers, FaClock, FaArrowRight, FaSearch, FaTasks, FaArrowLeft } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { debounce } from 'lodash';
import Cookies from 'js-cookie';
import { IProject, ITask, IUser } from '@/types/models';
import jwt from 'jsonwebtoken';

const CreateTaskComponent: React.FC<CreateTaskUIProps> = ({ fetchTasks, setShowCreateTaskPopup }) => {
    const [priority, setPriority] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [relatedProject, setRelatedProject] = useState<string>("");
    const [selectedTeamMembers, setSelectedTeamMembers] = useState<string[]>([]);
    const [deadline, setDeadline] = useState<Date | null>(null);
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const [projects, setProjects] = useState<IProject[]>([]);
    const [projectMembers, setProjectMembers] = useState<IUser[]>([]);

    const tabs = ["titleAndDescription", "priority", "status", "relatedProject", "assignedTo", "deadline"];

    const token: string = Cookies.get('jwtToken')!;

    const createTask = async () => {

        const jwtPayload: JWTPayload = jwt.decode(token) as JWTPayload;

        const task: Partial<ITask> = {
            title,
            description,
            priority,
            status,
            projectId: relatedProject,
            assignedTo: selectedTeamMembers,
            deadline,
            createdBy: jwtPayload._id,
            assignedBy: jwtPayload._id,
        };

        try {
            const response = await fetch('/api/task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(task),
            });

            if (response.ok) {
                fetchTasks();
                setShowCreateTaskPopup(false);
            } else {
                console.error('Failed to create task');
            }
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const searchProjects = debounce(async (query: string) => {
        try {
            const response = await fetch(`/api/project?${query ? `search=${query}` : ""}&limit=10`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            setProjects(data.projects);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    }, 300);

    const fetchProjectandMembers = async (projectId: string) => {
        try {
            const response = await fetch(`/api/project?getOneProject=${projectId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            setProjectMembers(data.project.teamMembers);
        } catch (error) {
            console.error('Error fetching project members:', error);
        }
    }

    const renderTabOptions = () => {
        switch (tabs[selectedTab]) {
            case 'titleAndDescription':
                return (
                    <div className="p-4">
                        <h3 className="text-lg mb-2 font-semibold">Title & Description</h3>
                        <div className="flex flex-col gap-3">
                            <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <textarea
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                );
            case 'priority':
                return (
                    <div className="p-4">
                        <h3 className="text-lg mb-2 font-semibold">Priority</h3>
                        <select
                            title='priority'
                            name='priority'
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" disabled>Select Priority</option>
                            {['Very-Low', 'Low', 'Medium', 'High', 'Very-High'].map((level) => (
                                <option key={level.toLowerCase()} value={level.toLowerCase()}>{level}</option>
                            ))}
                        </select>
                    </div>
                );
            case 'status':
                return (
                    <div className="p-4">
                        <h3 className="text-lg mb-2 font-semibold">Status</h3>
                        <select
                            title='status'
                            name='status'
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" disabled>Select Status</option>
                            {['To-Do', 'In-Progress', 'Completed', 'Blocked', 'In-Review'].map((level) => (
                                <option key={level.toLowerCase()} value={level.toLowerCase()}>{level}</option>
                            ))}
                        </select>
                    </div>
                );
            case 'relatedProject':
                return (
                    <div className="p-4">
                        <h3 className="text-lg mb-2 font-semibold">Related Project</h3>
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-3 text-gray-500" />
                            <input
                                onChange={(e) => searchProjects(e.target.value)}
                                type="text"
                                placeholder="Search Projects..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <select
                            title='projects'
                            name='projects'
                            value={relatedProject}
                            onChange={(e) => {
                                setRelatedProject(e.target.value);
                                fetchProjectandMembers(e.target.value);
                            }}
                            className="w-full p-2 border border-gray-300 rounded mt-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" disabled>Select Project</option>
                            {projects.map((project) => (
                                <option key={project._id} value={project._id}>{project.title}</option>
                            ))}
                        </select>
                    </div>
                );
            case 'assignedTo':
                return (
                    <div className="p-4">
                        <h3 className="text-lg mb-1 font-semibold">Assign To</h3>
                        <p className='mb-3'><b>Note: </b> Please Select one of any project to get their members.</p>
                        <p>Choose any number of members by using -CTRL-</p>
                        <select
                            title='assignedTo'
                            name='assignedTo'
                            multiple
                            value={selectedTeamMembers}
                            onChange={(e) =>
                                setSelectedTeamMembers([...e.target.selectedOptions].map((option) => option.value))
                            }
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-36"
                        >
                            {projectMembers.map((user) => (
                                <option key={user._id} value={user._id}>{user.displayName}</option>
                            ))}
                        </select>
                    </div>
                );
            case 'deadline':
                return (
                    <div className="p-4">
                        <h3 className="text-lg mb-2 font-semibold">Deadline</h3>
                        <DatePicker
                            selected={deadline}
                            onChange={(date) => setDeadline(date)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholderText="Select Deadline"
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 md:w-[50%] mx-5 p-6 rounded-lg">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <FaTasks />
                        <h2 className="text-md text-gray-800 dark:text-white">Create Task</h2>
                    </div>
                    <button
                        onClick={() => setShowCreateTaskPopup(false)}
                        className="text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded">
                        X
                    </button>
                </div>
                <div className="flex flex-col text-sm space-y-2 text-gray-700 dark:text-gray-200">Enter all your details related to task you want to create.</div>
                <div className="flex mt-4 border-t pt-4">
                    <div className="space-y-4 w-1/3 border-r pr-4 hidden md:flex md:flex-col">
                        {[
                            { label: "Title & Description", icon: FaTasks, tab: 0 },
                            { label: "Priority", icon: FaExclamationCircle, tab: 1 },
                            { label: "Status", icon: FaCheckCircle, tab: 2 },
                            { label: "Related Project", icon: FaProjectDiagram, tab: 3 },
                            { label: "Assign To", icon: FaUsers, tab: 4 },
                            { label: "Deadline", icon: FaClock, tab: 5 },
                        ].map(({ label, icon: Icon, tab }) => (
                            <button
                                key={tab}
                                onClick={() => setSelectedTab(tab)}
                                className={`flex items-center justify-between px-3 py-2 border rounded ${selectedTab === tab ? 'bg-blue-100 dark:bg-blue-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <div className="flex items-center space-x-2">
                                    <Icon className="text-blue-500 dark:text-blue-400" />
                                    <span>{label}</span>
                                </div>
                                <FaArrowRight className="text-sm text-gray-500 dark:text-gray-400" />
                            </button>
                        ))}
                    </div>
                    <div className="flex-1 pl-4">{renderTabOptions()}</div>
                </div>
                
                <div className='flex md:hidden justify-around border-t border-gray-300 dark:border-gray-700 pt-3 mt-3'>
                    <button onClick={()=> setSelectedTab((selectedTab>0)?selectedTab-1:5)}>
                    <FaArrowLeft className="text-sm text-gray-500 dark:text-gray-400" />
                    </button>
                    <button onClick={()=>setSelectedTab(selectedTab<5?selectedTab + 1:0)}>
                    <FaArrowRight className="text-sm text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
                <div className="flex justify-end mt-3 border-t border-gray-300 dark:border-gray-700 pt-3">
                    <button
                        onClick={() => setShowCreateTaskPopup(false)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={createTask}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Create Task
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateTaskComponent;
