import React, { useState } from 'react';
import { FaUsers, FaUserCircle, FaHome, FaNewspaper, FaBuilding, FaChartBar } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  // Remove dark mode state since we're forcing dark theme
  const isDarkMode = true; // Always dark mode for admin dashboard

  return (
    <div className="flex flex-col lg:flex-row bg-zinc-900 text-white">
      {/* Sidebar */}
      <div className="w-full lg:w-64 min-h-screen bg-gradient-to-b from-zinc-800 to-zinc-900 p-4 flex flex-col border-r border-zinc-700">
        <div className="text-center mb-8">
          <div className="font-bold text-2xl mt-2">
            <span className="text-white">NEWS</span>
            <span className="text-amber-500">SPHERE</span>
          </div>
          <div className="text-sm text-gray-400 mt-1">Admin Dashboard</div>
        </div>
        
        <ul className="flex flex-col font-medium space-y-1">
          <li>
            <NavLink 
              to="/dashboard/adminHome" 
              className={({ isActive }) => 
                `flex items-center p-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-zinc-700 text-amber-500 border-l-4 border-amber-500' 
                    : 'hover:bg-zinc-700 text-gray-300 hover:text-amber-400'
                }`
              }
            >
              <FaChartBar className="mr-3" /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/dashboard/allUsers" 
              className={({ isActive }) => 
                `flex items-center p-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-zinc-700 text-amber-500 border-l-4 border-amber-500' 
                    : 'hover:bg-zinc-700 text-gray-300 hover:text-amber-400'
                }`
              }
            >
              <FaUsers className="mr-3" /> All Users
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/dashboard/allArticlesAdmin" 
              className={({ isActive }) => 
                `flex items-center p-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-zinc-700 text-amber-500 border-l-4 border-amber-500' 
                    : 'hover:bg-zinc-700 text-gray-300 hover:text-amber-400'
                }`
              }
            >
              <FaNewspaper className="mr-3" /> All Articles
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/dashboard/addPublisher" 
              className={({ isActive }) => 
                `flex items-center p-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-zinc-700 text-amber-500 border-l-4 border-amber-500' 
                    : 'hover:bg-zinc-700 text-gray-300 hover:text-amber-400'
                }`
              }
            >
              <FaBuilding className="mr-3" /> Publisher
            </NavLink>
          </li>
          
          <div className="my-4 border-t border-zinc-700"></div>
          
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `flex items-center p-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-zinc-700 text-amber-500 border-l-4 border-amber-500' 
                    : 'hover:bg-zinc-700 text-gray-300 hover:text-amber-400'
                }`
              }
            >
              <FaHome className="mr-3" /> Home
            </NavLink>
          </li>
        </ul>
        
        <div className="mt-auto p-4 bg-zinc-800 rounded-lg border border-zinc-700 text-sm text-gray-400">
          <div className="font-medium text-white mb-1">Admin Portal</div>
          <div>Manage your content and users from this dashboard</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-zinc-900">
        {/* Top Navbar in Outlet Section */}
        <div className="flex justify-between items-center p-4 bg-zinc-800 border-b border-zinc-700 sticky top-0 z-10">
          <div className="flex items-center space-x-4">
            {/* Profile Icon */}
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center">
                <FaUserCircle className="text-lg text-amber-500" />
              </div>
              <NavLink 
                to="/myProfile" 
                className="text-sm font-medium text-gray-300 hover:text-amber-400"
              >
                My Profile
              </NavLink>
            </div>
          </div>
        </div>

        {/* Remove dark mode context since we're not using it */}
        <div className="flex-1 p-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;