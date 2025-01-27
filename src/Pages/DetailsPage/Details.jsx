import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Details = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const { data: article = [], isLoading, refetch } = useQuery({
    queryKey: ['article', id],
    queryFn: async () => {
      const { data } = await axiosPublic(`/newsId/${id}`);
      return data;
    }
  });

  if (isLoading) {
    return <span className="loading loading-bars loading-lg"></span>;
  }

  if (!article) {
    return <p className="text-center text-lg text-gray-500">Loading or no article found...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className={`card shadow-lg ${article.isPremium ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' : 'bg-white'} transition-all duration-300 ease-in-out`}>
        <figure>
          <img src={article.image} alt={article.title} className="w-full h-96 object-cover rounded-t-md" />
        </figure>
        <div className="card-body p-8">
          <h2 className="card-title text-3xl font-semibold text-gray-800">{article.title}</h2>
          <div className="my-4 flex gap-2 flex-wrap">
            {article.tags.map((tag, index) => (
              <div key={index} className="badge badge-outline bg-gray-200 text-gray-700">{tag}</div>
            ))}
          </div>
          <p className="text-lg text-gray-600">Published by: <strong>{article.publisher}</strong></p>
          <div className="my-6">
            <p className="text-base text-gray-800">{article.Description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
