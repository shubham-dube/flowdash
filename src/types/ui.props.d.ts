import { IProject, IUser } from "./models";


interface FilterUIProps {
    priority: string[];
    setPriority: React.Dispatch<React.SetStateAction<string[]>>;
    status: string[];
    setStatus: React.Dispatch<React.SetStateAction<string[]>>;
    selectedProjects: string[];
    setSelectedProjects: React.Dispatch<React.SetStateAction<string[]>>;
    selectedUsers: string[];
    setSelectedUsers: React.Dispatch<React.SetStateAction<string[]>>;
    deadlineBefore: Date | null;
    setDeadlineBefore: React.Dispatch<React.SetStateAction<Date | null>>;
    deadlineAfter: Date | null;
    setDeadlineAfter: React.Dispatch<React.SetStateAction<Date | null>>;
    lastUpdatedBefore: Date | null;
    setLastUpdatedBefore: React.Dispatch<React.SetStateAction<Date | null>>;
    lastUpdatedAfter: Date | null;
    setLastUpdatedAfter: React.Dispatch<React.SetStateAction<Date | null>>;
    setShowFilterPopup: React.Dispatch<React.SetStateAction<boolean>>;
    applyFilters: () => void;
    resetFilters: () => void;
    isProjectFilter?: boolean;
}

interface ProjectFilterUIProps {
    status: string[];
    setStatus: React.Dispatch<React.SetStateAction<string[]>>;
    selectedUsers: string[];
    setSelectedUsers: React.Dispatch<React.SetStateAction<string[]>>;
    deadlineBefore: Date | null;
    setDeadlineBefore: React.Dispatch<React.SetStateAction<Date | null>>;
    deadlineAfter: Date | null;
    setDeadlineAfter: React.Dispatch<React.SetStateAction<Date | null>>;
    lastUpdatedBefore: Date | null;
    setLastUpdatedBefore: React.Dispatch<React.SetStateAction<Date | null>>;
    lastUpdatedAfter: Date | null;
    setLastUpdatedAfter: React.Dispatch<React.SetStateAction<Date | null>>;
    setShowFilterPopup: React.Dispatch<React.SetStateAction<boolean>>;
    applyFilters: () => void;
    resetFilters: () => void;
}

interface CreateTaskUIProps {
    fetchTasks: () => void;
    setShowCreateTaskPopup: (value: boolean) => void;
    isRelatedProjectFeild?: boolean;
    members?: IUser[];
    projectId?: string;
}

interface CreateProjectUIProps {
    fetchProjects: () => void;
    setShowCreateProjectPopup: (value: boolean) => void;
}

interface AddMemberUIProps {
    fetchProjects: () => void;
    setShowAddMemberPopup: (value: boolean) => void;
    projectId: string;
    membersAlready: IUser[];
}

interface TaskOperationsUIProps {
    setSearchQuery: (query: string) => void;
    setCurrentPage: (page: number) => void;
    setShowFilterPopup: (showFilterPopup: boolean) => void;
    setShowCreateTaskPopup: (showCreateTaskPopup: boolean) => void;
    setIsCardView: (isCardView: boolean) => void;
    isCardView: boolean;
}

interface TaskListAndGridProps {
    tasks: ITask[];
    isCardView: boolean;
    limit: number;
    setLimit: (limit: number) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalTasks: number;
    fetchTasks: () => void;
    setIsCardView: (isCardView: boolean) => void;
}

interface ProjectListAndGridProps {
    projects: IProject[];
    isCardView: boolean;
    limit: number;
    setLimit: (limit: number) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalProjects: number;
    fetchProjects: () => void;
    setIsCardView: (isCardView: boolean) => void;
}

interface MembersListAndGridProps {
    teamMembers: IUser[];
    isCardView: boolean;
    setIsCardView: (isCardView: boolean) => void;
    searchQuery: string;
}

interface DateTimeFormatOptions {
    localeMatcher?: "best fit" | "lookup" | undefined;
    weekday?: "long" | "short" | "narrow" | undefined;
    era?: "long" | "short" | "narrow" | undefined;
    year?: "numeric" | "2-digit" | undefined;
    month?: "numeric" | "2-digit" | "long" | "short" | "narrow" | undefined;
    day?: "numeric" | "2-digit" | undefined;
    hour?: "numeric" | "2-digit" | undefined;
    minute?: "numeric" | "2-digit" | undefined;
    second?: "numeric" | "2-digit" | undefined;
    timeZoneName?: "short" | "long" | "shortOffset" | "longOffset" | "shortGeneric" | "longGeneric" | undefined;
    formatMatcher?: "best fit" | "basic" | undefined;
    hour12?: boolean | undefined;
    timeZone?: string | undefined;
}

interface ProjectOperationsUIProps {
    setSearchQuery: (query: string) => void;
    setCurrentPage: (page: number) => void;
    setShowFilterPopup: (showFilterPopup: boolean) => void;
    setShowCreateProjectPopup: (setShowCreateProjectPopup: boolean) => void;
    setIsCardView: (isCardView: boolean) => void;
    isCardView: boolean;
}
interface UserOperationsUIProps {
    setSearchQuery: (query: string) => void;
    setShowAddMemberPopup: (showAddMemberPopup: boolean) => void;
    setIsCardView: (isCardView: boolean) => void;
    isCardView: boolean;
}