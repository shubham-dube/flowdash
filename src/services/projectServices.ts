/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProject } from '../types/models';
import { ProjectModel } from '../models/index';
import { FilterQuery } from 'mongoose';
import { publishToProjectChannel, publishToUserChannel } from '../lib/ablyUtility';

// Create a new project
export const createProject = async (data: Partial<IProject>) => {
    try {
        const newProject = new ProjectModel(data);
        await newProject.save();

        const teamMembers: string[] = newProject.teamMembers;
        const response = await getProject({ _id: newProject._id });
        teamMembers.forEach((user) => {
            publishToUserChannel(user, 'projectCreated', response.project);
        });

        return { message: 'Project created successfully', isError: false, project: newProject };
    } catch (error: any) {
        console.error('Error creating project:', error);
        return { message: error.message || 'Error creating project', isError: true, project: null };
    }
};

// Get a project by query
export const getProject = async (query: FilterQuery<IProject>):Promise<{message:string, isError:boolean, project:IProject | null }> => {
    try {
        const project = await ProjectModel.findOne(query).populate('createdBy teamMembers tasks');
        if (!project) {
            return { message: 'Project not found', isError: true, project: null };
        }
        return { message: 'Project retrieved successfully', isError: false, project };
    } catch (error: any) {
        console.error('Error fetching project:', error);
        return { message: error.message || 'Error retrieving project', isError: true, project: null };
    }
};

export const getProjectsByQuery = async (query: FilterQuery<IProject>, wantCount: boolean, limit: number = 50, skip: number = 0) => {
    try {
        if (wantCount) {
            const count = await ProjectModel.countDocuments(query);
            return { message: 'Projects count retrieved successfully', isError: false, count: count };
        }
        const projects = await ProjectModel.find(query).limit(limit).skip(skip).sort({ lastUpdated: -1 }).populate('createdBy teamMembers tasks');
        return { message: 'Projects retrieved successfully', isError: false, projects: projects };
    } catch (error: any) {
        console.error('Error fetching projects by query:', error);
        return { message: error.message || 'Error retrieving projects', isError: true, tasks: null };
    }
};

// Update a project
export const updateProject = async (query: FilterQuery<IProject>, updateData: Partial<IProject>) => {
    try {
        const updatedProject = await ProjectModel.findOneAndUpdate(query, updateData, { new: true });
        if (!updatedProject) {
            return { message: 'Project not found for update', isError: true, project: null };
        }

        const teamMembers: string[] = updatedProject.teamMembers;
        const response = await getProject({ _id: updatedProject._id });
        teamMembers.forEach((user) => {
            publishToUserChannel(user, 'projectUpdated', response.project);
        });
        publishToProjectChannel(updatedProject._id, 'projectUpdated', response.project);

        return { message: 'Project updated successfully', isError: false, project: updatedProject };
    } catch (error: any) {
        console.error('Error updating project:', error);
        return { message: error.message || 'Error updating project', isError: true, project: null };
    }
};

// Delete a project
export const deleteProject = async (query: FilterQuery<IProject>) => {
    try {
        const deletedProject = await ProjectModel.findOneAndDelete(query);
        if (!deletedProject) {
            return { message: 'Project not found for deletion', isError: true, project: null };
        }

        const teamMembers: string[] = deletedProject.teamMembers;
        teamMembers.forEach((user) => {
            publishToUserChannel(user, 'projectDeleted', deletedProject);
        });

        return { message: 'Project deleted successfully', isError: false, project: deletedProject };
    } catch (error: any) {
        console.error('Error deleting project:', error);
        return { message: error.message || 'Error deleting project', isError: true, project: null };
    }
};

// Get all projects
export const getAllProjects = async (limit: number = 50, skip: number = 0) => {
    try {
        const projects = await ProjectModel.find().populate('createdBy teamMembers tasks').limit(limit).skip(skip);
        return { message: 'Projects retrieved successfully', isError: false, projects };
    } catch (error: any) {
        console.error('Error fetching projects:', error);
        return { message: error.message || 'Error retrieving projects', isError: true, projects: null };
    }
};
