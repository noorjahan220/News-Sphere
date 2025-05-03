import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FiEye, FiClock, FiArrowRight, FiArrowLeft, FiTrendingUp, FiBookmark } from "react-icons/fi";

const Banner = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrendingArticles = async () => {
      try {
        const response = await axiosPublic.get("trending");
        setArticles(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trending articles:", error);
        setLoading(false);
      }
    };
    fetchTrendingArticles();
  }, [axiosPublic]);

  const handleReadMore = (id) => {
    navigate(`/details/${id}`);
  };

  // Custom arrow components with improved industrial design
  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 z-10 -translate-y-1/2 w-12 h-12 bg-zinc-800 rounded-full shadow-lg flex items-center justify-center border border-zinc-700 hover:bg-zinc-700 hover:border-amber-500 transition-all duration-300"
      aria-label="Next slide"
    >
      <FiArrowRight className="text-white text-xl" />
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 z-10 -translate-y-1/2 w-12 h-12 bg-zinc-800 rounded-full shadow-lg flex items-center justify-center border border-zinc-700 hover:bg-zinc-700 hover:border-amber-500 transition-all duration-300"
      aria-label="Previous slide"
    >
      <FiArrowLeft className="text-white text-xl" />
    </button>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: dots => (
      <div className="absolute bottom-6 left-0 right-0">
        <ul className="flex justify-center space-x-2">{dots}</ul>
      </div>
    ),
    customPaging: i => (
      <div className="w-3 h-3 bg-zinc-600 hover:bg-amber-500 rounded-full transition-all duration-300 border border-zinc-500" />
    ),
    responsive: [
      {
        breakpoint: 640,
        settings: {
          arrows: false
        }
      }
    ]
  };

  // Format publish date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Loading spinner with industrial design
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-32">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-zinc-700 rounded-full"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 border-t-4 border-amber-500 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <span className="text-xs font-bold text-amber-500">LOADING</span>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative bg-gradient-to-b from-zinc-900 to-zinc-800 overflow-hidden">
      {/* Industrial design decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-zinc-800 via-amber-500 to-zinc-800"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-zinc-800 via-amber-500 to-zinc-800"></div>
      <div className="absolute top-6 left-6">
        <div className="flex items-center bg-zinc-800/80 backdrop-blur-sm px-3 py-1 rounded border border-zinc-700">
          <FiTrendingUp className="text-amber-500 mr-2" />
          <span className="text-white text-sm font-medium uppercase tracking-wider">Trending Now</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="slider-container">
            <Slider {...settings}>
              {articles.map((article) => (
                <div key={article._id} className="px-0 sm:px-4 focus:outline-none">
                  <div className="bg-zinc-800 rounded-lg overflow-hidden shadow-2xl border border-zinc-700">
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Image section */}
                      <div className="relative h-64 md:h-full min-h-[280px]">
                        <img
                          className="w-full h-full object-cover"
                          src={article.image}
                          alt={article.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                          <div className="flex items-center bg-zinc-800/90 backdrop-blur-sm px-3 py-1 rounded-full border border-zinc-700">
                            <FiEye className="text-amber-500 mr-2" />
                            <span className="text-white text-sm font-medium">{article.viewCount} Views</span>
                          </div>
                          <div className="flex items-center bg-zinc-800/90 backdrop-blur-sm px-3 py-1 rounded-full border border-zinc-700">
                            <FiClock className="text-amber-500 mr-2" />
                            <span className="text-white text-sm font-medium">
                              {article.publishDate ? formatDate(article.publishDate) : 'Recent'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content section */}
                      <div className="p-6 md:p-8 flex flex-col justify-between">
                        <div>
                          <div className="mb-4 flex items-center">
                            <span className="inline-block bg-amber-500 h-6 w-1 mr-3"></span>
                            <span className="text-sm text-gray-300 uppercase font-semibold tracking-wider">{article.category || 'News'}</span>
                          </div>
                          
                          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 line-clamp-3">
                            {article.title}
                          </h2>
                          
                          <p className="text-gray-300 mb-6 line-clamp-3 md:line-clamp-4">
                            {article.description}
                          </p>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            {article.author?.image ? (
                              <img 
                                src={article.author.image} 
                                alt={article.author.name} 
                                className="w-10 h-10 rounded-full object-cover border-2 border-amber-500"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center border-2 border-amber-500">
                                <span className="text-white font-bold">
                                  {article.author?.name?.charAt(0) || 'N'}
                                </span>
                              </div>
                            )}
                            <div className="ml-3">
                              <p className="text-white font-medium">
                                {article.author?.name || 'NewsSphere Editor'}
                              </p>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => handleReadMore(article._id)}
                            className="group flex items-center bg-zinc-700 hover:bg-amber-600 text-white px-4 py-2 rounded transition-all duration-300 border border-zinc-600 hover:border-amber-700"
                          >
                            <span className="mr-2">Read</span>
                            <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </section>
  );
};

export default Banner;