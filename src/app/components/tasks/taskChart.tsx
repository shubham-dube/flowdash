import { ITask } from '@/types/models';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import CustomPieChart from './pieChart';
import TasksChartSkeleton from './skeletons/pieChartSkeleton';
import { Realtime } from 'ably';

const TasksChartUI = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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

  const ably = new Realtime({ key: process.env.NEXT_PUBLIC_ABLY_API_KEY });
  const userChannel = ably.channels.get(jwtPayload._id);

  useEffect(() => {

    userChannel.subscribe('taskUpdated', (message) => {
      const updatedTask: ITask = message.data;
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
    });

    userChannel.subscribe('taskDeleted', (message) => {
      const deletedTask: ITask = message.data;
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== deletedTask._id));
    });

    userChannel.subscribe('taskCreated', (message) => {
      const newTask: ITask = message.data;
      setTasks((prevTasks) => {
        const taskExists = prevTasks.some((task) => task._id === newTask._id);
        if (taskExists) {
          return prevTasks;
        } else {
          return [newTask, ...prevTasks];
        }
      });
    });

    return () => {
      userChannel.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwtPayload._id]);

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <TasksChartSkeleton />
  }

  return <CustomPieChart tasks={tasks} />;
}

export default TasksChartUI;