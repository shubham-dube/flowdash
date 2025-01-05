'use client'
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTasks, FaSpinner, FaCheck } from "react-icons/fa";
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import StatGridSkelleton from "./skeletons/statGridSkeleton";

const StatGrids = () => {
  const [completedTasks, setCompletedTasks] = useState<number>(0);
  const [ongoingTasks, setOngoingTasks] = useState<number>(0);
  const [todoTasks, setToDoTasks] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const token: string = Cookies.get('jwtToken') as string;
  const jwtPayload: JWTPayload = jwt.decode(token) as JWTPayload;

  const fetchStats = async () => {
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
      setOngoingTasks(taskStatsData.statusCount['in-progress']);
      setCompletedTasks(taskStatsData.statusCount['completed']);
      setToDoTasks(taskStatsData.statusCount['to-do']);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return <StatGridSkelleton />;
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="flex flex-col sm:flex-row space-y-5 sm:space-y-0 sm:space-x-5"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
      }}
    >
      <motion.div
        className="flex-1 bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg transition transform hover:scale-105 relative"
        variants={cardVariants}
        title="Number of tasks you’ve completed"
      >
        <div className="flex items-center space-x-3">
          <FaCheck className="w-10 h-10 rounded-full text-white p-2 bg-green-500" />
          <h4 className="text-md font-semibold">
            <span className="text-gray-500 dark:text-gray-200">Tasks Completed</span>
            <span><p className="text-2xl font-bold">{completedTasks}</p></span>
          </h4>
        </div>
      </motion.div>

      <motion.div
        className="flex-1 bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg transition transform hover:scale-105 relative"
        variants={cardVariants}
        title="Number of tasks currently in progress"
      >
        <div className="flex items-center space-x-3">
          <FaSpinner className="w-10 h-10 rounded-full text-white p-2 bg-blue-500 animate-spin" />
          <h4 className="text-md font-semibold">
            <span className="text-gray-500 dark:text-gray-200">On Going Tasks</span>
            <span><p className="text-2xl font-bold">{ongoingTasks}</p></span>
          </h4>
        </div>
      </motion.div>

      <motion.div
        className="flex-1 bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg transition transform hover:scale-105 relative"
        variants={cardVariants}
        title="Tasks that are yet to be started"
      >
        <div className="flex items-center space-x-3">
          <FaTasks className="w-10 h-10 rounded-full text-white p-2 bg-yellow-500" />
          <h4 className="text-md font-semibold">
            <span className="text-gray-500 dark:text-gray-200">To Do Tasks</span>
            <span><p className="text-2xl font-bold">{todoTasks}</p></span>
          </h4>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StatGrids;