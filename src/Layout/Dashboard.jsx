import React from 'react';
import { FaUsers } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';

const Dashboard = () => {
    
    const [isAdmin] = useAdmin()
    return (
        <div className='flex'>
            <div className='w-64 min-h-screen bg-orange-400'>
        <ul className='menu p-4'>
            <li><NavLink to="/dashboard/allUsers"><FaUsers />All Users</NavLink></li>
            <li><NavLink to="/dashboard/allArticlesAdmin">All Articles</NavLink></li>
            <li><NavLink to="/dashboard/addPublisher">Publisher</NavLink></li>
            <li><NavLink to="/">Home</NavLink></li>
        </ul>
            </div>
            <div className='flex-1 p-8'>
                <Outlet/>
            </div>
        </div>
    );
};

export default Dashboard;