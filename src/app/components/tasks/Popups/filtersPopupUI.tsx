import React, { useEffect, useState } from 'react';
import { FaExclamationCircle, FaCheckCircle, FaProjectDiagram, FaUsers, FaClock, FaHistory, FaArrowRight, FaSearch, FaFilter, FaArrowLeft } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { debounce } from 'lodash';
import Cookies from 'js-cookie';
import { IProject, IUser } from '../../../../types/models';
import { FilterUIProps } from '../../../../types/ui.props';

const FilterComponent: React.FC<FilterUIProps> = ({ priority, setPriority, status, setStatus, selectedProjects, setSelectedProjects,
  selectedUsers, setSelectedUsers, deadlineBefore, setDeadlineBefore, deadlineAfter, setDeadlineAfter, lastUpdatedBefore,
  setLastUpdatedBefore, lastUpdatedAfter, setLastUpdatedAfter, setShowFilterPopup, applyFilters, resetFilters, isProjectFilter=true }) => {

  const [projects, setProjects] = useState<IProject[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);

  const [selectedFilterNumber, setSelectedFilterNumber] = useState<number>(0);

  const filtersUI = ["priority", "status", "projects", "createdBy", "deadline", "lastUpdated"];

  const token = Cookies.get('jwtToken');

  const searchProjects = debounce(async (query: string) => {
    try {
      const response = await fetch(`/api/project?${query ? `search=${query}` : ""}&limit=10`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setProjects(data.projects);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  }, 300);

  const searchUsers = debounce(async (query: string) => {
    try {
      const response = await fetch(`/api/user?query=${query}&limit=10`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  }, 300);

  const renderFilterOptions = () => {
    switch (filtersUI[selectedFilterNumber]) {
      case 'priority':
        return (
          <div className="p-4">
            <h3 className="text-lg mb-2">Priority</h3>
            <div className="flex gap-2 flex-wrap">
              {['Very-Low','Low', 'Medium', 'High', 'Very-High'].map((level) => (
                <label key={level} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={level.toLowerCase()}
                    checked={priority.includes(level.toLowerCase())}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (priority.includes(value)) {
                        setPriority(priority.filter((item) => item !== value));
                      } else {
                        setPriority([...priority, value]);
                      }
                    }}
                    className="form-checkbox"
                  />
                  <span>{level}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 'status':
        return (
          <div className="p-4">
            <h3 className="text-lg mb-2">Status</h3>
            <div className="flex gap-2 flex-wrap">
              {['To-Do', 'In-Progress', 'Completed', 'Blocked', 'In-Review'].map((level) => (
                <label key={level} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={level.toLowerCase()}
                    checked={status.includes(level.toLowerCase())}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (status.includes(value)) {
                        setStatus(status.filter((item) => item !== value));
                      } else {
                        setStatus([...status, value]);
                      }
                    }}
                    className="form-checkbox"
                  />
                  <span>{level}</span>
                </label>
              ))}
            </div>
            
          </div>
        );
      case 'projects':
        return (
          <div className="p-4">
            <h3 className="text-lg mb-2">Projects</h3>
            <div className="flex-grow relative">
              <FaSearch className="absolute left-3 top-3 text-gray-500 dark:text-gray-400" />
              <input
                onChange={(e) => searchProjects(e.target.value)}
                type="text"
                placeholder="Search Projects..."
                className="w-full pl-10 pr-4 py-2 bg-transparent border border-gray-300 dark:border-gray-700 rounded-full text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <select
              title='projects'
              name='projects'
              multiple
              className="w-full p-2 border border-gray-300 rounded bg-transparent dark:border-gray-700 rounded mt-3 dark:text-gray-200 h-36"
              value={selectedProjects}
              onChange={(e) =>
                setSelectedProjects([...e.target.selectedOptions].map((option) => option.value))
              }
            >
              {projects.map((project) => (
                <option key={project._id} value={project._id}>{project.title}</option>
              ))}
            </select>
            
          </div>
        );
      case 'createdBy':
        return (
          <div className="p-4">
            <h3 className="text-lg mb-2">Created By</h3>
            <div className="flex-grow relative">
              <FaSearch className="absolute left-3 top-3 text-gray-500 dark:text-gray-400" />
              <input
                onChange={(e) => searchUsers(e.target.value)}
                type="text"
                placeholder="Search Users..."
                className="w-full pl-10 pr-4 py-2 bg-transparent border border-gray-300 dark:border-gray-700 rounded-full text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <select
              title='createdBy'
              name='createdBy'
              multiple
              className="w-full p-2 border border-gray-300 rounded bg-transparent dark:border-gray-700 rounded mt-3 dark:text-gray-200 h-36"
              value={selectedUsers}
              onChange={(e) =>
                setSelectedUsers([...e.target.selectedOptions].map((option) => option.value))
              }
            >
              {users.map((user) => (
                <option key={user._id} value={user._id}>{user.displayName}</option>
              ))}
            </select>
            
          </div>
        );
      case 'deadline':
        return (
          <div className="p-4">
            <h3 className="text-lg mb-2">Deadline</h3>
            <div className="space-y-2">
              <div>
                <label className="block text-sm">Before</label>
                <DatePicker
                  selected={deadlineBefore}
                  onChange={(date) => setDeadlineBefore(date)}
                  className="w-full p-2 border rounded"
                  placeholderText="Select Date"
                />
              </div>
              <div>
                <label className="block text-sm">After</label>
                <DatePicker
                  selected={deadlineAfter}
                  onChange={(date) => setDeadlineAfter(date)}
                  className="w-full p-2 border rounded"
                  placeholderText="Select Date"
                />
              </div>
            </div>

            

          </div>
        );
      case 'lastUpdated':
        return (
          <div className="p-4">
            <h3 className="text-lg mb-2">Last Updated</h3>
            <div className="space-y-2">
              <div>
                <label className="block text-sm">Before</label>
                <DatePicker
                  selected={lastUpdatedBefore}
                  onChange={(date) => setLastUpdatedBefore(date)}
                  className="w-full p-2 border rounded"
                  placeholderText="Select Date"
                />
              </div>
              <div>
                <label className="block text-sm">After</label>
                <DatePicker
                  selected={lastUpdatedAfter}
                  onChange={(date) => setLastUpdatedAfter(date)}
                  className="w-full p-2 border rounded"
                  placeholderText="Select Date"
                />
              </div>
            </div>
          </div>
        );
      default:
        return <div className="p-4 text-gray-500">Select a filter to configure.</div>;
    }
  };

  useEffect(() => {
    searchProjects("");
    searchUsers("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white lg:w-[50%] mx-5 dark:bg-gray-800 p-6 rounded">
        <div className='flex justify-between items-center'>
          <div className="flex items-center space-x-2">
            <FaFilter />
            <h2 className="text-md text-gray-800 dark:text-white">All Filters</h2>
          </div>
          <button onClick={() => setShowFilterPopup(false)} className="bg-red-500 text-white text-sm px-2 py-1 rounded">X</button>
        </div>

        <div>
          <div className="flex text-sm flex-col space-y-2 text-gray-700 dark:text-gray-200">See results in your view based on the filters you select here.</div>
        </div>

        <div className="flex space-x-4 mt-4 border-t border-gray-300 dark:border-gray-700 pt-4">
          <div className="hidden lg:flex lg:flex-col md:flex md:flex-col space-y-4 w-1/3 border-r border-gray-300 dark:border-gray-700 pr-4">
            <button
              onClick={() => setSelectedFilterNumber(0)}
              className="flex items-center justify-between space-x-2 border border-gray-300 dark:border-gray-700 p-2 rounded"
            >
              <div className="flex items-center space-x-2">
                <FaExclamationCircle className="text-blue-500 dark:text-blue-400" /> <span className="text-sm">Priority</span>
              </div>
              <FaArrowRight className="text-sm text-gray-500 dark:text-gray-400" />
            </button>

            <button
              onClick={() => setSelectedFilterNumber(1)}
              className="flex items-center justify-between space-x-2 border border-gray-300 dark:border-gray-700 p-2 rounded"
            >
              <div className="flex items-center space-x-2">
                <FaCheckCircle className="text-green-500 dark:text-green-400" /> <span className="text-sm">Status</span>
              </div>
              <FaArrowRight className="text-sm text-gray-500 dark:text-gray-400" />
            </button>

            {isProjectFilter && (
            <button
              onClick={() => setSelectedFilterNumber(2)}
              className="flex items-center justify-between space-x-2 border border-gray-300 dark:border-gray-700 p-2 rounded"
            >
              <div className="flex items-center space-x-2">
                <FaProjectDiagram className="text-purple-500 dark:text-purple-400" /> <span className="text-sm">Projects</span>
              </div>
              <FaArrowRight className="text-sm text-gray-500 dark:text-gray-400" />
            </button>)}

            <button
              onClick={() => setSelectedFilterNumber(3)}
              className="flex items-center justify-between space-x-2 border border-gray-300 dark:border-gray-700 p-2 rounded"
            >
              <div className="flex items-center space-x-2">
                <FaUsers className="text-blue-500 dark:text-blue-400" /> <span className="text-sm">Created By</span>
              </div>
              <FaArrowRight className="text-sm text-gray-500 dark:text-gray-400" />
            </button>

            <button
              onClick={() => setSelectedFilterNumber(4)}
              className="flex items-center justify-between space-x-2 border border-gray-300 dark:border-gray-700 p-2 rounded"
            >
              <div className="flex items-center space-x-2">
                <FaClock className="text-red-500 dark:text-red-400" /> <span className="text-sm">Deadline</span>
              </div>
              <FaArrowRight className="text-sm text-gray-500 dark:text-gray-400" />
            </button>

            <button
              onClick={() => setSelectedFilterNumber(5)}
              className="flex items-center justify-between space-x-2 border border-gray-300 dark:border-gray-700 p-2 rounded"
            >
              <div className="flex items-center space-x-2">
                <FaHistory className="text-gray-500 dark:text-gray-400" /> <span className="text-sm">Last Updated</span>
              </div>
              <FaArrowRight className="text-sm text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Render filter options based on selection */}
          <div className="flex-1 ">{renderFilterOptions()}</div>

        </div>


        <div className='flex md:hidden justify-around border-t border-gray-300 dark:border-gray-700 pt-3'>
          <button onClick={()=> setSelectedFilterNumber((selectedFilterNumber>0)?selectedFilterNumber-1:5)}>
            <FaArrowLeft className="text-sm text-gray-500 dark:text-gray-400" />
          </button>
          <button onClick={()=>setSelectedFilterNumber(selectedFilterNumber<5?selectedFilterNumber + 1:0)}>
            <FaArrowRight className="text-sm text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        <div className='flex justify-end mt-4 border-t border-gray-300 dark:border-gray-700 space-x-5 pt-4'>
          <button className="bg-red-500 text-white px-4 py-2 rounded hidden md:block" onClick={() => setShowFilterPopup(false)}>Cancel</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => resetFilters()}>Reset</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => applyFilters()}>Apply</button>
        </div>

      </div>
    </div>
  );
};

export default FilterComponent;
