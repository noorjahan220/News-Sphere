import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure'; // Assuming this hook is to make secure API requests

const PremiumArticles = () => {
  const axiosSecure = useAxiosSecure();

  const { data: premiumArticles = [], isLoading, isError } = useQuery({
    queryKey: ['premiumArticles'], // Use an array as the query key
    queryFn: async () => {
      const { data } = await axiosSecure('/premium-articles');
      return data;
    },
  });

  if (isLoading) {
    return <span className="loading loading-bars loading-lg"></span>;
  }

  if (isError) {
    return <p>Error loading premium articles</p>;
  }

  if (premiumArticles.length === 0) {
    return <p>No premium articles available</p>;
  }

  return (
    <div className="premium-articles-page">
      <h1>Premium Articles</h1>
      <div className="articles-list">
        {premiumArticles.map((article) => (
          <div key={article._id} className="article-card">
            <img src={article.image} alt={article.title} className="article-image" />
            <div className="article-info">
              <h2>{article.title}</h2>
              <p className="publisher">Published by: {article.publisher}</p>
              <p className="description">{article.description}</p>
              <Link to={`/article/${article._id}`} className="view-details-btn">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumArticles;
