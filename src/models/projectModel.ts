import { IProject } from '@/types/models';
import mongoose, { Schema, Model } from 'mongoose';

const projectSchema: Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    teamMembers: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
        required: true
    }, 
    tasks: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Tasks' }],
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    deadline: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    lastUpdated: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'archived'],
        default: 'active'
    },
});

export const ProjectModel: Model<IProject> = mongoose.model<IProject>('Projects', projectSchema);
