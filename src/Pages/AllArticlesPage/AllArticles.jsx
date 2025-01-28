import React, { useState, useEffect } from 'react';
import Article from './Article';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';


const AllArticles = () => {
  const [publisher, setPublisher] = useState('');
  const [tags, setTags] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext); // Access current user from AuthContext
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  // Fetch user subscription status
  useEffect(() => {
    if (user) {
      const fetchSubscriptionStatus = async () => {
        try {
          const response = await axiosPublic.get('/user-status');
          setSubscriptionStatus(response.data.message); // Store subscription status
        } catch (error) {
          console.error('Error fetching user subscription status:', error);
        }
      };

      fetchSubscriptionStatus();
    }
  }, [user, axiosPublic]);

  // Fetch articles
  const fetchArticles = async (publisher, tags, searchQuery, axiosPublic) => {
    const queryParams = ['isApproved=true'];

    if (publisher) queryParams.push(`publisher=${publisher}`);
    if (tags) queryParams.push(`tags=${tags}`);
    if (searchQuery) queryParams.push(`title=${searchQuery}`);

    const url = `/news?${queryParams.join('&')}`;
    const response = await axiosPublic.get(url);
    return response.data;
  };

  const { data: articles, isLoading, error } = useQuery({
    queryKey: ['articles', publisher, tags, searchQuery],
    queryFn: () => fetchArticles(publisher, tags, searchQuery, axiosPublic),
    keepPreviousData: true,
  });

  if (isLoading) {
    return <div>Loading articles...</div>;
  }

  if (error) {
    return <div>Error fetching articles: {error.message}</div>;
  }

  return (
    <div className="pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search bar for article title */}
        <div className="mb-8 flex justify-between items-center gap-4 flex-col md:flex-row">
          <div className="flex gap-4 w-full md:w-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border rounded-md w-full md:w-64"
              placeholder="Search articles by title"
            />
            <input
              type="text"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              className="p-2 border rounded-md w-full md:w-64"
              placeholder="Publisher"
            />
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="p-2 border rounded-md w-full md:w-64"
              placeholder="Tags (comma-separated)"
            />
          </div>
        </div>

        {/* Articles list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => {
            // Ensure article.tags is an array
            const articleTags = Array.isArray(article.tags)
              ? article.tags
              : (article.tags || '').split(',').map(tag => tag.trim());

            return (
              <Article
                key={article._id}
                article={{ ...article, tags: articleTags }} // Pass the array of tags to Article
                subscriptionStatus={subscriptionStatus} // Pass subscription status to Article component
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllArticles;
