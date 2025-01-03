'use client';
import { usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import { IProject, ITask, IUser } from '@/types/models';
import { useEffect, useState } from 'react';
import HeaderMetaData from '@/app/components/projects/detailPage/header';
import SemiCircleChart from '@/app/components/projects/detailPage/overview/taskMeter';
import {  FaFileAlt } from 'react-icons/fa';
import ProjectMetaData from '@/app/components/projects/detailPage/overview/metaData';
import ProjectTasksTabUI from '@/app/components/projects/detailPage/tasks/projectTasks';
import GanttChart from '@/app/components/projects/detailPage/timeline/ganttChart';
import { Task } from 'gantt-task-react';
import ProjectMemberTabUI from '@/app/components/projects/detailPage/members/memberTab';


const ProjectDetails = () => {
    const path = usePathname();
    const id = path.split('/').pop();
    const [project, setProject] = useState<IProject | null>(null);
    const [activeTab, setActiveTab] = useState('Overview');

    const convertITaskToTask = (iTask: ITask): Task => {
        return {
          id: iTask._id.toString(),
          type: "task",
          name: iTask.title,
          start: new Date(iTask.createdAt),
          end: iTask.deadline ? new Date(iTask.deadline) : new Date(),
          progress: 100, 
        };
      };

    const renderContent = () => {
        switch (activeTab) {
            case 'Overview':
                return (
                    <div className="mt-4 space-y-4">
                        <div className='lg:flex w-full gap-4'>
                            <SemiCircleChart tasks={((project?.tasks) ? project.tasks as ITask[] : [])} />
                            <ProjectMetaData project={project as IProject}/>
                        </div>

                        <div className='flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4'>
                            <div className='flex justify-between items-center w-full mb-2'>
                                <h2 className='text-lg'>Project Description</h2>
                            </div>
                            <div className='p-4 space-y-3 bg-gray-100 dark:bg-gray-700 border-l-8 border-blue-500 dark:border-blue-700 rounded-lg w-full h-full'>
                                <div className='flex justify-between w-full'>
                                    <span className='gap-4 flex items-center text-gray-500 dark:text-gray-300'>
                                        <FaFileAlt className='w-16 h-16' />
                                        <span>{project?.description}</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                );
            case 'Tasks':
                return (
                    <ProjectTasksTabUI id={project?._id} members={project?.teamMembers as IUser[]}/>
                );
            case 'Notes':
                return <div>Project Notes Content</div>;
            case 'Timeline':
                const tasksGantt: Task[] = [];
                const length: number = project?.tasks.length as number;
                for(let i = 0; i <length ; i++) {
                    const task = project?.tasks[i] as ITask;
                    tasksGantt.push(convertITaskToTask(task));
                }
                return <div className='mt-4'><GanttChart tasks={tasksGantt}/></div>;
            case 'Members':
                return <ProjectMemberTabUI id={id as string} teamMembers={project?.teamMembers as IUser[]} fetchProjects={fetchProject}/>
            default:
                return null;
        }
    };

    const fetchProject = async () => {
        const token: string = Cookies.get('jwtToken') as string;

        try {
            const response = await fetch(`/api/project?getOneProject=${id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );
            const data = await response.json();
            setProject(data.project)
            console.log(data);
        } catch (error) {
            console.error('Error fetching project:', error);
        }
    }
    

    useEffect(() => {
        fetchProject();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="p-4 text-gray-800 dark:text-gray-100">
            <HeaderMetaData
                projectTitle={project?.title as string}
                createdBy={project?.createdBy.displayName}
                createdDate={project?.createdAt as Date}
                deadline={project?.deadline as Date}
            />

            <div className="flex gap-2 mt-2 overflow-x-auto hide-scrollbar">
                {['Overview', 'Tasks', 'Notes', 'Timeline', 'Members'].map((tab) => (
                    <button
                        key={tab}
                        className={`flex-1 px-4 py-2 rounded rounded-lg ${activeTab === tab ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-700'}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="flex flex-col gap-2 mt-2">
                {renderContent()}
            </div>
        </div>
    );
};

export default ProjectDetails;
