import React from 'react';
import PropTypes from 'prop-types';
import {
  ChatBubbleLeftRightIcon,
  UsersIcon,
  HeartIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const LatestNews = ({ newsData = {} }) => {
  const { trendingNews = [], topStories = null, dailyHeadlines = null } = newsData;

  return (
    <section className="bg-gray-50 py-16 px-4 lg:px-8">
      {/* Trending News Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <ChatBubbleLeftRightIcon 
            className="w-6 h-6 text-blue-600" 
            aria-label="Chat icon for trending news" 
          />
          <h3 className="text-xl font-semibold">Trending News</h3>
        </div>
        {trendingNews.length > 0 ? (
          <ul className="space-y-2">
            {trendingNews.map((news, index) => (
              <li key={index} className="text-gray-600">
                {news.headline}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No trending news at the moment.</p>
        )}
      </div>

      {/* Top Stories Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <UsersIcon 
            className="w-6 h-6 text-green-600" 
            aria-label="Users icon for top stories" 
          />
          <h3 className="text-xl font-semibold">Top Stories</h3>
        </div>
        {topStories ? (
          <div className="text-gray-600">
            <p>
              <span className="font-semibold">{topStories.title}</span> 
              is making waves. The story has gained significant traction across major platforms.
            </p>
            <p className="text-gray-500 text-sm">{topStories.summary}</p>
          </div>
        ) : (
          <p className="text-gray-500">No top stories available.</p>
        )}
      </div>

      {/* Daily Headlines Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <ChartBarIcon 
            className="w-6 h-6 text-purple-600" 
            aria-label="Chart icon for daily headlines" 
          />
          <h3 className="text-xl font-semibold">Daily Headlines</h3>
        </div>
        {dailyHeadlines?.articles?.length > 0 ? (
          <div className="text-gray-600">
            <p className="mb-2">{dailyHeadlines.headline}</p>
            <ul className="space-y-1">
              {dailyHeadlines.articles.map((article, index) => (
                <li key={index} className="flex items-center gap-2">
                  <HeartIcon className="w-4 h-4 text-red-500" />
                  {article.title}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-500">No daily headlines available at the moment.</p>
        )}
      </div>
    </section>
  );
};

// Prop Validation
LatestNews.propTypes = {
  newsData: PropTypes.shape({
    trendingNews: PropTypes.arrayOf(
      PropTypes.shape({
        headline: PropTypes.string.isRequired
      })
    ),
    topStories: PropTypes.shape({
      title: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired
    }),
    dailyHeadlines: PropTypes.shape({
      headline: PropTypes.string.isRequired,
      articles: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired
      })).isRequired
    })
  })
};

export default LatestNews;
