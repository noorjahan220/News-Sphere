import React, { useState } from 'react';
import { FaUsers, FaSun, FaMoon, FaUserCircle } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle Day/Night Mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`flex flex-col lg:flex-row ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Sidebar */}
      <div className={`w-full lg:w-64 min-h-screen bg-gradient-to-r from-teal-400 to-blue-500 p-4 flex flex-col ${isDarkMode ? 'text-white' : 'text-black'}`}>
        <div className="text-center font-bold text-3xl mb-6">Dashboard</div>
        
        <ul className="flex flex-col font-semibold space-y-4">
          <li>
            <NavLink to="/dashboard/adminHome" className="flex items-center hover:bg-blue-600 p-2 rounded-md transition" activeClassName="bg-blue-600 text-white">
              <span className="mr-3">🏠</span> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/allUsers" className="flex items-center hover:bg-blue-600 p-2 rounded-md transition" activeClassName="bg-blue-600 text-white">
              <FaUsers className="mr-3" /> All Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/allArticlesAdmin" className="flex items-center hover:bg-blue-600 p-2 rounded-md transition" activeClassName="bg-blue-600 text-white">
              📄 All Articles
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/addPublisher" className="flex items-center hover:bg-blue-600 p-2 rounded-md transition" activeClassName="bg-blue-600 text-white">
              📝 Publisher
            </NavLink>
          </li>
          <hr />
          <li>
            <NavLink to="/" className="flex items-center hover:bg-blue-600 p-2 rounded-md transition" activeClassName="bg-blue-600 text-white">
              🏡 Home
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-0 bg-gray-50 relative">
        {/* Top Navbar in Outlet Section */}
        <div className={`flex justify-between items-center p-4 mb-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-md shadow-md sticky top-0 z-10`}>
          <div className="flex items-center space-x-4">
            {/* Home Link */}
            

            {/* Profile Icon */}
            <div className="flex items-center space-x-2 cursor-pointer">
              <FaUserCircle className="text-2xl text-gray-700 hover:text-blue-500" />
              <NavLink to="/myProfile" className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>My Profile</NavLink>
            </div>
          </div>

          {/* Day/Night Toggle */}
          <button onClick={toggleDarkMode} className={`p-2 rounded-full ${isDarkMode ? 'bg-yellow-400' : 'bg-blue-600'} text-white`}>
            {isDarkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
          </button>
        </div>

        {/* Pass isDarkMode as prop to AdminHome */}
        <Outlet context={{ isDarkMode, toggleDarkMode }} />
      </div>
    </div>
  );
};

export default Dashboard;
