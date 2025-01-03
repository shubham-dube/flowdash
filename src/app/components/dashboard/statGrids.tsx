'use client'
import React, { useEffect, useState } from "react";
import { FaTasks, FaSpinner,  FaCheck } from "react-icons/fa";
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';


const StatGrids = ()=> {

    const [completedTasks, setCompletedTasks] = useState<number>(0);
  const [ongoingTasks, setOngingTasks] = useState<number>(0);
  const [todoTasks, setToDoTasks] = useState<number>(0);
//   const [projectWorkingOn, setProjectsWorkingOn] = useState<number>(0);


  const token: string = Cookies.get('jwtToken') as string;
  const jwtPayload: JWTPayload = jwt.decode(token) as JWTPayload;

  const fetchStats = async () => {
    try {
    //   const projectResponse = await fetch(`/api/project/stats?teamMember=${jwtPayload._id}`, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application',
    //       'Authorization': `Bearer ${token}`,
    //     }
    //   });
      const taskResponse = await fetch(`/api/task/stats?assignedTo=${jwtPayload._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application',
          'Authorization': `Bearer ${token}`,
        }
      });
      const taskStatsData = await taskResponse.json();
      setOngingTasks(taskStatsData.statusCount['in-progress']);
      setCompletedTasks(taskStatsData.statusCount['completed']);
      setToDoTasks(taskStatsData.statusCount['to-do']);

    //   const projectStatsdata = await projectResponse.json();
    //   setProjectsWorkingOn(projectStatsdata.projectsCount);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchStats();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    
    return (
        <div className="flex flex-col sm:flex-row space-y-5 sm:space-y-0 sm:space-x-5">
            <div className="flex-1 bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
              <div className="flex items-center space-x-3">
                <FaCheck className="w-10 h-10 rounded rounded-full text-white p-2 bg-green-500" />
                <h4 className="text-md font-semibold">
                  <span className="text-gray-500 dark:text-gray-200">Tasks Completed</span> 
                  <span><p className="text-2xl font-bold">{completedTasks}</p></span>
                </h4>
              </div>
            </div>
            <div className="flex-1 bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
            <div className="flex items-center space-x-3">
                <FaSpinner className="w-10 h-10 rounded rounded-full text-white p-2 bg-blue-500" />
                <h4 className="text-md font-semibold">
                  <span className="text-gray-500 dark:text-gray-200">On Going Tasks</span> 
                  <span><p className="text-2xl font-bold">{ongoingTasks}</p></span>
                </h4>
              </div>
            </div>
            <div className="flex-1 bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
            <div className="flex items-center space-x-3">
                <FaTasks className="w-10 h-10 rounded rounded-full text-white p-2 bg-yellow-500" />
                <h4 className="text-md font-semibold">
                  <span className="text-gray-500 dark:text-gray-200">To Do Tasks</span> 
                  <span><p className="text-2xl font-bold">{todoTasks}</p></span>
                </h4>
              </div>
            </div>
          </div>
    )
}

export default StatGrids;