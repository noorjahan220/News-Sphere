import React from 'react';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Article = ({ article, user }) => {
  const { title, image, Description, tags, _id, isPremium } = article;
  const axiosPublic = useAxiosPublic();

 
  const safeDescription = Description ? Description.substring(0, 150) : 'No description available';

  const handleViewUpdate = async () => {
    try {
    
      await axiosPublic.post(`/update-view/${_id}`);
    } catch (error) {
      console.error('Error updating view count:', error);
    }
  };

  return (
    <div className={`card shadow-lg transition-all duration-300 ease-in-out transform ${isPremium ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' : 'bg-white'} hover:scale-105`}>
      <figure>
        <img src={image} alt={title} className="w-full h-64 object-cover rounded-t-md" />
      </figure>
      <div className="card-body p-6">
        <h2 className="card-title text-2xl font-semibold text-gray-800">{title}</h2>
        <div className="flex gap-2 my-2">
          {tags.map((tag, index) => (
            <div key={index} className="badge badge-outline bg-gray-200 text-gray-700">{tag}</div>
          ))}
        </div>
        <p>{ safeDescription}...</p>
        <div className="card-actions justify-end mt-4">
         
          <Link to={`/details/${_id}`}>
            <button
              className={`btn btn-primary ${isPremium && !user?.premiumTaken ? 'btn-disabled' : ''}`}
              onClick={handleViewUpdate}
              disabled={isPremium && !user?.premiumTaken}
            >
              {isPremium && !user?.premiumTaken ? 'Subscribe to View' : 'View Details'}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Article;
