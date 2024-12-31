import { IUser } from '@/types/models';
import Image from 'next/image';
import React from 'react';
import { FaBan, FaCheckCircle, FaCircle, FaExclamationCircle, FaExclamationTriangle, FaEye, FaSpinner, FaTasks } from 'react-icons/fa';

export const AvatarWithName: React.FC<{ user: IUser }> = ({ user }) => {
    return (
        <div className="inline-flex items-center pr-2 space-x-2 bg-gray-100 dark:bg-gray-800 rounded-full shadow-md">
            <div className="relative">
                <Image
                    src={user.photoUrl}
                    alt={user.displayName}
                    className="rounded-full border-2 border-blue-500"
                    width={25}
                    height={25}
                />
                {user.isActive && (
                    <span className="absolute bottom-5 left-4 w-2 h-2 bg-green-500 border-2 border-white rounded-full"></span>
                )}
            </div>
            <div className="flex flex-col">
                <span className="text-sm text-gray-900 dark:text-white">
                    {user.displayName}
                </span>
            </div>
        </div>
    );
};


export const StatusIndicator: React.FC<{ status: string, wantIcon: boolean }> = ({ status, wantIcon }) => {
    let icon;
    let color;
    let text;

    switch (status) {
        case 'to-do':
            icon = <FaTasks />;
            color = 'text-gray-800';
            text = 'To Do';
            break;
        case 'in-progress':
            icon = <FaSpinner />;
            color = 'text-blue-500';
            text = 'In Progress';
            break;
        case 'completed':
            icon = <FaCheckCircle />;
            color = 'text-green-500';
            text = 'Completed';
            break;
        case 'in-review':
            icon = <FaEye />;
            color = 'text-yellow-500';
            text = 'In Review';
            break;
        case 'blocked':
            icon = <FaBan />;
            color = 'text-red-500';
            text = 'Blocked';
            break;
        default:
            icon = null;
            color = '';
            text = '';
    }

    return (
        <div className={`flex items-center text-sm space-x-2 ${color}`}>
            {wantIcon ? icon : null}
            <span className='text-gray-800 dark:text-gray-100'>{text}</span>
        </div>
    );
};

export const PriorityIndicator: React.FC<{ priority: string, wantIcon: boolean }> = ({ priority, wantIcon }) => {
    let icon;
    let color;
    let text;

    switch (priority) {
        case 'very-low':
            icon = <FaCircle />;
            color = 'text-gray-400';
            text = 'Very Low';
            break;
        case 'low':
            icon = <FaCircle />;
            color = 'text-yellow-300';
            text = 'Low';
            break;
        case 'medium':
            icon = <FaCircle />;
            color = 'text-yellow-500';
            text = 'Medium';
            break;
        case 'high':
            icon = <FaExclamationCircle />;
            color = 'text-orange-500';
            text = 'High';
            break;
        case 'very-high':
            icon = <FaExclamationTriangle />;
            color = 'text-red-500';
            text = 'Very High';
            break;
        default:
            icon = null;
            color = '';
            text = '';
    }

    return (
        <div className={`flex items-center text-sm space-x-2 ${color}`}>
            {wantIcon ? icon : null}
            <span className='text-gray-800 dark:text-gray-100'>{text}</span>
        </div>
    );
};