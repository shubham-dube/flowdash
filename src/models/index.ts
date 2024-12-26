import { ProjectModel } from "./projectModel";
import { TaskModel } from "./taskModel";
import { UserModel } from "./userModel";
import connectDB from "@/lib/mongodb";

connectDB();

export { UserModel, ProjectModel, TaskModel };