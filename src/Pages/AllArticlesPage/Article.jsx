import React from 'react';
import { Link } from 'react-router-dom';

const Article = ({ article }) => {
    const {title, image_url, details,tags,_id} = article
    return (
        <div className="card bg-base-100  shadow-xl">
  <figure>
    <img src={image_url}/>
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      {title}
      
    </h2>
    <div className="flex gap-2 my-2">
          {tags.map((tag, index) => (
            <div key={index} className="badge badge-outline">
              {tag}
            </div>
          ))}
        </div>
    <p>{details.substring(0, 100)}...</p>
    <div className="card-actions justify-end">
        
     <Link to={`/details/:${_id}`}><button className='btn btn-ghost'>Details</button></Link>
    </div>
  </div>
</div>
    );
};

export default Article;