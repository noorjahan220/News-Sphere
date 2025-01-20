import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Article = ({ article }) => {
  const { title, image, description, tags, _id } = article;

  const handleViewUpdate = async () => {
    try {
      // Send a request to the backend to increment the view count
      await axios.post(`http://localhost:3000/update-view/${_id}`);
     
    } catch (error) {
      console.error('Error updating view count:', error);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
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
        <p>{description.substring(0, 100)}...</p>
        <div className="card-actions justify-end">
          <Link to={`/details/${_id}`} onClick={handleViewUpdate}>
            <button className="btn btn-ghost">Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Article;
