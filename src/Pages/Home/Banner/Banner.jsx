import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FiEye, FiClock, FiArrowRight, FiArrowLeft, FiTrendingUp } from "react-icons/fi";

const Banner = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrendingArticles = async () => {
      try {
        const response = await axiosPublic.get("trending");
        if (response.data && Array.isArray(response.data)) {
          setArticles(response.data.slice(0, 5)); // Limit to 5 trending articles
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (err) {
        console.error("Error fetching trending articles:", err);
        setError("Failed to load trending articles");
        // Fallback to sample data
        setArticles(getSampleArticles());
      } finally {
        setLoading(false);
      }
    };
    
    fetchTrendingArticles();
  }, [axiosPublic]);

  const handleReadMore = (id) => {
    navigate(`/details/${id}`, { state: { fromBanner: true } });
  };

  // Sample data fallback
  const getSampleArticles = () => [
    {
      _id: "sample1",
      title: "Breaking News: Global Summit Concludes",
      description: "World leaders reach historic agreement on climate change policies after marathon negotiations.",
      image: "https://source.unsplash.com/random/800x600?news",
      viewCount: 1245,
      category: "Politics",
      author: { name: "Global News Team" },
      publishDate: new Date().toISOString()
    },
    {
      _id: "sample2",
      title: "Tech Giant Unveils Revolutionary Device",
      description: "The new device promises to change how we interact with technology in our daily lives.",
      image: "https://source.unsplash.com/random/800x600?technology",
      viewCount: 982,
      category: "Technology",
      author: { name: "Tech Insider" },
      publishDate: new Date(Date.now() - 86400000).toISOString()
    }
  ];

  // Arrow components with improved accessibility
  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 z-10 -translate-y-1/2 w-12 h-12 bg-zinc-800/80 rounded-full flex items-center justify-center border border-zinc-700 hover:bg-amber-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
      aria-label="Next slide"
    >
      <FiArrowRight className="text-white text-xl" />
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 z-10 -translate-y-1/2 w-12 h-12 bg-zinc-800/80 rounded-full flex items-center justify-center border border-zinc-700 hover:bg-amber-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
      aria-label="Previous slide"
    />
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000, // Slightly longer duration
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
      <button className="w-3 h-3 bg-zinc-600 hover:bg-amber-500 rounded-full transition-all duration-300 border border-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500" />
    ),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true
        }
      }
    ]
  };

  const formatDate = (dateString) => {
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    } catch {
      return "Recent";
    }
  };

  if (error && articles.length === 0) {
    return (
      <section className="bg-zinc-900 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="bg-zinc-800 p-8 rounded-lg border border-zinc-700">
            <h3 className="text-xl font-bold text-white mb-2">Unable to load trending articles</h3>
            <p className="text-gray-400 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-gradient-to-b from-zinc-900 to-zinc-800 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-zinc-800 via-amber-500 to-zinc-800"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-zinc-800 via-amber-500 to-zinc-800"></div>
      
      <div className="absolute top-6 left-6 z-10">
        <div className="flex items-center bg-zinc-800/80 backdrop-blur-sm px-3 py-1 rounded border border-zinc-700">
          <FiTrendingUp className="text-amber-500 mr-2" />
          <span className="text-white text-sm font-medium uppercase tracking-wider">Trending Now</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-amber-500">Loading trending content...</p>
            </div>
          </div>
        ) : (
          <Slider {...settings}>
            {articles.map((article) => (
              <div key={article._id} className="px-2 focus:outline-none">
                <div className="bg-zinc-800 rounded-xl overflow-hidden shadow-2xl border border-zinc-700 hover:border-amber-500 transition-colors duration-300">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image section */}
                    <div className="relative h-64 md:h-96">
                      <img
                        className="w-full h-full object-cover"
                        src={article.image}
                        alt={article.title}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                        <div className="flex items-center bg-zinc-800/90 backdrop-blur-sm px-3 py-1 rounded-full">
                          <FiEye className="text-amber-500 mr-2" />
                          <span className="text-white text-sm font-medium">
                            {article.viewCount?.toLocaleString() || '0'} Views
                          </span>
                        </div>
                        <div className="flex items-center bg-zinc-800/90 backdrop-blur-sm px-3 py-1 rounded-full">
                          <FiClock className="text-amber-500 mr-2" />
                          <span className="text-white text-sm font-medium">
                            {formatDate(article.publishDate)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content section */}
                    <div className="p-6 md:p-8 flex flex-col">
                      <div className="mb-4 flex items-center">
                        <span className="inline-block bg-amber-500 h-6 w-1 mr-3"></span>
                        <span className="text-sm text-gray-300 uppercase font-semibold tracking-wider">
                          {article.category || 'Featured'}
                        </span>
                      </div>
                      
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 line-clamp-2">
                        {article.title}
                      </h2>
                      
                      <p className="text-gray-300 mb-6 line-clamp-3">
                        {article.Description || 'No description available'}
                      </p>
                      
                      <div className="mt-auto flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center border-2 border-amber-500">
                            <span className="text-white font-bold">
                              {article.author?.name?.charAt(0) || 'N'}
                            </span>
                          </div>
                          <div className="ml-3">
                            <p className="text-white font-medium">
                              {article.author?.name || 'NewsSphere'}
                            </p>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleReadMore(article._id)}
                          className="group flex items-center bg-zinc-700 hover:bg-amber-600 text-white px-4 py-2 rounded transition-all duration-300"
                          aria-label={`Read more about ${article.title}`}
                        >
                          <span className="mr-2">Read More</span>
                          <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default Banner;