import { IUser } from '@/types/models';
import Image from 'next/image';
import Cookies from 'js-cookie';
import jwt, { JwtPayload } from 'jsonwebtoken';
import React, { useEffect, useState } from 'react';
import { FaBan, FaCheckCircle, FaCircle, FaExclamationCircle, FaExclamationTriangle, FaEye, FaSpinner, FaTasks } from 'react-icons/fa';
import { Realtime } from 'ably';

export const AvatarWithName: React.FC<{ user: IUser; wantName?: boolean }> = ({ user, wantName = true }) => {
    const [isActive, setIsActive] = useState(user.isActive);
  
    useEffect(() => {
      const token: string = Cookies.get('jwtToken') as string;
      const jwtPayload: JWTPayload = jwt.decode(token) as JWTPayload;
  
      if (!token || !jwtPayload) {
        console.error('Invalid JWT token or payload.');
        return;
      }
  
      const ably = new Realtime({ key: process.env.NEXT_PUBLIC_ABLY_API_KEY });
      const userChannel = ably.channels.get('user-presence');
  
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handlePresenceNotification = (message: any) => {
        const { userId, isActive: activeStatus } = message.data;
        if (userId === user._id) {
          setIsActive(activeStatus);
        }
      };
  
      userChannel.subscribe('presence-notification', handlePresenceNotification);
  
      return () => {
        userChannel.unsubscribe('presence-notification', handlePresenceNotification);
        ably.close();
      };
    }, [user._id]);
  
    return wantName ? (
      <div
        className={`inline-flex items-center pr-2 space-x-2 ${
          wantName ? '' : 'bg-gray-100 dark:bg-gray-800'
        } rounded-full shadow-md`}
        key={user._id}
      >
        <div className="relative">
          <Image
            src={user.photoUrl}
            alt={user.displayName}
            className="rounded-full border-2 border-blue-500"
            width={25}
            height={25}
          />
          {isActive && (
            <span className="absolute bottom-5 left-4 w-2 h-2 bg-green-500 border-2 border-white rounded-full"></span>
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-900 dark:text-white">
            {(jwt.decode(Cookies.get('jwtToken') as string) as JwtPayload)._id === user._id ? 'You' : user.displayName}
          </span>
        </div>
      </div>
    ) : (
      <div className="relative">
        <Image
          src={user.photoUrl}
          alt={user.displayName}
          className="rounded-full"
          width={25}
          height={25}
        />
        {isActive && (
          <span className="absolute bottom-5 left-4 w-2 h-2 bg-green-500 border-2 border-white rounded-full"></span>
        )}
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