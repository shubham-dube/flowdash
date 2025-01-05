'use client'
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { IProject } from "@/types/models";
import ProjectListAndGrid from "../projects/projectListAndGrid";
import { useRouter } from "next/navigation";
import ProjectsGridSkeleton from "../projects/skeletons/projectGrid";
import Spinner from "../common/circularLoadingIndicator";

const ProjectsWorkingOn = () => {
    const router = useRouter();

    const [isNavigated, setIsNavigated] = useState<boolean>(false);
    const [projects, setProject] = useState<IProject[]>([]);
    const [loading, setLoading] = useState(true);
    const token: string = Cookies.get('jwtToken') as string;
    const jwtPayload: JWTPayload = jwt.decode(token) as JWTPayload;

    // Fetch tasks from API
    const fetchProjects = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/project?limit=${3}&teamMember=${jwtPayload._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            const data = await response.json();
            setProject(data.projects);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error fetching projects:', error);
        }
    };

    useEffect(() => {
        fetchProjects();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow lg:min-h-screen">
                {!loading ? <h4 className="text-md font-semibold justify-between flex items-center mb-3 text-gray-500 dark:text-gray-200">
                    <span>PROJECTS</span>
                    <span onClick={() => {
                        router.push(`/projects`);
                        setIsNavigated(true);
                    }} className="hover:cursor-pointer text-sm text-blue-500 font-normal">View all</span>
                </h4> :
                    <div className="flex justify-between items-start">
                        <div className="w-[80%] space-y-2">
                            <div className="w-3/4 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        </div>
                        <div className="w-12 h-4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                    </div>}
                {
                    loading ? <ProjectsGridSkeleton wantMetaOptions={false} /> :
                        <ProjectListAndGrid projects={projects} isCardView={true} limit={10}
                            setLimit={function (limit: number): void { console.log(limit); }}
                            currentPage={1} setCurrentPage={function (page: number): void { console.log(page); }}
                            totalProjects={0} fetchProjects={function (): void { }}
                            setIsCardView={function (isCardView: boolean): void { console.log(isCardView); }}
                            wantMetaOptions={false} />
                }
            </div>
            <div className='absolute z-50'>
            {isNavigated && (
                <div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center'>
                    <Spinner className='h-10 w-10 border-white ' /></div>
            )}
            </div>
        </div>
    )
}

export default ProjectsWorkingOn;