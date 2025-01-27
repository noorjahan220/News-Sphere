import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const AllPublishers = () => {
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(true);
const axiosSecure =useAxiosSecure()
  // Fetch the list of publishers when the component mounts
  useEffect(() => {
    fetchPublishers();
  }, []);

  // Fetch data from the backend
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

  return (
    <div className="all-publishers py-8">
      <h2 className="text-3xl font-semibold text-center text-orange-600 mb-6">All Publishers</h2>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {publishers.map((publisher) => (
            <div key={publisher._id} className="publisher-card p-4 bg-white shadow-lg rounded-lg">
              <img className="w-24 h-24 rounded-full mx-auto" src={publisher.photoURL} alt={publisher.name} />
              <h3 className="text-xl font-bold text-center mt-4">{publisher.name}</h3>
              <p className="text-center text-gray-600">{publisher.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPublishers;
