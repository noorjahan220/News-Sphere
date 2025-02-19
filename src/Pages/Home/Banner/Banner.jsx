import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrendingArticles = async () => {
      try {
        const response = await axiosPublic.get("trending");
        setArticles(response.data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching trending articles:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };
    fetchTrendingArticles();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: dots => (
      <div className="mt-6">
        <ul className="flex justify-center space-x-2">{dots}</ul>
      </div>
    ),
    customPaging: i => (
      <div className="w-3 h-3 bg-teal-300 dark:bg-gray-600 rounded-full transition-all duration-300" />
    )
  };

  const handleReadMore = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <div className="relative py-12 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="border-t-4 border-teal-500 w-16 h-16 border-solid rounded-full animate-spin" />
          </div>
        ) : (
          <Slider {...settings} className="slider-container">
            {articles.map((article) => (
              <div key={article._id} className="group relative px-2">
                <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  <div className="aspect-video relative">
                    <img
                      className="w-full h-full object-cover"
                      src={article.image}
                      alt={article.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                      {article.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-full text-sm">
                        🔥 {article.viewCount} Views
                      </span>
                      <button
                        onClick={() => handleReadMore(article._id)}
                        className="text-teal-500 dark:text-teal-400 hover:text-teal-600 dark:hover:text-teal-300 font-medium"
                      >
                        Read More →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

// Custom Arrows
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-1/2 z-10 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
  >
    <span className="text-white text-2xl">→</span>
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 z-10 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
  >
    <span className="text-white text-2xl">←</span>
  </button>
);

export default Banner;
