/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser } from '../types/models';
import { UserModel } from '../models/index';
import { FilterQuery } from 'mongoose';


export const createUser = async (data: Partial<IUser>) => {
    try {
        const existingUser  = await UserModel.findOne({ email: data.email });
        if (existingUser ) {
            throw new Error('User already exists'); 
        }
        const newUser = new UserModel(data);
        await newUser.save();
        return { message: 'User registered successfully', isError: false, user: newUser };
    } catch (error: any) {
        console.error('Error creating user:', error);
        return { message: error.message || 'Error registering user', isError: true, user: null };
    }
};

export const getUser = async (query: FilterQuery<IUser>) => {
    try {
        const user = await UserModel.findOne(query);
        if (!user) {
            return { message: 'User not found', isError: true, user: null };
        }
        return { message: 'User retrieved successfully', isError: false, user: user };
    } catch (error: any) {
        console.error('Error fetching user:', error);
        return { message: error.message || 'Error retrieving user', isError: true, user: null };
    }
};

export const getUsersByQuery = async (query: FilterQuery<IUser>, limit: number = 50, skip: number = 0) => {
    try {
        const users = await UserModel.find(query).limit(limit).skip(skip);
        return { message: 'Users retrieved successfully', isError: false, users: users };
    } catch (error: any) {
        console.error('Error fetching users by query:', error);
        return { message: error.message || 'Error retrieving users', isError: true, users: null };
    }
};

export const updateUser = async (query: FilterQuery<IUser>, updateData: Partial<IUser>) => {
    try {
        const updatedUser = await UserModel.findOneAndUpdate(query, updateData, { new: true });
        if (!updatedUser) {
            return { message: 'User not found for update', isError: true, user: null };
        }
        return { message: 'User updated successfully', isError: false, user: updatedUser };
    } catch (error: any) {
        console.error('Error updating user:', error);
        return { message: error.message || 'Error updating user', isError: true, user: null };
    }
};

export const deleteUser = async (query: FilterQuery<IUser>) => {
    try {
        const deletedUser = await UserModel.findOneAndDelete(query);
        if (!deletedUser) {
            return { message: 'User not found for deletion', isError: true, user: null };
        }
        return { message: 'User deleted successfully', isError: false, user: deletedUser };
    } catch (error: any) {
        console.error('Error deleting user:', error);
        return { message: error.message || 'Error deleting user', isError: true, user: null };
    }
};

export const getAllUsers = async (limit: number = 50, skip: number = 0) => {
    try {
        const users = await UserModel.find().limit(limit).skip(skip);
        return { message: 'Users retrieved successfully', isError: false, users };
    } catch (error: any) {
        console.error('Error fetching all users:', error);
        return { message: error.message || 'Error retrieving users', isError: true, users: null };
    }
};