import { Document} from 'mongoose';

interface IUser extends Document{
    _id: Types.ObjectId; 
    firebaseId: string; 
    displayName: string;
    email: string;
    photoUrl: string;
    lastActiveAt: Date;
    isActive: boolean;
    joiningDate: Date;
}

interface IProject extends Document{
    _id: Types.ObjectId; 
    title: string;
    description: string;
    createdBy: Types.ObjectId;
    teamMembers: Types.ObjectId[]; 
    tasks: Types.ObjectId[];
    createdAt: Date;
    deadline: Date;
    endDate: Date;
    lastUpdated: Date;
    status: 'active' | 'completed' | 'archived';
}

interface ITask extends Document{
    _id: Types.ObjectId; 
    projectId: Types.ObjectId; 
    assignedTo: Types.ObjectId[]; 
    assignedBy: Types.ObjectId; 
    reviewedBy: Types.ObjectId[];
    createdBy: Types.ObjectId; 
    title: string;
    description: string;
    status: 'to-do' | 'in-progress' | 'completed' | 'blocked' | 'in-review';
    priority: 'very-low' | 'low' | 'medium' | 'high' | 'very-high';
    deadline: Date;
    // comments: Types.ObjectId[];
    createdAt: Date;
    lastUpdated: Date;
    isWorkingNow: boolean;
}