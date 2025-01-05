'use client';
import StatsUI from '../../components/projects/statsUI';
import RecentAssignedTasksUI from '../../components/projects/recentAssignedTasksUI';
import { IProject } from '../../../types/models';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import ProjectOperationsUI from '../../components/projects/projectOperationsUI';
import ProjectListAndGrid from '../../components/projects/projectListAndGrid';
import ProjectFilterComponent from '../../components/projects/Popups/projectFiltersPopupUI';
import CreateProjectComponent from '../../components/projects/Popups/createProjectPopupUI';
import { Realtime } from 'ably';

const ProjectsPage = () => {
  const [projects, setProject] = useState<IProject[]>([]);
  const [isCardView, setIsCardView] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showFilterPopup, setShowFilterPopup] = useState<boolean>(false);
  const [showCreateProjectPopup, setShowCreateProjectPopup] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Filter Component Props
  const [status, setStatus] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [deadlineBefore, setDeadlineBefore] = useState<Date | null>(null);
  const [deadlineAfter, setDeadlineAfter] = useState<Date | null>(null);
  const [lastUpdatedBefore, setLastUpdatedBefore] = useState<Date | null>(null);
  const [lastUpdatedAfter, setLastUpdatedAfter] = useState<Date | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalTasks, setTotalTasks] = useState<number>(0);

  const resetFilters = () => {
    setStatus([]);
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
    if (status.length > 0) {
      newFilter += `status=${status.join(',')}&`;
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
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/project?search=${searchQuery}&${filter}&limit=${limit}&skip=${limit * (currentPage - 1)}&teamMember=${jwtPayload._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      const data = await response.json();
      setProject(data.projects);
      setTotalTasks(data.projects.length);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching tasks:', error);
    }
  };

  const ably = new Realtime({ key: process.env.NEXT_PUBLIC_ABLY_API_KEY }); 
    const userChannel = ably.channels.get(jwtPayload._id);
  
    useEffect(() => {
  
      userChannel.subscribe('projectUpdated', (message) => {
        const updatedProject:IProject = message.data;
        setProject((prevProjects) =>
          prevProjects.map((project) =>
            project._id === updatedProject._id ? updatedProject : project
          )
        );
      });
  
      userChannel.subscribe('projectDeleted', (message) => {
        const deletedProject:IProject = message.data;
        setProject((prevProjects) => prevProjects.filter((project) => project._id !== deletedProject._id));
      });
  
      userChannel.subscribe('projectCreated', (message) => {
        const newProject:IProject = message.data;
        setProject((prevProjects) => {
          const projectExists = prevProjects.some((project) => project._id === newProject._id);
          if (projectExists) {
              return prevProjects;
          } else {
              return [newProject, ...prevProjects];
          }
        });
      });
  
      return () => {
        userChannel.unsubscribe();
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jwtPayload._id]);

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, filter, limit, currentPage]);

  return (
    <main className="flex-1 text-gray-800 dark:text-gray-100 container mx-auto p-6 h-screen">

      <div className={`lg:flex justify-between lg:h-72`}>
        <RecentAssignedTasksUI projects={projects}/>
        <StatsUI/>
      </div>

      {/* Tasks Operation Section */}
      <ProjectOperationsUI setSearchQuery={setSearchQuery} setCurrentPage={setCurrentPage}
        setShowFilterPopup={setShowFilterPopup} setShowCreateProjectPopup={setShowCreateProjectPopup} setIsCardView={setIsCardView}
        isCardView={isCardView}/>


      {/* Tasks Section */}
      <ProjectListAndGrid projects={projects} isCardView={isCardView} limit={limit} setLimit={setLimit} currentPage={currentPage}
        setCurrentPage={setCurrentPage} totalProjects={totalTasks} fetchProjects={fetchProjects} setIsCardView={setIsCardView} loading={loading}/>


      {/* Filter Popup */}
      {showFilterPopup && <ProjectFilterComponent status={status} setStatus={setStatus} selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers} deadlineBefore={deadlineBefore} setDeadlineBefore={setDeadlineBefore}
          deadlineAfter={deadlineAfter} setDeadlineAfter={setDeadlineAfter} lastUpdatedBefore={lastUpdatedBefore}
          setLastUpdatedBefore={setLastUpdatedBefore} lastUpdatedAfter={lastUpdatedAfter} setLastUpdatedAfter={setLastUpdatedAfter}
          setShowFilterPopup={setShowFilterPopup} applyFilters={applyFilters} resetFilters={resetFilters} /> }

      {/* Create Task Popup */}
      {showCreateProjectPopup && <CreateProjectComponent setShowCreateProjectPopup={setShowCreateProjectPopup} fetchProjects={fetchProjects} />}

    </main>
  );
};

export default ProjectsPage;
