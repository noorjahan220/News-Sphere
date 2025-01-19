import React from 'react';
import Lottie from 'lottie-react';
import img from '../../assets/404.json'; 
import { Link } from 'react-router-dom';
const Error = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 p-6">
             {/* <Helmet>
                            <title>Error Page</title>
                        </Helmet> */}
            <div className="max-w-lg w-full">
                <Lottie animationData={img} className="w-full h-auto mb-8" />
            </div>
            <h1 
                className="text-4xl font-extrabold text-teal-600 mb-4"
                style={{ fontFamily: 'Poppins, sans-serif' }}
            >
                Oops! Page Not Found
            </h1>
            <p 
                className="text-gray-600 dark:text-gray-300 text-center mb-6"
                style={{ fontFamily: 'Lato, sans-serif' }}
            >
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link 
                to="/" 
                className="py-3 px-6 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-lg shadow hover:shadow-lg hover:scale-105 transition duration-300"
            >
                Go to Home
            </Link>
        </div>
    );
};

export default Error;