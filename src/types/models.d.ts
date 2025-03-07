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

interface IContact extends Document{
    _id: Types.ObjectId;
    name: string;
    email: string;
    mobile: string;
    date: Date;
    message: string;
}

interface IProject extends Document{
    _id: Types.ObjectId; 
    title: string;
    description: string;
    createdBy: Types.ObjectId | IUser;
    teamMembers: Types.ObjectId[] | IUser[]; 
    tasks: Types.ObjectId[] | ITask[];
    createdAt: Date;
    deadline: Date;
    endDate: Date;
    lastUpdated: Date;
    status: 'active' | 'completed' | 'archived';
}

interface ITask extends Document{
    _id: Types.ObjectId; 
    projectId: Types.ObjectId | IProject; 
    assignedTo: Types.ObjectId[] | IUser[]; 
    assignedBy: Types.ObjectId | IUser; 
    reviewedBy: Types.ObjectId[] | IUser[];
    createdBy: Types.ObjectId; 
    title: string;
    description: string;
    status: 'to-do' | 'in-progress' | 'completed' | 'blocked' | 'in-review' | string;
    priority: 'very-low' | 'low' | 'medium' | 'high' | 'very-high' | string;
    deadline: Date | null;
    comments: Types.ObjectId[] | [];
    createdAt: Date;
    lastUpdated: Date;
    isWorkingNow: boolean;
}