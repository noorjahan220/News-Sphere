import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useAxiosPublic from '../../hooks/useAxiosPublic';


const Article = ({ article, user }) => {
  const { title, image, description, tags, _id, isPremium } = article;
  const axiosPublic =useAxiosPublic()

  // Add safety check to avoid calling substring on undefined description
  const safeDescription = description ? description.substring(0, 100) : 'No description available';

  const handleViewUpdate = async () => {
    try {
      // Send a request to the backend to increment the view count
      await axiosPublic.post(`/update-view/${_id}`);
    } catch (error) {
      console.error('Error updating view count:', error);
    }
  };

  return (
    <div  className={`card ${isPremium ? 'bg-premium' : 'bg-base-100 '} shadow-xl`}>
      <figure>
        <img src={image} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="flex gap-2 my-2">
          {tags.map((tag, index) => (
            <div key={index} className="badge badge-outline">
              {tag}
            </div>
          ))}
        </div>
        <p>{description}...</p> {/* Use the safe description */}
        <div className="card-actions justify-end">
          {/* Disable button if premium and user doesn't have subscription */}
          <Link to={`/details/${_id}`}>
            <button
              className="btn btn-ghost"
              onClick={handleViewUpdate}
              disabled={isPremium && !user?.premiumTaken}
            >
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Article;
