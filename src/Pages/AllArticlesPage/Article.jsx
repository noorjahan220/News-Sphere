import React from 'react';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Article = ({ article, subscriptionStatus }) => {
  if (!article) {
    return <div>Loading article...</div>;
  }

  const { title, image, Description, tags = [], _id, isPremium } = article;
  const axiosPublic = useAxiosPublic();

  // Ensure 'tags' is always an array
  const processedTags = Array.isArray(tags) ? tags : (tags || '').split(',').map(tag => tag.trim());

  // Safe description: ensures the description is not too long
  const safeDescription = Description ? Description.substring(0, 150) : 'No description available';

  // Update view count
  const handleViewUpdate = async () => {
    try {
      await axiosPublic.post(`/update-view/${_id}`);
    } catch (error) {
      console.error('Error updating view count:', error);
    }
  };

  // Determine if user has subscription (use subscriptionStatus from props)
  const isSubscribed = subscriptionStatus && subscriptionStatus === 'User has an active subscription';

  return (
    <div className={`card shadow-lg transition-all duration-300 ease-in-out transform ${isPremium && !isSubscribed ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' : 'bg-white'} hover:scale-105`}>
      <figure>
        <img src={image} alt={title} className="w-full h-64 object-cover rounded-t-md md:h-48" />
      </figure>
      <div className="card-body p-6">
        <h2 className="card-title text-2xl font-semibold text-gray-800">{title}</h2>

        {/* Tags - Ensure 'tags' is always an array */}
        <div className="flex gap-2 my-2 flex-wrap">
          {processedTags.length > 0 ? (
            processedTags.map((tag, index) => (
              <div key={index} className="badge badge-outline bg-gray-200 text-gray-700">{tag}</div>
            ))
          ) : (
            <div className="badge badge-outline bg-gray-200 text-gray-700">No tags available</div>
          )}
        </div>

        {/* Description */}
        <p>{safeDescription}{Description && Description.length > 150 ? '...' : ''}</p>

        <div className="card-actions justify-end mt-4">
          <Link to={`/details/${_id}`}>
            <button
              className={`btn btn-primary ${isPremium && !isSubscribed ? 'btn-disabled opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleViewUpdate}
              disabled={isPremium && !isSubscribed}
            >
              {isPremium && !isSubscribed ? 'Subscribe to View' : 'View Details'}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Article;
