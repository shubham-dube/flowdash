import { ITask } from '../types/models';
import mongoose, { Schema } from 'mongoose';

const taskSchema: Schema = new mongoose.Schema({
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Projects',
        required: true
    }, 
    assignedTo: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
        required: true
    }, 
    assignedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    }, 
    reviewedBy: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }, 
    title: {
        type: String,
        default: '[UNTITLED]',
        required: true
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['to-do', 'in-progress', 'completed', 'blocked' , 'in-review'],
        default: 'to-do',
        required: true
    },
    priority: {
        type: String,
        enum: ['very-low', 'low', 'medium', 'high', 'very-high'],
        default: 'low',
    },
    deadline: {
        type: Date,
    },
    // comments: {
    //     type: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
    // },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    lastUpdated: {
        type: Date,
        default: Date.now()
    },
    isWorkingNow: {
        type: Boolean,
        default: false
    },
});

export const TaskSchema: Schema<ITask> = taskSchema;
