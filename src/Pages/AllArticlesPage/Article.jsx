import React from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiClock, FiLock, FiArrowRight } from 'react-icons/fi';
import Swal from 'sweetalert2';

const Article = ({ article, subscriptionStatus }) => {
  const { title, image, Description, tags = [], _id, isPremium, publisher, viewCount, createdAt } = article;
  
  // Determine if user has subscription
  const isSubscribed = subscriptionStatus && subscriptionStatus === 'User has an active subscription';

  // Format date
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // Handle navigation for premium articles
  const handleNavigation = (e) => {
    if (isPremium && !isSubscribed) {
      e.preventDefault();
      Swal.fire({
        title: 'Premium Content',
        text: 'You need a premium subscription to access this article.',
        icon: 'info',
        position: 'top',
        showConfirmButton: true,
        confirmButtonColor: '#F59E0B',
        timer: 5000,
      });
    }
  };

  // Get shortened description
  const shortDescription = Description 
    ? Description.length > 120 ? `${Description.substring(0, 120)}...` : Description
    : 'No description available';

  return (
    <div className="group">
      <Link 
        to={`/details/${_id}`} 
        onClick={handleNavigation}
        className={`block h-full bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 transition-all duration-300 ${
          isPremium && !isSubscribed ? 'opacity-90 cursor-not-allowed' : 'hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-900/20'
        }`}
      >
        {/* Image Container with Proper Aspect Ratio */}
        <div className="relative w-full aspect-[16/9]">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover" 
          />
          
          {/* Premium Badge */}
          {isPremium && (
            <div className="absolute top-0 left-0 bg-gradient-to-r from-amber-600 to-amber-500 text-white text-xs font-medium py-1 px-3 flex items-center">
              <FiLock className="mr-1.5" size={12} />
              PREMIUM
            </div>
          )}
          
          {/* Publisher Badge */}
          <div className="absolute bottom-0 right-0 bg-zinc-900/80 text-amber-400 text-xs font-medium py-1 px-3">
            {publisher}
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent opacity-50 group-hover:opacity-40 transition-opacity" />
        </div>
        
        {/* Content */}
        <div className="p-5">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index} 
                className="inline-block px-2 py-1 rounded text-xs font-medium bg-zinc-700 text-amber-400 border-l-2 border-amber-500"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Title */}
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-amber-400 transition-colors">
            {title}
          </h3>
          
          {/* Description */}
          <p className="text-gray-400 text-sm mb-4">
            {shortDescription}
          </p>
          
          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-zinc-700 via-amber-700/30 to-zinc-700 my-3"></div>
          
          {/* Meta info */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-4 text-gray-500">
              <span className="flex items-center">
                <FiEye className="mr-1 text-amber-500/70" size={14} />
                {viewCount || 0}
              </span>
              <span className="flex items-center">
                <FiClock className="mr-1 text-amber-500/70" size={14} />
                {formattedDate}
              </span>
            </div>
            
            {/* Read more */}
            <span className="text-amber-500 flex items-center font-medium group-hover:text-amber-400">
              Read
              <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Article;