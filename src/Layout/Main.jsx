import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const Main = () => {
    const location = useLocation();
    
    // List of routes where header/footer should be hidden
    const noHeaderFooterPaths = [
        '/login',
        '/signup',
        '/dashboard',
    ];

    // Check if current path should hide header/footer
    const shouldHideHeaderFooter = noHeaderFooterPaths.some(path => 
        location.pathname.startsWith(path)
    );

    return (
        <div className='min-h-screen flex flex-col bg-white overflow-x-hidden'>
            {/* Conditionally render Navbar */}
            {!shouldHideHeaderFooter && (
                <div className="w-full bg-gradient-to-r from-zinc-800 to-zinc-900">
                    <Navbar />
                </div>
            )}
            
            <main className='flex-grow w-full'>
                <Outlet />
            </main>
            
            {/* Conditionally render Footer */}
            {!shouldHideHeaderFooter && <Footer />}
        </div>
    );
};

export default Main;