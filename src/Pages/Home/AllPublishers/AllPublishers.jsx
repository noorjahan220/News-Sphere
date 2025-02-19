import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const AllPublishers = () => {
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const response = await axiosSecure.get('/publishers');
        setPublishers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching publishers:', error);
        setLoading(false);
      }
    };
    fetchPublishers();
  }, [axiosSecure]);

  return (
    <div className="relative py-8 md:py-16">
      <div className=" mx-auto ">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            Our Publishers
          </h2>
          <div className="mt-3 h-1 w-20 sm:w-24 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto rounded-full" />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-square bg-gray-200 dark:bg-gray-600 rounded-2xl" />
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded mt-4 mx-auto w-3/4" />
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded mt-2 mx-auto w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 ">
            {publishers.map((publisher) => (
              <div
                key={publisher._id}
                className=" bg-white w-[65%] dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className=" overflow-hidden rounded-xl">
                  <img
                    className="w-[80%] object-cover"
                    src={publisher.logo}
                    alt={publisher.name}
                  />
                </div>

                <div className="px-2 pb-2">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
                    {publisher.name}
                  </h3>
                  <p className="text-teal-500 dark:text-teal-400 text-sm truncate mb-2">
                    {publisher.email}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-100 rounded-full text-sm">
                      {publisher.articlesCount || 0} Articles
                    </span>
                    <button
                      onClick={() => navigate('/profile')} // Use the navigate function for routing
                      className="text-sm text-gray-500 dark:text-gray-300 hover:text-teal-500 transition-colors"
                    >
                      View Profile →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPublishers;
