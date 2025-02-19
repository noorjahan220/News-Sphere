import React from 'react';
import PropTypes from 'prop-types';
import { ChatBubbleLeftRightIcon, UsersIcon, HeartIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination'; // Optional, if using pagination
import 'swiper/css/navigation'; // Optional, if using navigation

const LatestNews = ({ newsData = {} }) => {
  const { trendingNews = [], topStories = null, dailyHeadlines = null } = newsData;

  return (
    <section className="py-16 px-4 lg:px-8">
      {/* Trending News Section */}
      <div className=" rounded-xl  p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <ChatBubbleLeftRightIcon 
            className="w-6 h-6 text-blue-600" 
            aria-label="Chat icon for trending news" 
          />
          <h3 className="text-xl font-semibold">Trending News</h3>
        </div>
        {trendingNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingNews.map((news, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 space-y-4 flex flex-col justify-between">
                <h4 className="text-lg font-semibold text-gray-800">{news.headline}</h4>
                <div className="flex items-center justify-between">
                  <button className="text-teal-500 hover:text-teal-600">Read More</button>
                  <HeartIcon className="w-5 h-5 text-red-500" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No trending news at the moment.</p>
        )}
      </div>

      {/* Top Stories Section */}
      <div className=" rounded-xl  p-6 mb-8">
  <div className="flex items-center gap-3 mb-4">
    <UsersIcon 
      className="w-6 h-6 text-green-600" 
      aria-label="Users icon for top stories" 
    />
    <h3 className="text-xl font-semibold">Top Stories</h3>
  </div>
  {topStories && topStories.title ? (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-4 flex flex-col justify-between">
      <p className="font-semibold text-gray-800">{topStories.title}</p>
      <p className="text-gray-600">{topStories.summary}</p>
      {topStories.additionalStories && topStories.additionalStories.length > 0 && (
        <div className="space-y-4 mt-4">
          {topStories.additionalStories.map((story, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-4">
              <p className="font-semibold text-gray-800">{story.headline}</p>
              <p className="text-gray-600">{story.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  ) : (
    <p className="text-gray-500">No top stories available.</p>
  )}
</div>

      {/* Daily Headlines Section (Slider) */}
      <div className=" rounded-xl  p-6">
        <div className="flex items-center gap-3 mb-4">
          <ChartBarIcon 
            className="w-6 h-6 text-purple-600" 
            aria-label="Chart icon for daily headlines" 
          />
          <h3 className="text-xl font-semibold">Daily Headlines</h3>
        </div>

        {dailyHeadlines?.articles?.length > 0 ? (
          <Swiper
            loop={true}
            autoplay={{ delay: 3000 }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="mySwiper"
          >
            {dailyHeadlines.articles.map((article, index) => (
              <SwiperSlide key={index} className="bg-white rounded-lg shadow-lg p-6 space-y-4">
                <p className="font-semibold text-gray-800">{article.title}</p>
                <div className="flex items-center justify-between">
                  <button className="text-teal-500 hover:text-teal-600">Read More</button>
                  
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
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
    topStories: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        summary: PropTypes.string.isRequired
      })
    ),
    dailyHeadlines: PropTypes.shape({
      headline: PropTypes.string.isRequired,
      articles: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired
      })).isRequired
    })
  })
};

export default LatestNews;
