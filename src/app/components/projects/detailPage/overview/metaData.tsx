import {  FaCalendar, FaCheckCircle, FaEnvelope,  FaTasks, FaUsers,  } from 'react-icons/fa';
import { AvatarWithName } from '@/app/components/tasks/Popups/statusAndPriorityVisual';
import { IProject } from '@/types/models';
import { DateTimeFormatOptions } from '@/types/ui.props';

const ProjectMetaData = ({ project }: { project: IProject }) => {

    function formatDateString(dateString: Date, wantTime: boolean = true): string {
        const date = new Date(dateString);

        const options: Partial<DateTimeFormatOptions> = {
            month: 'short',
            day: 'numeric',
            hour12: false
        };
        if (wantTime) {
            options.hour = 'numeric';
            options.minute = 'numeric';
        }

        const formattedDate = date.toLocaleString('en-US', options);
        return formattedDate;
    }

    return (
        <div className='flex flex-col lg:w-2/3 mt-4 lg:mt-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4'>
            <div className='flex justify-between items-center w-full mb-2'>
                <h2 className='text-lg'>Project Metadata</h2>
                <button className='bg-blue-500 text-white px-4 py-2 rounded-lg'>Edit</button>
            </div>
            <div className='p-4 space-y-3 bg-gray-100 dark:bg-gray-700 border-l-8 border-blue-500 dark:border-blue-700 rounded-lg w-full h-full'>
                <div className='flex justify-between items-center'>
                    <span className='gap-4 flex items-center w-1/2 text-gray-500 dark:text-gray-300'><FaCalendar /><span>Timeline</span></span>
                    <span className='gap-4 flex items-center w-1/2'>
                        {formatDateString(project?.createdAt as Date, false)} - {project?.endDate ? formatDateString(project?.endDate as Date, false) : 'On Going'}</span>
                </div>
                <div className='flex justify-between items-center'>
                    <span className='gap-4 flex items-center w-1/2 text-gray-500 dark:text-gray-300'><FaUsers /><span>Team</span></span>
                    <div className="flex items-center w-1/2">
                        {project?.teamMembers.map((member, index) => (
                            <div
                                key={member._id}
                                className={`relative rounded-full border-2 border-white dark:border-gray-800 overflow-hidden ${index > 0 ? '-ml-3' : ''
                                    }`}
                            >
                                <AvatarWithName user={member} wantName={false} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className='flex justify-between items-center'>
                    <span className='gap-4 flex text-gray-500 dark:text-gray-300 items-center w-1/2'><FaCheckCircle /><span>Status</span></span>
                    <span className='gap-4 flex items-center w-1/2'>
                        {project?.status ? project?.status.charAt(0).toUpperCase() + project?.status.slice(1) : ""}</span>
                </div>

                <div className='flex justify-between items-center'>
                    <span className='gap-4 flex text-gray-500 dark:text-gray-300 items-center w-1/2'><FaTasks /><span>Tasks</span></span>
                    <span className='gap-4 flex items-center w-1/2'>{project?.tasks.length}</span>
                </div>

                <div className='flex justify-between items-center'>
                    <span className='gap-4 flex text-gray-500 dark:text-gray-300 items-center w-1/2'>
                        <FaEnvelope />
                        <span>Leader Email</span>
                    </span>
                    <span className='gap-4 flex items-center w-1/2 truncate'>
                        {project?.createdBy.email}
                    </span>
                </div>

            </div>
        </div>
    )
}

export default ProjectMetaData;