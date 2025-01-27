import React, { useState, useEffect } from 'react';
import Article from './Article';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const AllArticles = () => {
  const [articles, setArticles] = useState([]);
  const [publisher, setPublisher] = useState('');
  const [tags, setTags] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null); // Store user info to check subscription

  // Fetch filtered and searched articles when the component mounts or filters/search change
  useEffect(() => {
    fetchArticles();
    // fetchUserDetails(); // Fetch user subscription details
  }, [publisher, tags, searchQuery]);

  // Function to fetch articles with filtering and search functionality
  const fetchArticles = async () => {
    try {
      const queryParams = ['isApproved=true']; // Only fetch approved articles by default

      // Apply filters for publisher, tags, and title (search)
      if (publisher) queryParams.push(`publisher=${publisher}`);
      if (tags) queryParams.push(`tags=${tags}`);
      if (searchQuery) queryParams.push(`title=${searchQuery}`);

      // Construct the URL with query parameters
      const url = `/news?${queryParams.join('&')}`;
      const response = await axiosPublic.get(url); // Fetch data from API
      setArticles(response.data); // Set the fetched articles in state
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  // Fetch user details and subscription status
  // const fetchUserDetails = async () => {
  //   try {
  //     const response = await axiosPublic.get('/user/details'); // Fetch user details API
  //     setUser(response.data); // Set user details
  //   } catch (error) {
  //     console.error('Error fetching user details:', error);
  //   }
  // };

  return (
    <div className='pt-32'>
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
          onChange={(e) => setPublisher(e.target.value)} // Update publisher state
          placeholder="Enter publisher"
        />
      </div>

      {/* Tags filter */}
      <div>
        <label>Tags:</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)} // Update tags state
          placeholder="Enter tags (comma-separated)"
        />
      </div>

      {/* Articles list */}
      <div className="articles-list pt-28">
        {articles.map((article) => (
          <Article
            key={article._id}
            article={article}
            user={user} // Pass user details to Article component
          />
        ))}
      </div>
    </div>
  );
};

export default AllArticles;
