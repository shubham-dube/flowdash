import mongoose, { Model } from "mongoose";
import { ProjectSchema } from "./projectModel";
import { TaskSchema } from "./taskModel";
import { UserSchema } from "./userModel";
import connectDB from "../lib/mongodb";
import { IProject, ITask, IUser } from "../types/models";
import { ContactSchema } from "./contactModel";

connectDB();
const UserModel: Model<IUser> = mongoose.model<IUser>('Users', UserSchema)
const ProjectModel: Model<IProject> = mongoose.model<IProject>('Projects', ProjectSchema)
const TaskModel: Model<ITask> = mongoose.model<ITask>('Tasks', TaskSchema)
const ContactModel: Model<ITask> = mongoose.model<ITask>('Contacts', ContactSchema)
export { UserModel, ProjectModel, TaskModel, ContactModel };