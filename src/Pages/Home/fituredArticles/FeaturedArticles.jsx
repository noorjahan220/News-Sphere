import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeaturedArticles = () => {
  const [premiumArticles, setPremiumArticles] = useState([]);

  // Fetch premium articles when the component mounts
  useEffect(() => {
    const fetchPremiumArticles = async () => {
      try {
        const response = await axios.get('http://localhost:3000/premium-articles');
        setPremiumArticles(response.data);
      } catch (error) {
        console.error('Error fetching premium articles:', error);
      }
    };
    
    fetchPremiumArticles();
  }, []);

  return (
    <div className="featured-articles">
      <h2>Featured Premium Articles</h2>
      <div className="article-list">
        {premiumArticles.map((article) => (
          <div key={article._id} className="article-card">
            <img src={article.image} alt={article.title} />
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <span className="premium-badge">Premium</span>
            <p>Views: {article.viewCount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedArticles;
