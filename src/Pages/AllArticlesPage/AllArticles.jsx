import React, { useState } from 'react';
import Article from './Article';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const AllArticles = () => {
  const [publisher, setPublisher] = useState('');
  const [tags, setTags] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);

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
        <div className="mb-8 flex justify-between items-center">
          <div className="flex gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border rounded-md"
              placeholder="Search articles by title"
            />
            <input
              type="text"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              className="p-2 border rounded-md"
              placeholder="Publisher"
            />
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="p-2 border rounded-md"
              placeholder="Tags (comma-separated)"
            />
          </div>
        </div>

        {/* Articles list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => {
            // Ensure article.tags is a string before attempting to split it into an array
            const articleTags = Array.isArray(article.tags)
              ? article.tags
              : (article.tags || '').split(',').map(tag => tag.trim());
            
            return (
              <Article
                key={article._id}
                article={{ ...article, tags: articleTags }} // Pass the array of tags to Article
                user={user} // Pass user details to Article component
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllArticles;
