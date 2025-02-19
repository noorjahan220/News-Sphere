import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';  // Import SweetAlert2

const Article = ({ article, subscriptionStatus }) => {
  const navigate = useNavigate();
  const { title, image, Description, tags = [], _id, isPremium } = article;
  const axiosPublic = useAxiosPublic();

  if (!article) {
    return <div>Loading article...</div>;
  }

  // Ensure 'tags' is always an array
  const processedTags = Array.isArray(tags) ? tags : (tags || '').split(',').map(tag => tag.trim());

  // Safe description: ensures the description is not too long
  const safeDescription = Description ? Description.substring(0, 150) : 'No description available';

  const handleViewUpdate = async () => {
    try {
      await axiosPublic.post(`/update-view/${_id}`);
    } catch (error) {
      console.error('Error updating view count:', error);
    }
  };

  // Determine if user has subscription (use subscriptionStatus from props)
  const isSubscribed = subscriptionStatus && subscriptionStatus === 'User has an active subscription';

  // Block navigation for non-subscribed users if the article is premium
  const handleNavigation = (e) => {
    if (isPremium && !isSubscribed) {
      e.preventDefault(); // Prevent navigation

      // Show SweetAlert2 notification at the top of the page
      Swal.fire({
        title: 'Premium Content!',
        text: 'You need a premium subscription to access this article.',
        icon: 'warning',
        position: 'top',  // Position at the top of the page
        showConfirmButton: true,
        timer: 5000,  // Show the alert for 5 seconds
      });
    } else {
      handleViewUpdate(); // Update view count if user is subscribed or it's not a premium article
    }
  };

  return (
    <div
      className={`group relative rounded-lg shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${isPremium && !isSubscribed ? 'border-r-4 border-[#FFD700]' : 'bg-white dark:bg-gray-700'}`}
    >
      <div className="aspect-video relative">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mt-2">
          {safeDescription}{Description && Description.length > 150 ? '...' : ''}
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-full text-sm">
            🔥 {article.viewCount} Views
          </span>
          <Link to={`/details/${_id}`} onClick={handleNavigation}>
            <button
              className={`text-teal-500 dark:text-teal-400 hover:text-teal-600 dark:hover:text-teal-300 font-medium ${isPremium && !isSubscribed ? 'btn-disabled opacity-50 cursor-not-allowed' : ''}`}
              disabled={isPremium && !isSubscribed}
            >
              {isPremium && !isSubscribed ? 'Subscribe to View' : 'Read More →'}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Article;
