'use client';
import {  IUser } from '../../../../../types/models';
import { useState, useEffect } from 'react';
import UserOperationsUI from './membersOperation';
import MembersListAndGrid from './membersListAndGrid';
import AddMemberComponent from './addMemberPopup';

const ProjectMemberTabUI: React.FC<{id: string, teamMembers: IUser[], fetchProjects: ()=> void}> = ({id, teamMembers, fetchProjects}) => {
    const [members, setMembers] = useState<IUser[]>([]);
    const [isCardView, setIsCardView] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [showMemberPopup, setShowAddMemberPopup] = useState<boolean>(false);

    useEffect(() => {
        setMembers(teamMembers);
        console.log(teamMembers);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery]);

    return (
        <div className="space-y-4">


            {/* Tasks Operation Section */}
            <UserOperationsUI setSearchQuery={setSearchQuery} 
                setShowAddMemberPopup={setShowAddMemberPopup} setIsCardView={setIsCardView}
                isCardView={isCardView} />


            {/* Tasks Section */}
            <MembersListAndGrid teamMembers={members} isCardView={isCardView} setIsCardView={setIsCardView} searchQuery={searchQuery} />

            {/* Create Task Popup */}
            {showMemberPopup && <AddMemberComponent setShowAddMemberPopup={setShowAddMemberPopup} fetchProjects={fetchProjects}
            projectId={id} membersAlready={members} />}

        </div>
    );
};

export default ProjectMemberTabUI;