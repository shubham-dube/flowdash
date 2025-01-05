/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { FaUsers, FaSearch } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import { debounce } from 'lodash';
import Cookies from 'js-cookie';
import { IProject, IUser } from '../../../../../types/models';
import jwt from 'jsonwebtoken';
import { AddMemberUIProps } from '../../../../../types/ui.props';

const AddMemberComponent: React.FC<AddMemberUIProps> = ({ fetchProjects, projectId, setShowAddMemberPopup, membersAlready }) => {
    const [selectedTeamMembers, setSelectedTeamMembers] = useState<string[]>([]);
    const [users, setUsers] = useState<IUser[]>([]);

    const token: string = Cookies.get('jwtToken')!;

    const updateProject = async () => {

        const jwtPayload: JWTPayload = jwt.decode(token) as JWTPayload;

        const project: Partial<IProject> = {
            id: projectId,
            teamMembers: [selectedTeamMembers, ...membersAlready.map((member) => member._id)],
        };
        console.log(jwtPayload._id);

        try {
            const response = await fetch('/api/project', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(project),
            });

            if (response.ok) {
                fetchProjects();
                setShowAddMemberPopup(false);
            } else {
                console.error('Failed to create project');
            }
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    const searchUsers = debounce(async (query: string) => {
        try {
            const response = await fetch(`/api/user?query=${query}&limit=10`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            setUsers(data.users);
        } catch (error) {
            console.error("Error searching users:", error);
        }
    }, 300);

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 md:w-[50%] mx-5 p-6 rounded-lg">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <FaUsers />
                        <h2 className="text-md text-gray-800 dark:text-white">Add Member</h2>
                    </div>
                    <button
                        onClick={() => setShowAddMemberPopup(false)}
                        className="text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded">
                        X
                    </button>
                </div>
                <div className="flex flex-col text-sm space-y-2 text-gray-700 dark:text-gray-200">Select users to add as member in your project.</div>
                <div className="flex mt-4 border-t pt-4">

                    <div className="flex-1 pl-4">
                        <div className="p-4">
                            <p className='text-sm'>Choose any number of members by using -CTRL-</p>
                            <div className="flex-grow relative">
                                <FaSearch className="absolute left-3 top-3 text-gray-500 dark:text-gray-400" />
                                <input
                                    onChange={(e) => searchUsers(e.target.value)}
                                    type="text"
                                    placeholder="Search Users..."
                                    className="w-full pl-10 pr-4 py-2 bg-transparent border border-gray-300 dark:border-gray-700 rounded-full text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                            <select
                                title="members"
                                name="members"
                                multiple
                                value={selectedTeamMembers}
                                onChange={(e) =>
                                    setSelectedTeamMembers([...e.target.selectedOptions].map((option) => option.value))
                                }
                                className="mt-2 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-36"
                            >
                                {users.map((user) => {
                                    const isAlreadyMember = membersAlready.some((member) => member._id === user._id);
                                    return (
                                        <option key={user._id} value={user._id} disabled={isAlreadyMember}>
                                            {user.displayName} {isAlreadyMember ? "(Already a member)" : ""}
                                        </option>
                                    );
                                })}
                            </select>

                        </div>
                    </div>
                </div>
                <div className="flex justify-end mt-3 border-t border-gray-300 dark:border-gray-700 pt-3">
                    <button
                        onClick={() => setShowAddMemberPopup(false)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={updateProject}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddMemberComponent;
