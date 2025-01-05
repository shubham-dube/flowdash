/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITask } from '../types/models';
import { TaskModel } from '../models/index';
import { FilterQuery } from 'mongoose';
import { ProjectModel } from '../models/index';
import { publishToProjectChannel, publishToUserChannel } from '../lib/ablyUtility';

// Create a new task
export const createTask = async (data: Partial<ITask>) => {
    try {
        const newTask = new TaskModel(data);
        await newTask.save();
        await ProjectModel.updateOne({ _id: data.projectId }, { $push: { tasks: newTask._id } });

        const assignedUsers:string[] = newTask.assignedTo;
        const response = await getTask({ _id: newTask._id });
        assignedUsers.forEach((user) => {
            publishToUserChannel(user, 'taskCreated', response.task);
        });
        publishToProjectChannel(newTask.projectId, 'taskCreated', response.task);

        return { message: 'Task created successfully', isError: false, task: newTask };
    } catch (error: any) {
        console.error('Error creating task:', error);
        return { message: error.message || 'Error creating task', isError: true };
    }
};

// Get a task by query
export const getTask = async (query: FilterQuery<ITask>):Promise<{message: string, isError: boolean, task: ITask | null}> => {
    try {
        const task = await TaskModel.findOne(query).populate('projectId assignedTo assignedBy reviewedBy');
        if (!task) {
            return { message: 'Task not found', isError: true, task: null };
        }
        return { message: 'Task retrieved successfully', isError: false, task: task };
    } catch (error: any) {
        console.error('Error fetching task:', error);
        return { message: error.message || 'Error retrieving task', isError: true, task: null };
    }
};

export const getTasksByQuery = async (query: FilterQuery<ITask>, onlyCount: boolean, limit: number = 50, skip: number = 0) => {
    try {
        if (onlyCount) {
            const totalCount = await TaskModel.countDocuments(query);
            return { message: 'Tasks Count retrieved successfully', count: totalCount, isError: false, tasks: null };
        }
        const totalCount = await TaskModel.countDocuments(query);
        const tasks = await TaskModel.find(query).limit(limit).skip(skip).sort({ lastUpdated: -1 }).populate('projectId assignedTo assignedBy reviewedBy');
        const totalPages = Math.ceil(totalCount / limit);
        return { message: 'Tasks retrieved successfully', totalCount: totalCount, totalPages: totalPages, isError: false, tasks: tasks };
    } catch (error: any) {
        console.error('Error fetching tasks by query:', error);
        return { message: error.message || 'Error retrieving tasks', totalCount: 0, totalPages: 0, isError: true, tasks: null };
    }
};

// Update a task
export const updateTask = async (query: FilterQuery<ITask>, updateData: Partial<ITask>) => {
    try {
        const updatedTask = await TaskModel.findOneAndUpdate(query, updateData, { new: true });
        if (!updatedTask) {
            return { message: 'Task not found for update', isError: true, task: null };
        }

        const assignedUsers:string[] = updatedTask.assignedTo;
        const response = await getTask({ _id: updatedTask._id });
        assignedUsers.forEach((user) => {
            publishToUserChannel(user, 'taskUpdated', response.task);
        });
        publishToProjectChannel(updatedTask.projectId, 'taskUpdated', response.task);

        return { message: 'Task updated successfully', isError: false, task: updatedTask };
    } catch (error: any) {
        console.error('Error updating task:', error);
        return { message: error.message || 'Error updating task', isError: true, task: null };
    }
};

// Delete a task
export const deleteTask = async (query: FilterQuery<ITask>) => {
    try {
        const deletedTask = await TaskModel.findOneAndDelete(query);
        if (!deletedTask) {
            return { message: 'Task not found for deletion', isError: true, task: null };
        }

        const assignedUsers:string[] = deletedTask.assignedTo;
        assignedUsers.forEach((user) => {
            publishToUserChannel(user, 'taskDeleted', deletedTask);
        });
        publishToProjectChannel(deletedTask.projectId, 'taskDeleted', deletedTask);

        await ProjectModel.updateOne({ _id: deletedTask.projectId }, { $pull: { tasks: deletedTask._id } });
        return { message: 'Task deleted successfully', isError: false, task: deletedTask };
    } catch (error: any) {
        console.error('Error deleting task:', error);
        return { message: error.message || 'Error deleting task', isError: true, task: null };
    }
};

// Get all tasks
export const getAllTasks = async (limit: number = 50, skip: number = 0) => {
    try {
        const tasks = await TaskModel.find().populate('projectId assignedTo assignedBy reviewedBy').limit(limit).skip(skip);
        return { message: 'Tasks retrieved successfully', isError: false, tasks };
    } catch (error: any) {
        console.error('Error fetching tasks:', error);
        return { message: error.message || 'Error retrieving tasks', isError: true, tasks: null };
    }
};
