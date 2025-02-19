import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const Main = () => {
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup')
    return (
        <div className='min-h-screen mx-auto max-w-screen-xl bg-white'>
            {
                noHeaderFooter || <Navbar/>
            }
            <Outlet/>
            {
                noHeaderFooter || <Footer/>
            }
        </div>
    );
};

export default Main;