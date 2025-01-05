'use client';
import CreateTaskComponent from '../../components/tasks/Popups/createTaskPopupUI';
import FilterComponent from '../../components/tasks/Popups/filtersPopupUI';
import RecentTasksUI from '../../components/tasks/recentTasksUI';
import TaskOperationsUI from '../../components/tasks/taskOperationsUI';
import TaskListAndGrid from '../../components/tasks/tasksListAndGrid';
import { ITask } from '../../../types/models';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { Realtime } from 'ably';
import TasksChartUI from '../../components/tasks/taskChart';
import { motion, AnimatePresence } from 'framer-motion';

const TaskPage = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isCardView, setIsCardView] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showFilterPopup, setShowFilterPopup] = useState<boolean>(false);
  const [showCreateTaskPopup, setShowCreateTaskPopup] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [priority, setPriority] = useState<string[]>([]);
  const [status, setStatus] = useState<string[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [deadlineBefore, setDeadlineBefore] = useState<Date | null>(null);
  const [deadlineAfter, setDeadlineAfter] = useState<Date | null>(null);
  const [lastUpdatedBefore, setLastUpdatedBefore] = useState<Date | null>(null);
  const [lastUpdatedAfter, setLastUpdatedAfter] = useState<Date | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalTasks, setTotalTasks] = useState<number>(0);

  const resetFilters = () => {
    setPriority([]);
    setStatus([]);
    setSelectedProjects([]);
    setSelectedUsers([]);
    setDeadlineBefore(null);
    setDeadlineAfter(null);
    setLastUpdatedBefore(null);
    setLastUpdatedAfter(null);
    setFilter("");
    setShowFilterPopup(false);
  };

  const applyFilters = async () => {
    let newFilter = "";
    if (priority.length > 0) {
      newFilter += `priority=${priority.join(',')}&`;
    }
    if (status.length > 0) {
      newFilter += `status=${status.join(',')}&`;
    }
    if (selectedProjects.length > 0) {
      newFilter += `projectId=${selectedProjects.join(',')}&`;
    }
    if (selectedUsers.length > 0) {
      newFilter += `createdBy=${selectedUsers.join(',')}&`;
    }
    if (deadlineBefore) {
      newFilter += `deadlineBefore=${deadlineBefore.toISOString()}&`;
    }
    if (deadlineAfter) {
      newFilter += `deadlineAfter=${deadlineAfter.toISOString()}&`;
    }
    if (lastUpdatedBefore) {
      newFilter += `lastUpdatedBefore=${lastUpdatedBefore.toISOString()}&`;
    }
    if (lastUpdatedAfter) {
      newFilter += `lastUpdatedAfter=${lastUpdatedAfter.toISOString()}&`;
    }
    setFilter(newFilter);
    setShowFilterPopup(false);
  };

  const token: string = Cookies.get('jwtToken') as string;
  const jwtPayload: JWTPayload = jwt.decode(token) as JWTPayload;

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/task?assignedTo=${jwtPayload._id}&search=${searchQuery}&${filter}&limit=${limit}&skip=${limit * (currentPage - 1)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setTasks(data.tasks);
      setTotalTasks(data.totalCount);
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
  }, [jwtPayload._id]);

  useEffect(() => {
    fetchTasks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, filter, limit, currentPage]);

  return (
    <motion.main
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 text-gray-800 dark:text-gray-100 container mx-auto p-6 h-screen"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className={`lg:flex justify-between`}
      >
        <RecentTasksUI tasks={tasks} />
        <TasksChartUI />
      </motion.div>

      <TaskOperationsUI
        setSearchQuery={setSearchQuery}
        setCurrentPage={setCurrentPage}
        setShowFilterPopup={setShowFilterPopup}
        setShowCreateTaskPopup={setShowCreateTaskPopup}
        setIsCardView={setIsCardView}
        isCardView={isCardView}
      />

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TaskListAndGrid
            tasks={tasks}
            isCardView={isCardView}
            limit={limit}
            setLimit={setLimit}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalTasks={totalTasks}
            fetchTasks={fetchTasks}
            setIsCardView={setIsCardView}
            loading={loading}
          />
        </motion.div>
      </AnimatePresence>

      {showFilterPopup && (
          <FilterComponent
            priority={priority}
            setPriority={setPriority}
            status={status}
            setStatus={setStatus}
            selectedProjects={selectedProjects}
            setSelectedProjects={setSelectedProjects}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
            deadlineBefore={deadlineBefore}
            setDeadlineBefore={setDeadlineBefore}
            deadlineAfter={deadlineAfter}
            setDeadlineAfter={setDeadlineAfter}
            lastUpdatedBefore={lastUpdatedBefore}
            setLastUpdatedBefore={setLastUpdatedBefore}
            lastUpdatedAfter={lastUpdatedAfter}
            setLastUpdatedAfter={setLastUpdatedAfter}
            setShowFilterPopup={setShowFilterPopup}
            applyFilters={applyFilters}
            resetFilters={resetFilters}
          />
      )}

      {showCreateTaskPopup && (
          <CreateTaskComponent
            setShowCreateTaskPopup={setShowCreateTaskPopup}
            fetchTasks={fetchTasks}
            isRelatedProjectFeild={true}
          />
          
      )}
    </motion.main>
  );
};

export default TaskPage;
