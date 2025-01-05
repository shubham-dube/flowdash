import {  UserOperationsUIProps } from '../../../../../types/ui.props';
import {  FaList, FaPlus, FaSearch, FaTh} from 'react-icons/fa';

const UserOperationsUI: React.FC<UserOperationsUIProps> = ({setSearchQuery,  setShowAddMemberPopup, 
     setIsCardView, isCardView}) => {
      
    return (
        <div className="flex flex-col w-full mt-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
        <div className="flex items-center justify-between w-full space-x-4">
  
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Members</h2>
  
          <div className="flex-grow mx-4 relative">
            <FaSearch className="absolute left-3 top-3 text-gray-500 dark:text-gray-400" />
            <input
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              type="text"
              placeholder="Search Member..."
              className="w-full pl-10 pr-4 py-2 bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
  
          <div className="flex items-center space-x-4">
  
            <button
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 
              rounded-lg bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setShowAddMemberPopup(true)}
            >
              <FaPlus /> <span className='hidden lg:block'>Add Member</span>
            </button>
  
            <div
              className="hidden lg:block relative flex items-center w-20 h-10 border border-gray-300 dark:border-gray-700 
              rounded-lg cursor-pointer"
              onClick={() => setIsCardView(!isCardView)}
            >
              <div
                className={`absolute inset-0 flex items-center justify-between px-4 text-sm text-gray-700 dark:text-gray-200`}>
                <FaTh className="z-0" /> <FaList className="z-0" />
              </div>
              <div
                className={`w-8 h-8 bg-gray-700 rounded-lg transform transition-transform duration-300 z-10 flex items-center justify-center translate-y-1 ${isCardView ? 'translate-x-1' : 'translate-x-11'}`}
              >
                {isCardView ? <FaTh className="text-white" /> : <FaList className="text-white" />}
              </div>
            </div>
  
          </div>
  
        </div>
      </div>
    );
}

export default UserOperationsUI;