import React from 'react';
import { useQuery } from '@tanstack/react-query';

import useAxiosPublic from '../../../hooks/useAxiosPublic';


const axiosPublic = useAxiosPublic()
const fetchLatestNews = async () => {
  const response = await axiosPublic .get('/news/latest');
  return response.data; // Return the fetched articles
};

const LatestNews = () => {
  const { data: articles = [], isLoading, isError } = useQuery({
    queryKey: ['latestNews'],
    queryFn: fetchLatestNews,
  });

  if (isLoading) {
    return (
      <section className="latest-news py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-8">Latest News</h3>
          <p className="text-gray-500">Loading latest news...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="latest-news py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-8">Latest News</h3>
          <p className="text-red-500">Failed to load latest news. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="latest-news py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h3 className="text-3xl font-bold mb-8">Latest News</h3>
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div
                key={article._id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h4 className="font-semibold text-lg mb-2 hover:text-blue-500">
                  <a href={`/article/${article._id}`}>{article.title}</a>
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  {article.description.slice(0, 100)}...
                </p>
                <div className="text-gray-500 text-xs mb-2">
                  Published on: {new Date(article.createdAt).toLocaleDateString()}
                </div>
                <div className="text-gray-500 text-xs">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-200 px-2 py-1 rounded-full mr-2"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No latest news available.</p>
        )}
      </div>
    </section>
  );
};

export default LatestNews;
