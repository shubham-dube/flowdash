import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { FaCheckCircle, FaProjectDiagram, FaSortNumericDownAlt, FaTasks } from "react-icons/fa";

const StatsUI = () => {
  const [noOfProjects, setNoOfProjects] = useState<number>(0);
  const [projectsCompleted, setProjectsCompleted] = useState<number>(0);
  const [noOfTasks, setNoOfTasks] = useState<number>(0);
  const [tasksCompleted, setTasksCompleted] = useState<number>(0);

  const token: string = Cookies.get('jwtToken') as string;
  const jwtPayload: JWTPayload = jwt.decode(token) as JWTPayload;

  const fetchStats = async () => {
    try {
      const projectResponse = await fetch(`/api/project/stats?teamMember=${jwtPayload._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application',
          'Authorization': `Bearer ${token}`,
        }
      });
      const taskResponse = await fetch(`/api/task/stats?assignedTo=${jwtPayload._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application',
          'Authorization': `Bearer ${token}`,
        }
      });
      const taskStatsData = await taskResponse.json();
      setNoOfTasks(taskStatsData.tasksCount);
      setTasksCompleted(taskStatsData.statusCount['completed']);

      const projectStatsdata = await projectResponse.json();
      setNoOfProjects(projectStatsdata.projectsCount);
      setProjectsCompleted(projectStatsdata.completed);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchStats();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (<div className="flex flex-col lg:w-2/6 lg:mt-0 space-y-2 justify-between h-full">
    
    <div className="flex justify-between items-center text-sm font-medium space-x-2 h-full">
      <div className="flex flex-col w-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 h-full">
        <h2 className="flex space-x-2 items-center text-md text-gray-500 dark:text-gray-200"><span>No. Of Projects</span><FaSortNumericDownAlt /></h2>
          <div className="flex items-center space-x-3 mt-5">
            <div className="border border-gray-500 dark:border-gray-300 circle p-2 rounded rounded-full">
              <FaProjectDiagram className="text-gray-900 dark:text-gray-200"/></div>
              <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{noOfProjects}</h1>
          </div>
      </div>
      <div className="flex flex-col w-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 h-full">
        <h2 className="flex space-x-2 items-center text-md text-gray-500 dark:text-gray-200"><span>Projects Completed </span><FaCheckCircle fill="green"/></h2>
        <div className="flex items-center space-x-3 mt-5">
          <div className="border border-gray-500 dark:border-gray-300 circle p-2 rounded rounded-full">
            <FaProjectDiagram className="text-gray-900 dark:text-gray-200"/></div>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{projectsCompleted}</h1>
        </div>
      </div>
    </div>
    
    <div className="flex justify-between items-center text-sm font-medium space-x-2 h-full">
    <div className="flex flex-col w-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 h-full">
        <h2 className="flex space-x-2 items-center text-md text-gray-500 dark:text-gray-200"><span>No. of Tasks </span><FaSortNumericDownAlt/></h2>
        <div className="flex items-center space-x-3 mt-5">
          <div className="border border-gray-500 dark:border-gray-300 circle p-2 rounded rounded-full">
            <FaTasks className="text-gray-900 dark:text-gray-200"/></div>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{noOfTasks}</h1>
        </div>
      </div>
      <div className="flex flex-col w-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 h-full">
        <h2 className="flex space-x-2 items-center text-md text-gray-500 dark:text-gray-200"><span>Tasks Completed </span><FaCheckCircle fill="green"/></h2>
        <div className="flex items-center space-x-3 mt-5">  
          <div className="border border-gray-500 dark:border-gray-300 circle p-2 rounded rounded-full">
            <FaTasks className="text-gray-900 dark:text-gray-200"/></div>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{tasksCompleted}</h1>
        </div>
      </div>
    </div>
  </div>
  );
};

export default StatsUI;