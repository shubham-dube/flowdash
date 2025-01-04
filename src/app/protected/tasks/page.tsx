'use client';
import CreateTaskComponent from '@/app/components/tasks/Popups/createTaskPopupUI';
import FilterComponent from '@/app/components/tasks/Popups/filtersPopupUI';
import RecentTasksUI from '@/app/components/tasks/recentTasksUI';
import TaskOperationsUI from '@/app/components/tasks/taskOperationsUI';
import TaskListAndGrid from '@/app/components/tasks/tasksListAndGrid';
import { ITask } from '@/types/models';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import TasksChartUI from '@/app/components/tasks/taskChart';

const TaskPage = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isCardView, setIsCardView] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showFilterPopup, setShowFilterPopup] = useState<boolean>(false);
  const [showCreateTaskPopup, setShowCreateTaskPopup] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [loading, setLoading] = useState<boolean> (false);

  // Filter Component Props
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
  }

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
  }

  const token: string = Cookies.get('jwtToken') as string;
  const jwtPayload: JWTPayload = jwt.decode(token) as JWTPayload;

  // Fetch tasks from API
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/task?assignedTo=${jwtPayload._id}&search=${searchQuery}&${filter}&limit=${limit}&skip=${limit * (currentPage - 1)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
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

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, filter, limit, currentPage]);

  return (
    <main className="flex-1 text-gray-800 dark:text-gray-100 container mx-auto p-6 h-screen">

      <div className={`lg:flex justify-between`}>
        <RecentTasksUI tasks={tasks} />
        <TasksChartUI/>
      </div>

      {/* Tasks Operation Section */}
      <TaskOperationsUI setSearchQuery={setSearchQuery} setCurrentPage={setCurrentPage}
      setShowFilterPopup={setShowFilterPopup} setShowCreateTaskPopup={setShowCreateTaskPopup} setIsCardView={setIsCardView}
      isCardView={isCardView} />


      {/* Tasks Section */}
      <TaskListAndGrid tasks={tasks} isCardView={isCardView} limit={limit} setLimit={setLimit} currentPage={currentPage}
      setCurrentPage={setCurrentPage} totalTasks={totalTasks} fetchTasks={fetchTasks} setIsCardView={setIsCardView} loading={loading} />


      {/* Filter Popup */}
      {showFilterPopup && <FilterComponent priority={priority} setPriority={setPriority} status={status} setStatus={setStatus}
        selectedProjects={selectedProjects} setSelectedProjects={setSelectedProjects} selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers} deadlineBefore={deadlineBefore} setDeadlineBefore={setDeadlineBefore}
        deadlineAfter={deadlineAfter} setDeadlineAfter={setDeadlineAfter} lastUpdatedBefore={lastUpdatedBefore}
        setLastUpdatedBefore={setLastUpdatedBefore} lastUpdatedAfter={lastUpdatedAfter} setLastUpdatedAfter={setLastUpdatedAfter}
        setShowFilterPopup={setShowFilterPopup} applyFilters={applyFilters} resetFilters={resetFilters} />}

      {/* Create Task Popup */}
      {showCreateTaskPopup && <CreateTaskComponent setShowCreateTaskPopup={setShowCreateTaskPopup} fetchTasks={fetchTasks} />}


    </main>
  );
};

export default TaskPage;
