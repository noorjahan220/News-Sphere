import React, { useState, useEffect } from 'react';
import Article from './Article';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [publisher, setPublisher] = useState('');
  const [tags, setTags] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); 
  const axiosSecure = useAxiosSecure();
 
  useEffect(() => {
    fetchArticles();
  }, [publisher, tags, searchQuery]); 

 
  const fetchArticles = async () => {
    try {
      const queryParams = [];

      // Adding publisher and tags filters if they are provided
      if (publisher) queryParams.push(`publisher=${publisher}`);
      if (tags) queryParams.push(`tags=${tags}`);

      // Adding the search query if it's provided
      if (searchQuery) queryParams.push(`title=${searchQuery}`);

      // Construct the API request URL with query parameters
      const url = `/news?${queryParams.join('&')}`;
      const response = await axiosSecure.get(url);
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  return (
    <div>
        <div className="articles-list">
        {articles.map((article) => (
          <Article key={article._id} article={article} />
        ))}
      </div>
      {/* Search bar for article title */}
      <div>
        <label>Search by Title:</label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
          placeholder="Search articles by title"
        />
      </div>

      {/* Publisher filter */}
      <div>
        <label>Publisher:</label>
        <input
          type="text"
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
          placeholder="Enter publisher"
        />
      </div>

      {/* Tags filter */}
      <div>
        <label>Tags:</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Enter tags (comma-separated)"
        />
      </div>

      {/* Articles list */}
      
    </div>
  );
};

export default Articles;
