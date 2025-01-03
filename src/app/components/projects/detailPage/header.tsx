import { DateTimeFormatOptions } from "@/types/ui.props";
import { FaProjectDiagram } from "react-icons/fa";


const HeaderMetaData: React.FC<{projectTitle: string, createdBy: string, createdDate: Date, deadline: Date}> = (props) => {

    function formatDateString(dateString: Date, wantTime: boolean = true): string {
            const date = new Date(dateString);
        
            const options: Partial<DateTimeFormatOptions> = {
              month: 'short',
              day: 'numeric',
              hour12: false
            };
            if(wantTime){
                options.hour = 'numeric';
                options.minute = 'numeric';
            } 
        
            const formattedDate = date.toLocaleString('en-US', options);
            return formattedDate;
          }

    return (
        <div className=" relative bg-grad-image flex h-64 bg-cover bg-right bg-no-repeat rounded rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-gray-700 border-t rounded-lg"></div>
                <div className='bg-black dark:bg-black opacity-0 dark:opacity-50'></div>
                
                <div className='absolute flex w-full bottom-0 left-0 mb-3 p-4'>
                    <div className='lg:w-1/2 w-2/3 ml-5 mr-3 flex items-center space-x-2 text-xl text-gray-700  font-semibold dark:text-gray-100'>
                        <div className='w-10 h-10 p-2 shadow-lg bg-gray-100 dark:bg-gray-600 rounded-full items-center justify-center flex'>
                        <FaProjectDiagram />
                        </div>
                        <span>{props.projectTitle}</span>
                    </div>

                    <div className='lg:w-1/2 w-1/3 ml-3 flex flex-col lg:flex-row items-start lg:items-center space-y-5 lg:space-y-0 lg:space-x-20'>
                        <div className='lg:w-1/3 flex flex-col items-start'>
                            <span className='text-sm text-gray-500 dark:text-gray-100'>CREATED</span>
                            <span className='text-sm text-gray-800 dark:text-yellow-200'>{formatDateString(props.createdDate)}</span>
                        </div>

                        <div className='lg:w-1/3 flex flex-col items-start'>
                            <span className='text-sm text-gray-500 dark:text-gray-100'>DUE DATE</span>
                            <span className='text-sm text-gray-800 dark:text-yellow-200'>{formatDateString(props.deadline, false)}</span>
                        </div>

                        <div className='lg:w-1/3 flex flex-col items-start h-full justify-start'>
                            <span className='text-sm text-gray-500 dark:text-gray-100'>LEADER</span>
                            <span className='text-sm text-gray-800 dark:text-yellow-200'>{props.createdBy}</span>
                        </div>
                    </div>

                </div>
               
            </div>
    );
}

export default HeaderMetaData;