'use client'
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import StatGrids from "@/app/components/dashboard/statGrids";
import UpcomingDeadlines from "@/app/components/dashboard/upcomingDeadlines";
import OnGoingTasks from "@/app/components/dashboard/ongoingTasks";
import ProjectsWorkingOn from "@/app/components/dashboard/projectWorkingOn";
import CustomPieChart from "@/app/components/tasks/pieChart";
import { ITask } from "@/types/models";
import TasksChartSkeleton from "@/app/components/tasks/skeletons/pieChartSkeleton";

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

        <div className="flex-1 space-y-5">

          <StatGrids />
          {loading ? <TasksChartSkeleton title="Tasks" /> :
            <CustomPieChart tasks={tasks} title="Tasks" />}


          <div className="lg:flex justify-between space-y-5 lg:space-y-0 lg:space-x-5">
            <OnGoingTasks />
            <UpcomingDeadlines />
          </div>
        </div>


        <ProjectsWorkingOn />

      </div>
    </main>
  );
};

export default DashboardPage;
