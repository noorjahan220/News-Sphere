import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NewspaperIcon, FireIcon, BoltIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const LatestNews = ({ newsData = {} }) => {
  const { trendingNews = [], topStories = null, dailyHeadlines = null } = newsData;
  const [activeTab, setActiveTab] = useState('trending');

  // Function to handle tab switching
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className="bg-zinc-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with animated accent */}
        <div className="relative mb-10">
          <div className="absolute inset-0 bg-amber-500/10 blur-3xl rounded-full transform -translate-y-1/2"></div>
          <div className="relative flex flex-col items-center">
            <h2 className="text-4xl font-bold text-white mb-2">Newsroom</h2>
            <div className="w-16 h-1 bg-amber-500 rounded-full mb-4"></div>
            <p className="text-gray-400 text-center max-w-xl">
              Stay informed with our curated selection of important stories
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-zinc-800 p-1 rounded-xl flex gap-1 border border-zinc-700 shadow-lg">
            <button
              onClick={() => handleTabChange('trending')}
              className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === 'trending' 
                  ? 'bg-zinc-700 text-amber-500' 
                  : 'text-gray-400 hover:text-amber-500'
              }`}
            >
              <FireIcon className="w-5 h-5 mr-2" />
              <span className="font-medium">Trending</span>
            </button>
            <button
              onClick={() => handleTabChange('top')}
              className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === 'top' 
                  ? 'bg-zinc-700 text-amber-500' 
                  : 'text-gray-400 hover:text-amber-500'
              }`}
            >
              <BoltIcon className="w-5 h-5 mr-2" />
              <span className="font-medium">Top Stories</span>
            </button>
            <button
              onClick={() => handleTabChange('daily')}
              className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === 'daily' 
                  ? 'bg-zinc-700 text-amber-500' 
                  : 'text-gray-400 hover:text-amber-500'
              }`}
            >
              <NewspaperIcon className="w-5 h-5 mr-2" />
              <span className="font-medium">Daily Headlines</span>
            </button>
          </div>
        </div>

        {/* Content Container with Gradient Border */}
        <div className="relative p-1 rounded-2xl bg-gradient-to-br from-zinc-700 via-amber-500/30 to-zinc-700">
          <div className="bg-zinc-800 rounded-xl p-6 shadow-xl">
            {/* Trending News Tab */}
            {activeTab === 'trending' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
                    <FireIcon className="w-6 h-6 text-amber-500" />
                    Trending Now
                  </h3>
                  <span className="text-xs text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">
                    Updated {new Date().toLocaleDateString()}
                  </span>
                </div>
                
                {trendingNews.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {trendingNews.map((news, index) => (
                      <div 
                        key={index} 
                        className="relative group overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-70 z-10"></div>
                        <div className="bg-zinc-700 rounded-xl h-64 overflow-hidden border border-zinc-600 group-hover:border-amber-500 transition-all duration-300">
                          <div className="absolute inset-0 bg-[url('/api/placeholder/400/320')] bg-cover bg-center opacity-30"></div>
                          <div className="relative h-full z-20 p-6 flex flex-col justify-end">
                            <div className="mb-2 flex items-center">
                              <span className="bg-amber-500/20 text-amber-500 text-xs px-2 py-1 rounded">
                                {index % 2 === 0 ? 'Breaking' : 'Hot Topic'}
                              </span>
                            </div>
                            <h4 className="text-lg font-bold text-white mb-2 group-hover:text-amber-500 transition-colors">
                              {news.headline}
                            </h4>
                            <div className="flex items-center justify-between pt-2">
                              <button 
                                className="text-amber-500 hover:text-amber-400 font-medium flex items-center text-sm"
                              >
                                Read More
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                              </button>
                              <div className="flex items-center space-x-1">
                                <BookmarkIcon className="w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
                                <span className="text-gray-400 text-xs">{news.likes || 0}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-zinc-700/30 rounded-lg p-8 text-center border border-zinc-600">
                    <p className="text-gray-400">No trending news at the moment. Check back later!</p>
                  </div>
                )}
              </div>
            )}

            {/* Top Stories Tab */}
            {activeTab === 'top' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
                    <BoltIcon className="w-6 h-6 text-amber-500" />
                    Top Stories
                  </h3>
                  <span className="text-xs text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">
                    Editor's Picks
                  </span>
                </div>
                
                {topStories ? (
                  <>
                    <div className="relative bg-zinc-700 rounded-xl overflow-hidden border border-zinc-600 hover:border-amber-500/50 transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
                      <div className="relative z-10 p-8 md:w-2/3">
                        <span className="inline-block bg-amber-500 text-zinc-900 px-3 py-1 rounded-full text-sm font-bold mb-4">
                          Featured
                        </span>
                        <h4 className="text-2xl font-bold text-white mb-3">{topStories.title}</h4>
                        <p className="text-gray-300 mb-4">{topStories.summary}</p>
                        <button 
                          className="bg-zinc-800 hover:bg-amber-500 text-amber-500 hover:text-zinc-900 px-4 py-2 rounded-lg font-medium transition-colors duration-300 flex items-center gap-2"
                        >
                          Read Full Story
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {topStories.additionalStories?.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        {topStories.additionalStories.map((story, index) => (
                          <div key={index} className="group">
                            <div className="bg-zinc-700 rounded-lg p-5 border border-zinc-600 group-hover:border-amber-500/50 transition-all duration-300 flex gap-4">
                              <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 flex-shrink-0">
                                {index + 1}
                              </div>
                              <div>
                                <h5 className="font-semibold text-white mb-2 group-hover:text-amber-500 transition-colors">{story.headline}</h5>
                                <p className="text-gray-400 text-sm">{story.summary}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="bg-zinc-700/30 rounded-lg p-8 text-center border border-zinc-600">
                    <p className="text-gray-400">No top stories available right now.</p>
                  </div>
                )}
              </div>
            )}

            {/* Daily Headlines Tab */}
            {activeTab === 'daily' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
                    <NewspaperIcon className="w-6 h-6 text-amber-500" />
                    Daily Headlines
                  </h3>
                  <div className="text-xs text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">
                    Daily Digest
                  </div>
                </div>
                
                {dailyHeadlines?.articles?.length > 0 ? (
                  <div className="relative">
                    <Swiper
                      modules={[Autoplay, Pagination, EffectFade]}
                      effect="fade"
                      loop={true}
                      autoplay={{ delay: 5000, disableOnInteraction: false }}
                      pagination={{ 
                        clickable: true,
                        bulletClass: 'swiper-pagination-bullet !bg-amber-500/50 !w-2 !h-2',
                        bulletActiveClass: 'swiper-pagination-bullet-active !bg-amber-500'
                      }}
                      className="rounded-xl overflow-hidden"
                    >
                      {dailyHeadlines.articles.map((article, index) => (
                        <SwiperSlide key={index}>
                          <div className="relative bg-zinc-700 h-96 border border-zinc-600">
                            <div className="absolute inset-0 bg-[url('/api/placeholder/400/320')] bg-cover bg-center opacity-20"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                            <div className="relative z-10 h-full flex flex-col justify-end p-8">
                              <span className="text-xs text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full mb-4 self-start">
                                {['World', 'Business', 'Tech', 'Science', 'Health'][index % 5]}
                              </span>
                              <h4 className="text-2xl font-bold text-white mb-3">{article.title}</h4>
                              {article.description && (
                                <p className="text-gray-300 mb-4">{article.description.substring(0, 150)}...</p>
                              )}
                              <div className="flex justify-between items-center mt-4">
                                <button 
                                  className="bg-amber-500 hover:bg-amber-600 text-zinc-900 px-4 py-2 rounded-lg font-medium transition-colors duration-300 flex items-center gap-2"
                                >
                                  Read Full Story
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                  </svg>
                                </button>
                                <span className="text-gray-400 text-sm">
                                  {new Date().toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      {dailyHeadlines.articles.slice(0, 3).map((article, index) => (
                        <div key={`thumbnail-${index}`} className="bg-zinc-700/50 rounded-lg p-4 border border-zinc-600 hover:border-amber-500/50 transition-all duration-300">
                          <h5 className="font-semibold text-white text-sm mb-2 line-clamp-2">{article.title}</h5>
                          <div className="flex justify-between text-xs">
                            <span className="text-amber-500">
                              {['5m', '20m', '1h', '3h', '5h'][index % 5]} ago
                            </span>
                            <span className="text-gray-400">
                              {['CNN', 'BBC', 'Reuters', 'AP', 'NYT'][index % 5]}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-zinc-700/30 rounded-lg p-8 text-center border border-zinc-600">
                    <p className="text-gray-400">Daily headlines will be updated soon.</p>
                  </div>
                )}
              </div>
            )}
          </div>
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