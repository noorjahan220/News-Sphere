import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllPublishers = () => {
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

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
console.log(publishers)
  return (
    <div className="relative py-16 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            Featured Publishers
          </h2>
          <div className="mt-4 h-1 w-24 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto rounded-full" />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-32 w-32 bg-gray-200 dark:bg-gray-600 rounded-full mx-auto" />
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded mt-4 mx-auto w-3/4" />
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded mt-2 mx-auto w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {publishers.map((publisher) => (
              <div
                key={publisher._id}
                className="group relative bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative w-32 h-32 mx-auto">
                  <img
                    className="w-full h-full object-cover rounded-full border-4 border-white dark:border-gray-800"
                    src={publisher.logo
                    }
                    alt={publisher.name}
                  />
                  <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-teal-400 transition-all duration-300" />
                </div>
                
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                    {publisher.name}
                  </h3>
                  <p className="text-teal-500 dark:text-teal-400 text-sm font-medium">
                    {publisher.email}
                  </p>
                  <div className="mt-4 flex justify-center space-x-3">
                    <span className="px-3 py-1 bg-teal-100 dark:bg-gray-600 text-teal-600 dark:text-teal-300 rounded-full text-sm">
                      {publisher.articlesCount || 0} Articles
                    </span>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPublishers;