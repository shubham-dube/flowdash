import { ITask } from '@/types/models';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import CustomPieChart from './pieChart';
import TasksChartSkeleton from './skeletons/pieChartSkeleton';

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

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <TasksChartSkeleton />
  }

  return <CustomPieChart tasks={tasks}/>;
}

export default TasksChartUI;