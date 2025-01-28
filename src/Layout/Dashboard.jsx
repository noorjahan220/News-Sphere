import React from 'react';
import { FaUsers } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';

const Dashboard = () => {
    const [isAdmin] = useAdmin();

    return (
        <div className="flex flex-col lg:flex-row">
            {/* Sidebar */}
            <div className="w-full lg:w-64 min-h-screen bg-blue-800 p-4 flex flex-col">
                <div className="text-center text-white font-semibold text-2xl mb-6">Dashboard</div>
                
                <ul className="flex flex-col space-y-4">
                    <li>
                        <NavLink 
                            to="/dashboard/adminHome" 
                            className="flex items-center text-white hover:bg-blue-600 p-2 rounded-md transition"
                            activeClassName="bg-blue-600 text-white"
                        >
                            <span className="mr-3">🏠</span> Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/dashboard/allUsers" 
                            className="flex items-center text-white hover:bg-blue-600 p-2 rounded-md transition"
                            activeClassName="bg-blue-600 text-white"
                        >
                            <FaUsers className="mr-3" /> All Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/dashboard/allArticlesAdmin" 
                            className="flex items-center text-white hover:bg-blue-600 p-2 rounded-md transition"
                            activeClassName="bg-blue-600 text-white"
                        >
                            📄 All Articles
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/dashboard/addPublisher" 
                            className="flex items-center text-white hover:bg-blue-600 p-2 rounded-md transition"
                            activeClassName="bg-blue-600 text-white"
                        >
                            📝 Publisher
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/" 
                            className="flex items-center text-white hover:bg-blue-600 p-2 rounded-md transition"
                            activeClassName="bg-blue-600 text-white"
                        >
                            🏡 Home
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 bg-gray-50">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
