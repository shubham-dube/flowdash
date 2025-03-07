/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterQuery } from 'mongoose';
import { IContact, IProject } from '../types/models';
import { ContactModel } from '@/models';
// Create a new project
export const AddContactUser = async (data: Partial<IContact>) => {
    try {
        const newContact = new ContactModel(data);
        await newContact.save();

        return { message: 'Message Recieved Successfully', isError: false, data: newContact };
    } catch (error: any) {
        console.error('Error creating project:', error);
        return { message: error.message || 'Error creating project', isError: true, project: null };
    }
};

export async function getAllContacts() {
    try {
        const contacts = await ContactModel.find(); 
        return { isError: false, data: contacts };
    } catch (error: any) {
        return { isError: true, message: error.message };
    }
}


// Delete a project
export const deleteMessage = async (query: FilterQuery<IContact>) => {
    try {
        const deletedProject = await ContactModel.findOneAndDelete(query);
        if (!deletedProject) {
            return { message: 'Contact not found for deletion', isError: true, project: null };
        }
        return { message: 'Contact deleted successfully', isError: false, project: deletedProject };
    } catch (error: any) {
        console.error('Error deleting project:', error);
        return { message: error.message || 'Error deleting project', isError: true, project: null };
    }
};
