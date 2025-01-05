import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { FaCheckCircle, FaProjectDiagram, FaSortNumericDownAlt, FaTasks } from "react-icons/fa";
import StatLoadingSkeleton from "./skeletons/statLoadingSkeleton";
import { Realtime } from "ably";
import { IProject, ITask } from "../../../types/models";

const StatsUI = () => {
  const [noOfProjects, setNoOfProjects] = useState<number>(0);
  const [projectsCompleted, setProjectsCompleted] = useState<number>(0);
  const [noOfTasks, setNoOfTasks] = useState<number>(0);
  const [tasksCompleted, setTasksCompleted] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const token: string = Cookies.get('jwtToken') as string;
  const jwtPayload: JWTPayload = jwt.decode(token) as JWTPayload;

  const fetchTaskStats = async () => {
    setLoading(true);
    try {
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
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching projects:', error);
    }
  };

  const fetchProjectStats = async () => {
    setLoading(true);
    try {
      const projectResponse = await fetch(`/api/project/stats?teamMember=${jwtPayload._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application',
          'Authorization': `Bearer ${token}`,
        }
      });

      const projectStatsdata = await projectResponse.json();
      setNoOfProjects(projectStatsdata.projectsCount);
      setProjectsCompleted(projectStatsdata.completed);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching projects:', error);
    }
  };

  const ably = new Realtime({ key: process.env.NEXT_PUBLIC_ABLY_API_KEY });
  const userChannel = ably.channels.get(jwtPayload._id);

  useEffect(() => {

    userChannel.subscribe('projectUpdated', () => {
      fetchProjectStats();
    });

    userChannel.subscribe('projectDeleted', (message) => {
      const deleteProject: IProject = message.data;
      setNoOfProjects((noOfProjects) => noOfProjects - 1);
      setProjectsCompleted((projectCompleted) => projectCompleted - (deleteProject.status === 'completed' ? 1 : 0));
    });

    userChannel.subscribe('projectCreated', (message) => {
      const newTask: IProject = message.data;
      setNoOfProjects((noOfProjects) => noOfProjects + 1);
      setProjectsCompleted((projectCompleted) => projectCompleted + (newTask.status === 'completed' ? 1 : 0));
    });

    userChannel.subscribe('taskUpdated', () => {
      fetchTaskStats();
    });

    userChannel.subscribe('taskDeleted', (message) => {
      const deletedTask: ITask = message.data;
      setNoOfTasks((noOfTasks) => noOfTasks - 1);
      setTasksCompleted((tasksCompleted) => tasksCompleted - (deletedTask.status === 'completed' ? 1 : 0));
    });

    userChannel.subscribe('taskCreated', (message) => {
      const newTask: ITask = message.data;
      setNoOfTasks((noOfTasks) => noOfTasks + 1);
      setTasksCompleted((tasksCompleted) => tasksCompleted + (newTask.status === 'completed' ? 1 : 0));
    });

    return () => {
      userChannel.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwtPayload._id]);


  useEffect(() => {
    fetchTaskStats();
    fetchProjectStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <StatLoadingSkeleton />
  }

  return (<div className="flex flex-col lg:w-2/6 lg:mt-0 space-y-2 justify-between h-full">

    <div className="flex justify-between items-center text-sm font-medium space-x-2 h-full">
      <div className="flex flex-col w-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 h-full">
        <h2 className="flex space-x-2 items-center text-md text-gray-500 dark:text-gray-200"><span>No. Of Projects</span><FaSortNumericDownAlt /></h2>
        <div className="flex items-center space-x-3 mt-5">
          <div className="border border-gray-500 dark:border-gray-300 circle p-2 rounded rounded-full">
            <FaProjectDiagram className="text-gray-900 dark:text-gray-200" /></div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{noOfProjects}</h1>
        </div>
      </div>
      <div className="flex flex-col w-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 h-full">
        <h2 className="flex space-x-2 items-center text-md text-gray-500 dark:text-gray-200"><span>Projects Completed </span><FaCheckCircle fill="green" /></h2>
        <div className="flex items-center space-x-3 mt-5">
          <div className="border border-gray-500 dark:border-gray-300 circle p-2 rounded rounded-full">
            <FaProjectDiagram className="text-gray-900 dark:text-gray-200" /></div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{projectsCompleted}</h1>
        </div>
      </div>
    </div>

    <div className="flex justify-between items-center text-sm font-medium space-x-2 h-full">
      <div className="flex flex-col w-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 h-full">
        <h2 className="flex space-x-2 items-center text-md text-gray-500 dark:text-gray-200"><span>No. of Tasks </span><FaSortNumericDownAlt /></h2>
        <div className="flex items-center space-x-3 mt-5">
          <div className="border border-gray-500 dark:border-gray-300 circle p-2 rounded rounded-full">
            <FaTasks className="text-gray-900 dark:text-gray-200" /></div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{noOfTasks}</h1>
        </div>
      </div>
      <div className="flex flex-col w-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 h-full">
        <h2 className="flex space-x-2 items-center text-md text-gray-500 dark:text-gray-200"><span>Tasks Completed </span><FaCheckCircle fill="green" /></h2>
        <div className="flex items-center space-x-3 mt-5">
          <div className="border border-gray-500 dark:border-gray-300 circle p-2 rounded rounded-full">
            <FaTasks className="text-gray-900 dark:text-gray-200" /></div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{tasksCompleted}</h1>
        </div>
      </div>
    </div>
  </div>
  );
};

export default StatsUI;