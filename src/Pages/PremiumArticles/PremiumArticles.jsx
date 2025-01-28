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
    <div className="premium-articles-page p-4 sm:p-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">Premium Articles</h1>
      <div className="articles-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {premiumArticles.map((article) => (
          <div key={article._id} className="article-card bg-white shadow-md rounded-lg overflow-hidden">
            <img src={article.image} alt={article.title} className="article-image w-full h-56 object-cover" />
            <div className="article-info p-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 truncate">{article.title}</h2>
              <p className="publisher text-gray-600 text-sm mb-2">Published by: {article.publisher}</p>
              <p className="description text-gray-700 text-sm mb-4">{article.description}</p>
              <Link to={`/article/${article._id}`} className="view-details-btn text-blue-600 hover:underline text-sm">
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
