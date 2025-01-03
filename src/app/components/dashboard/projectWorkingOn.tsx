'use client'
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { IProject } from "@/types/models";
import ProjectListAndGrid from "../projects/projectListAndGrid";
import {useRouter} from "next/navigation";

const ProjectsWorkingOn = () => {
    const router = useRouter();

    const [projects, setProject] = useState<IProject[]>([]);
    const token: string = Cookies.get('jwtToken') as string;
    const jwtPayload: JWTPayload = jwt.decode(token) as JWTPayload;

    // Fetch tasks from API
    const fetchProjects = async () => {
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
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    useEffect(() => {
        fetchProjects();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="w-full lg:w-1/3 space-y-5">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow lg:min-h-screen">
            <h4 className="text-md font-semibold justify-between flex items-center mb-3 text-gray-500 dark:text-gray-200">
                <span>PROJECTS</span> 
                <span onClick={()=>router.push(`/projects`)} className="hover:cursor-pointer text-sm text-blue-500 font-normal">View all</span>
            </h4>
                <ProjectListAndGrid projects={projects} isCardView={true} limit={10}
                    setLimit={function (limit: number): void { console.log(limit); }}
                    currentPage={1} setCurrentPage={function (page: number): void { console.log(page); }}
                    totalProjects={0} fetchProjects={function (): void { }}
                    setIsCardView={function (isCardView: boolean): void { console.log(isCardView); }}
                    wantMetaOptions={false} />
            </div>
        </div>
    )
}

export default ProjectsWorkingOn;