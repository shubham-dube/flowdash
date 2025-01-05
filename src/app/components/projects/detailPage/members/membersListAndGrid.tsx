import { useEffect, useState } from 'react';
import { FaCheckCircle, FaClock,  FaFlag,  FaSortNumericDown } from 'react-icons/fa';
import { DateTimeFormatOptions, MembersListAndGridProps } from '../../../../../types/ui.props';
import useDeviceSize from '../../../../components/common/deviceUtils';
import { AvatarWithName } from '../../../../components/tasks/Popups/statusAndPriorityVisual';
import { IUser } from '../../../../../types/models';

const MembersListAndGrid: React.FC<MembersListAndGridProps> = ({ teamMembers, isCardView, setIsCardView, searchQuery }) => {
    const [members, setMembers] = useState<IUser[]>([]);
    const { width } = useDeviceSize();

    function formatDateString(dateString: Date) {
        const date = new Date(dateString);

        const options: Partial<DateTimeFormatOptions> = {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour12: false
        };

        const formattedDate = date.toLocaleString('en-US', options);
        return formattedDate;
    }

    useEffect(() => {
        if (width < 768) {
            if (!isCardView) setIsCardView(true);
        } else if (width >= 768 && width < 1024) {
            if (!isCardView) setIsCardView(true);
        } else {
            console.log('Desktop view');
        }
        const filteredMembers = teamMembers.filter((member) =>{
            return member.displayName.toLowerCase().includes(searchQuery.toLowerCase())
            || member.email.toLowerCase().includes(searchQuery.toLowerCase())
        }
        );
      
          setMembers(filteredMembers);
        }, [isCardView, setIsCardView, width, searchQuery, teamMembers]);

    return (<div className="members-section">
        <div className="flex items-center space-x-2 mt-4 w-full">
            <div className="bg-white dark:bg-gray-800 border w-[100%] border-gray-200 dark:border-gray-700 rounded-lg p-4">

             

                {isCardView ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {members.map((member) => {
                            return (
                                <div
                                    key={member._id}
                                    className="relative p-4 border rounded-lg bg-gray-100 dark:bg-gray-900"
                                >
                                    <div className="flex flex-col justify-between items-start w-full">
                                            <h3 className="flex space-x-2 items-center text-gray-800 dark:text-white"><span ><AvatarWithName user={member} /></span></h3>
                                            <p className='text-xs'>Last Active: {formatDateString(member.lastActiveAt)}</p>
                                    </div>

                                    <hr className="my-2 border-gray-300 dark:border-gray-700" />
                                    <div className="mt-2 flex justify-between items-center text-xs text-gray-500 dark:text-gray-200">
                                        <span>Email - {member.email}</span>
                                    </div>
                                 
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div>
                        <div className="flex justify-between items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-sm font-medium">
                            <span className="w-1/12 flex items-center"><FaSortNumericDown className="mr-2" />S no.</span>
                            <span className="w-5/12 flex items-center"><FaFlag className="mr-2" />Full Name</span>
                            <span className="w-3/12 flex items-center"><FaCheckCircle className="mr-2" />Email</span>
                            <span className="w-3/12 flex items-center pl-5"><FaClock className="mr-2" />Last Active</span>
                        </div>
                        {members.map((member, index) => {
                            return (
                                <div
                                    key={member._id}
                                    className="flex justify-between items-center px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-sm"
                                >
                                    <span className="w-1/12">{index + 1}</span>
                                    <span className="w-5/12"> <AvatarWithName user={member} /></span>
                                    <span className="w-3/12">{member.email}</span>
                                    <span className="w-3/12 flex justify-between pl-5">{formatDateString(member.lastActiveAt)}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    </div>
    );
}

export default MembersListAndGrid;