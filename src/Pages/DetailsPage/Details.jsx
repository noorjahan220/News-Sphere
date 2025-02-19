import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Details = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const { data: article = {}, isLoading, refetch } = useQuery({
    queryKey: ['article', id],
    queryFn: async () => {
      const { data } = await axiosPublic(`/newsId/${id}`);
      return data;
    }
  });

  if (isLoading) {
    return <span className="loading loading-bars loading-lg"></span>;
  }

  if (!article || !article.title) {
    return <p className="text-center text-lg text-gray-500">Loading or no article found...</p>;
  }

  // Ensure tags is always an array before using map
  const tags = Array.isArray(article.tags) ? article.tags : [];

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 lg:px-8">
      {/* Article Card */}
      <div
        className={`card shadow-lg transition-all duration-300 ease-in-out rounded-md ${article.isPremium ? 'border-b-4 border-gold' : 'bg-white'}`}
      >
        {/* Image Section */}
        <figure className="w-full h-96">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover rounded-t-md"
          />
        </figure>

        {/* Article Details Section */}
        <div className="card-body p-8">
          <h2 className="card-title text-3xl font-semibold text-gray-800">{article.title}</h2>

          {/* Tags */}
          <div className="my-4 flex gap-2 flex-wrap">
            {tags.length > 0 ? (
              tags.map((tag, index) => (
                <div
                  key={index}
                  className="badge badge-outline bg-gray-200 text-gray-700 text-sm py-1 px-3 rounded-full"
                >
                  {tag}
                </div>
              ))
            ) : (
              <span className="text-gray-500">No tags available</span>
            )}
          </div>

          {/* Publisher Info */}
          <p className="text-lg text-gray-600">
            Published by: <strong>{article.publisher}</strong>
          </p>

          {/* Description */}
          <div className="my-6">
            <p className="text-base text-gray-800">{article.Description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
