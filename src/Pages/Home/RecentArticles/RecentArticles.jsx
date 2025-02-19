import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from "../../../hooks/useAxiosPublic";

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
  }, []);

  return (
    <div className="relative py-12">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          Recent Articles
        </h2>
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="border-t-4 border-teal-500 w-16 h-16 border-solid rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((article) => (
              <div key={article._id} className="group relative rounded-lg shadow-xl bg-white dark:bg-gray-700 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <div className="aspect-video relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mt-2">
                    {article.description}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-full text-sm">
                      🔥 {article.viewCount} Views
                    </span>
                    <button
                      onClick={() => navigate(`/details/${article._id}`)}
                      className="text-teal-500 dark:text-teal-400 hover:text-teal-600 dark:hover:text-teal-300 font-medium"
                    >
                      Read More →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentArticles;
