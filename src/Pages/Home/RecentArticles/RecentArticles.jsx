import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FiEye, FiClock, FiArrowRight, FiGrid, FiBookmark } from "react-icons/fi";

const RecentArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentArticles = async () => {
      try {
        const response = await axiosPublic.get("news"); // Make sure the endpoint is correct
        setArticles(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    };
    fetchRecentArticles();
  }, [axiosPublic]);

  // Format publish date
  const formatDate = (dateString) => {
    if (!dateString) return 'Recent';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Loading spinner with industrial design
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-16">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-zinc-700 rounded-full"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 border-t-4 border-amber-500 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <span className="text-xs font-bold text-amber-500">LOADING</span>
        </div>
      </div>
    </div>
  );

  // Handle article click
  const handleReadMore = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <section className="bg-zinc-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center mb-4">
            <FiGrid className="text-amber-500 mr-3 text-xl" />
            <h2 className="text-3xl font-bold text-white tracking-tight">Recent Articles</h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-zinc-800 via-amber-500 to-zinc-800"></div>
          <p className="mt-4 text-gray-400 text-center max-w-2xl">
            Stay informed with our latest coverage of breaking news and trending stories
          </p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((article) => (
              <div 
                key={article._id} 
                className="group bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-amber-600/50 hover:translate-y-[-4px]"
              >
                {/* Image Container */}
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  
                  {/* Category Tag */}
                  <div className="absolute top-3 left-3">
                    <div className="bg-zinc-800/90 backdrop-blur-sm px-3 py-1 rounded border border-zinc-700">
                      <span className="text-white text-xs font-medium uppercase tracking-wider">
                        {article.category || 'News'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Save Button */}
                  <button className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800/70 border border-zinc-700 text-white hover:bg-amber-500 hover:border-amber-600 transition-colors duration-300">
                    <FiBookmark size={14} />
                  </button>
                </div>
                
                {/* Content */}
                <div className="p-5">
                  {/* Title */}
                  <h3 className="text-lg font-bold text-white line-clamp-2 mb-2 group-hover:text-amber-400 transition-colors duration-300">
                    {article.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                    {article.description}
                  </p>
                  
                  {/* Footer */}
                  <div className="flex justify-between items-center pt-3 border-t border-zinc-700">
                    {/* View Count */}
                    <div className="flex items-center text-gray-400 text-sm">
                      <FiEye className="mr-1.5 text-amber-500" />
                      <span>{article.viewCount || 0} Views</span>
                    </div>
                    
                    {/* Date */}
                    <div className="flex items-center text-gray-400 text-sm">
                      <FiClock className="mr-1.5 text-amber-500" />
                      <span>{formatDate(article.publishDate)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Read More Button - Overlaid at the bottom */}
                <div className="p-4 pt-0">
                  <button
                    onClick={() => handleReadMore(article._id)}
                    className="w-full flex items-center justify-center bg-zinc-700 hover:bg-amber-600 text-white py-2 rounded transition-colors duration-300 border border-zinc-600 hover:border-amber-700"
                  >
                    <span className="mr-2">Read Article</span>
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <button 
            onClick={() => navigate('/allArticles')}
            className="flex items-center bg-zinc-800 hover:bg-amber-600 text-white px-6 py-3 rounded-lg transition-all duration-300 border border-zinc-700 hover:border-amber-700 group"
          >
            <span className="mr-2 font-medium">View All Articles</span>
            <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default RecentArticles;