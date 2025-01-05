'use client'
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import StatGrids from "../../components/dashboard/statGrids";
import UpcomingDeadlines from "../../components/dashboard/upcomingDeadlines";
import OnGoingTasks from "../../components/dashboard/ongoingTasks";
import ProjectsWorkingOn from "../../components/dashboard/projectWorkingOn";
import CustomPieChart from "../../components/tasks/pieChart";
import { ITask } from "../../../types/models";
import TasksChartSkeleton from "../../components/tasks/skeletons/pieChartSkeleton";
import { motion } from "framer-motion";

const DashboardPage = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const token: string = Cookies.get('jwtToken') as string;
  const jwtPayload: JWTPayload = jwt.decode(token) as JWTPayload;

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/task?assignedTo=${jwtPayload._id}`, {
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
      setLoading(false);
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="p-5 text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-5">

      <motion.div
          className="flex-1 space-y-5"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
        <div className="flex-1 space-y-5">

          <StatGrids />
          {loading ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <TasksChartSkeleton title="Tasks" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <CustomPieChart tasks={tasks} title="Tasks" />
            </motion.div>
          )}


          <div className="lg:flex justify-between space-y-5 lg:space-y-0 lg:space-x-5">
          <motion.div
          className="flex w-full"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <OnGoingTasks />
            </motion.div>
            <motion.div
            className="flex w-full"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <UpcomingDeadlines />
            </motion.div>
          </div>
        </div>
        </motion.div>

        <motion.div
        className="w-full lg:w-1/3 space-y-5"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <ProjectsWorkingOn />
        </motion.div>

      </div>
    </main>
  );
};

export default DashboardPage;
