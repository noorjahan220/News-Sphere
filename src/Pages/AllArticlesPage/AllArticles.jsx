import React, { useState, useEffect } from 'react';
import Article from './Article';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';

const AllArticles = () => {
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedPublisher, setSelectedPublisher] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  const fetchArticles = async () => {
    const response = await axiosPublic.get('/news');
    return response.data;
  };

  const { data: articles = [], isLoading, error } = useQuery({
    queryKey: ['articles'],
    queryFn: fetchArticles,
    keepPreviousData: true,
  });

  const availableTags = [...new Set(articles.flatMap(article => article.tags))];
  const availablePublishers = [...new Set(articles.map(article => article.publisher))];

  const filteredArticles = articles.filter(article => {
    const tagMatch = selectedTag ? article.tags.includes(selectedTag) : true;
    const publisherMatch = selectedPublisher ? article.publisher === selectedPublisher : true;
    const searchMatch = searchQuery
      ? article.title.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return tagMatch && publisherMatch && searchMatch;
  });

  if (isLoading) return <div className="text-center text-lg font-semibold text-blue-500">Loading articles...</div>;
  if (error) return <div className="text-center text-lg text-red-500">Error fetching articles: {error.message}</div>;

  return (
    <div className="relative py-12 bg-gray-50 min-h-screen px-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Sidebar (Filters) */}
        <div className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-lg font-semibold mb-4">Filter Articles</h2>

          {/* Tags Filter Buttons */}
          <label className="block text-gray-700 font-medium mb-2">Tags</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag('')}
              className={`px-3 py-1 rounded-lg ${!selectedTag ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
            >
              All
            </button>
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-lg ${selectedTag === tag ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Publisher Filter Buttons */}
          <label className="block text-gray-700 font-medium mt-4 mb-2">Publisher</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedPublisher('')}
              className={`px-3 py-1 rounded-lg ${!selectedPublisher ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              All
            </button>
            {availablePublishers.map((publisher) => (
              <button
                key={publisher}
                onClick={() => setSelectedPublisher(publisher)}
                className={`px-3 py-1 rounded-lg ${selectedPublisher === publisher ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                {publisher}
              </button>
            ))}
          </div>
        </div>

        {/* Right Content (Search & Articles) */}
        <div className="w-full md:w-3/4">
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="🔍 Search articles by title"
            />
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredArticles.map((article) => (
              <Article key={article._id} article={article} subscriptionStatus={subscriptionStatus} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllArticles;
