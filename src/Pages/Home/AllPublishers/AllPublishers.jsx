import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FiArrowRight, FiGrid } from 'react-icons/fi';

const AllPublishers = () => {
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

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

  const LoadingIndicator = () => (
    <div className="flex justify-center items-center py-16">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-zinc-700 rounded-full"></div>
        <div className="absolute inset-0 border-t-4 border-amber-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-amber-500">LOADING</span>
        </div>
      </div>
    </div>
  );

  const handleViewProfile = (publisherId) => {
    navigate(`/publisher/${publisherId}`);
  };

  return (
    <section className="bg-zinc-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center mb-4">
            <FiGrid className="text-amber-500 mr-3 text-xl" />
            <h2 className="text-3xl font-bold text-white tracking-tight">Our Publishers</h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-zinc-800 via-amber-500 to-zinc-800"></div>
          <p className="mt-4 text-gray-400 text-center max-w-2xl">
            Meet the leading voices behind the stories that matter
          </p>
        </div>

        {loading ? (
          <LoadingIndicator />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishers.map((publisher) => (
              <div
                key={publisher._id}
                className="group bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-amber-600/50 hover:translate-y-[-4px]"
              >
                {/* Publisher Logo */}
                <div className="p-6 flex justify-center bg-zinc-900 border-b border-zinc-700">
                  {publisher.logo ? (
                    <img
                      src={publisher.logo}
                      alt={publisher.name}
                      className="h-24 object-contain"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center border-2 border-amber-500">
                      <span className="text-3xl font-bold text-amber-500">
                        {publisher.name?.charAt(0) || 'P'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-amber-400 transition-colors duration-300">
                    {publisher.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">{publisher.email}</p>

                  <div className="flex justify-between items-center mb-6 text-sm text-gray-400">
                    <span>Articles Published</span>
                    <span className="bg-zinc-900 px-3 py-1 rounded-full text-amber-500 font-semibold">
                      {publisher.articlesCount || 0}
                    </span>
                  </div>

                  <button
                    onClick={() => handleViewProfile(publisher._id)}
                    className="w-full flex items-center justify-center bg-zinc-700 hover:bg-amber-600 text-white py-2 rounded transition-colors duration-300 border border-zinc-600 hover:border-amber-700"
                  >
                    <span className="mr-2">View Profile</span>
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllPublishers;
