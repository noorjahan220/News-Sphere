import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { 
  FiArrowLeft, 
  FiLoader, 
  FiAlertCircle, 
  FiCalendar, 
  FiEye, 
  FiBookmark, 
  FiLock, 
  FiTag,
  FiUser
} from 'react-icons/fi';

const Details = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const { data: article = {}, isLoading, error } = useQuery({
    queryKey: ['article', id],
    queryFn: async () => {
      const { data } = await axiosPublic(`/newsId/${id}`);
      return data;
    }
  });

  // Format date if available
  const formattedDate = article.createdAt 
    ? new Date(article.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Unknown date';

  // Ensure tags is always an array
  const tags = Array.isArray(article.tags) ? article.tags : [];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900">
        <FiLoader className="animate-spin text-amber-500 text-4xl mb-4" />
        <p className="text-gray-400">Loading article...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-red-400 px-4">
        <FiAlertCircle className="text-5xl mb-4" />
        <h2 className="text-2xl font-bold mb-2">Error Loading Article</h2>
        <p className="text-gray-400 mb-6">{error.message || "Unable to load the article"}</p>
        <Link 
          to="/all-articles" 
          className="inline-flex items-center px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-md border border-zinc-700 text-white"
        >
          <FiArrowLeft className="mr-2" /> Back to Articles
        </Link>
      </div>
    );
  }

  if (!article || !article.title) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-gray-400 px-4">
        <FiAlertCircle className="text-5xl mb-4" />
        <h2 className="text-2xl font-bold mb-2">No Article Found</h2>
        <p className="mb-6">The article you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/all-articles" 
          className="inline-flex items-center px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-md border border-zinc-700 text-white"
        >
          <FiArrowLeft className="mr-2" /> Back to Articles
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <Link 
          to="/all-articles" 
          className="inline-flex items-center text-amber-500 hover:text-amber-400 mb-6 group"
        >
          <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
          Back to all articles
        </Link>

        {/* Article Card */}
        <article className="bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 shadow-xl">
          {/* Premium Badge - if applicable */}
          {article.isPremium && (
            <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-white py-2 px-4 flex items-center justify-center">
              <FiLock className="mr-2" />
              <span className="font-medium">Premium Article</span>
            </div>
          )}

          {/* Hero Image */}
          <div className="relative w-full h-72 sm:h-96 overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
            
            {/* Publisher badge */}
            {article.publisher && (
              <div className="absolute bottom-4 right-4 bg-zinc-900/80 text-amber-400 text-sm font-medium py-1.5 px-3 rounded-md flex items-center">
                <FiUser className="mr-2" />
                {article.publisher}
              </div>
            )}
          </div>

          {/* Article Content */}
          <div className="p-6 sm:p-8">
            {/* Meta information row */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
              {article.createdAt && (
                <div className="flex items-center">
                  <FiCalendar className="mr-1.5 text-amber-500/70" />
                  {formattedDate}
                </div>
              )}
              
              {article.viewCount !== undefined && (
                <div className="flex items-center">
                  <FiEye className="mr-1.5 text-amber-500/70" />
                  {article.viewCount} views
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mb-8">
                <h2 className="flex items-center text-sm font-medium text-gray-400 mb-3">
                  <FiTag className="mr-2 text-amber-500" />
                  Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block px-3 py-1.5 rounded text-sm font-medium bg-zinc-700 text-amber-400 border-l-2 border-amber-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-zinc-700 via-amber-700/30 to-zinc-700 my-8"></div>

            {/* Article body */}
            <div className="prose prose-lg prose-invert max-w-none">
              {article.Description ? (
                <p className="text-gray-300 text-lg leading-relaxed">
                  {article.Description}
                </p>
              ) : (
                <p className="text-gray-400 italic">No content available for this article.</p>
              )}
            </div>

            {/* Bottom actions */}
            <div className="mt-12 pt-6 border-t border-zinc-700 flex justify-between items-center">
              <div className="text-sm text-gray-400">
                Article ID: <span className="font-mono text-amber-500/70">{id}</span>
              </div>
              
              <button className="inline-flex items-center bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-md">
                <FiBookmark className="mr-2" />
                Save
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Details;