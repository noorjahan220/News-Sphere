import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick"; // Install this if you want a slider
/* Slick Carousel CSS */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const [articles, setArticles] = useState([]);

  // Fetch trending articles when the component mounts
  useEffect(() => {
    fetchTrendingArticles();
  }, []);

  // Fetch trending articles from the backend
  const fetchTrendingArticles = async () => {
    try {
      const response = await axios.get("http://localhost:3000/trending"); // Updated the endpoint to match the backend
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching trending articles:", error);
    }
  };

  return (
    <div className="trending-articles">
      <h2>Trending Articles</h2>
      <Slider>
        {articles.map((article) => (
          <div key={article._id} className="slider-item"> {/* Use _id as the key */}
            <img src={article.image} alt={article.title} />
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <p>Views: {article.viewCount}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
