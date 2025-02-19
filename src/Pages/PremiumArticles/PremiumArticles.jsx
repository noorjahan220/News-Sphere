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
    return (
      <div className="flex justify-center items-center py-12">
        <div className="border-t-4 border-teal-500 w-16 h-16 border-solid rounded-full animate-spin" />
      </div>
    );
  }

  if (isError) {
    return <p className="text-center text-red-500">Error loading premium articles</p>;
  }

  if (premiumArticles.length === 0) {
    return <p className="text-center text-gray-600">No premium articles available</p>;
  }

  return (
    <div className="relative py-12">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
          Premium Articles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {premiumArticles.map((article) => (
            <div
              key={article._id}
              className="group relative rounded-lg shadow-xl bg-white dark:bg-gray-700 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
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
                  <Link
                    to={`/details/${article._id}`}
                    className="text-teal-500 dark:text-teal-400 hover:text-teal-600 dark:hover:text-teal-300 font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumArticles;
