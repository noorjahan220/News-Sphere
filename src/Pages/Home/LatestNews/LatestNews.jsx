import React from 'react';
import PropTypes from 'prop-types';
import { ChatBubbleLeftRightIcon, UsersIcon, HeartIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const LatestNews = ({ newsData = {} }) => {
  const { trendingNews = [], topStories = null, dailyHeadlines = null } = newsData;

  return (
    <section className="bg-zinc-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center mb-4">
            <ChartBarIcon className="text-amber-500 mr-3 text-xl" />
            <h2 className="text-3xl font-bold text-white tracking-tight">Latest News</h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-zinc-800 via-amber-500 to-zinc-800"></div>
          <p className="mt-4 text-gray-400 text-center max-w-2xl">
            Stay updated with the most recent and important news stories
          </p>
        </div>

        {/* Trending News Section */}
        <div className="bg-zinc-800 rounded-xl p-6 mb-8 border border-zinc-700 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <ChatBubbleLeftRightIcon 
              className="w-6 h-6 text-amber-500" 
              aria-label="Trending news icon" 
            />
            <h3 className="text-xl font-semibold text-white">Trending Now</h3>
          </div>
          
          {trendingNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingNews.map((news, index) => (
                <div 
                  key={index} 
                  className="bg-zinc-700 rounded-lg p-6 space-y-4 flex flex-col justify-between border border-zinc-600 hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg"
                >
                  <h4 className="text-lg font-semibold text-white">{news.headline}</h4>
                  <div className="flex items-center justify-between pt-2">
                    <button 
                      className="text-amber-500 hover:text-amber-400 font-medium transition-colors duration-300"
                      onClick={() => window.location.href = news.url || '#'}
                    >
                      Read More
                    </button>
                    <div className="flex items-center space-x-1">
                      <HeartIcon className="w-5 h-5 text-red-500" />
                      <span className="text-gray-400 text-sm">{news.likes || 0}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-zinc-700/50 rounded-lg p-8 text-center border border-zinc-600">
              <p className="text-gray-400">No trending news at the moment. Check back later!</p>
            </div>
          )}
        </div>

        {/* Top Stories Section */}
        <div className="bg-zinc-800 rounded-xl p-6 mb-8 border border-zinc-700 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <UsersIcon 
              className="w-6 h-6 text-amber-500" 
              aria-label="Top stories icon" 
            />
            <h3 className="text-xl font-semibold text-white">Top Stories</h3>
          </div>
          
          {topStories ? (
            <div className="space-y-6">
              <div className="bg-zinc-700 rounded-lg p-6 border border-zinc-600">
                <h4 className="text-xl font-bold text-white mb-3">{topStories.title}</h4>
                <p className="text-gray-400 mb-4">{topStories.summary}</p>
                <button 
                  className="text-amber-500 hover:text-amber-400 font-medium transition-colors duration-300"
                  onClick={() => window.location.href = topStories.url || '#'}
                >
                  Continue Reading
                </button>
              </div>
              
              {topStories.additionalStories?.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {topStories.additionalStories.map((story, index) => (
                    <div key={index} className="bg-zinc-700 rounded-lg p-4 border border-zinc-600 hover:border-amber-500/50 transition-all duration-300">
                      <h5 className="font-semibold text-white mb-2">{story.headline}</h5>
                      <p className="text-gray-400 text-sm">{story.summary}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-zinc-700/50 rounded-lg p-8 text-center border border-zinc-600">
              <p className="text-gray-400">No top stories available right now.</p>
            </div>
          )}
        </div>

        {/* Daily Headlines Section */}
        <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <ChartBarIcon 
              className="w-6 h-6 text-amber-500" 
              aria-label="Daily headlines icon" 
            />
            <h3 className="text-xl font-semibold text-white">Daily Headlines</h3>
          </div>
          
          {dailyHeadlines?.articles?.length > 0 ? (
            <Swiper
              modules={[Autoplay, Pagination]}
              loop={true}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="pb-10" // Add padding for pagination dots
            >
              {dailyHeadlines.articles.map((article, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-zinc-700 rounded-lg p-6 h-full border border-zinc-600 hover:border-amber-500/50 transition-all duration-300">
                    <h4 className="font-semibold text-white mb-3">{article.title}</h4>
                    {article.description && (
                      <p className="text-gray-400 text-sm mb-4">{article.description.substring(0, 100)}...</p>
                    )}
                    <button 
                      className="text-amber-500 hover:text-amber-400 font-medium transition-colors duration-300"
                      onClick={() => window.location.href = article.url || '#'}
                    >
                      Read Full Story
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="bg-zinc-700/50 rounded-lg p-8 text-center border border-zinc-600">
              <p className="text-gray-400">Daily headlines will be updated soon.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

LatestNews.propTypes = {
  newsData: PropTypes.shape({
    trendingNews: PropTypes.arrayOf(
      PropTypes.shape({
        headline: PropTypes.string.isRequired,
        url: PropTypes.string,
        likes: PropTypes.number
      })
    ),
    topStories: PropTypes.shape({
      title: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
      url: PropTypes.string,
      additionalStories: PropTypes.arrayOf(
        PropTypes.shape({
          headline: PropTypes.string.isRequired,
          summary: PropTypes.string.isRequired
        })
      )
    }),
    dailyHeadlines: PropTypes.shape({
      articles: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          description: PropTypes.string,
          url: PropTypes.string
        })
      ).isRequired
    })
  })
};

export default LatestNews;