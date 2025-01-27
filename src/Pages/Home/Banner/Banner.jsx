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
      const response = await axios.get("http://localhost:3000/trending"); // Replace this with your API endpoint
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching trending articles:", error);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="trending-articles">
      <h2 className="text-3xl font-semibold text-center text-orange-600 mb-6">Trending Articles</h2>
      <Slider {...settings}>
        {articles.map((article) => (
          <div key={article._id} className="slider-item">
            <img className="w-full h-60 object-cover rounded-lg" src={article.image} alt={article.title} />
            <div className="p-4 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-bold text-gray-800">{article.title}</h3>
              <p className="text-gray-600 text-sm">{article.description}</p>
              <p className="mt-2 text-gray-500">Views: {article.viewCount}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
