import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from '../Banner/Banner';
import AllPublishers from '../AllPublishers/AllPublishers';
import Statistics from '../Statistics/Statistics';
import Plans from '../Plans/Plans';
import LatestNews from '../LatestNews/LatestNews';
import NewsLetter from '../NewsLetter/NewsLetter';
import RecentArticles from '../RecentArticles/RecentArticles';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Mock data for communityData
  const newsData = {
    trendingNews: [
      { headline: "New Government Policy Affects Small Businesses" },
      { headline: "Groundbreaking Discovery in Space Exploration" },
      { headline: "Stock Market Hits Record High" },
      { headline: "Global Water Crisis: Solutions in Sight?" },
      { headline: "Tech Industry Faces Major Layoffs Amid Economic Uncertainty" },
      { headline: "Massive Earthquake Strikes Off the Coast of Japan" }
    ],
    topStories: {
      title: "Climate Change: How It's Impacting Our Future",
      summary: "A comprehensive look at the latest research and global reactions to the climate crisis. How nations are responding, and the long-term impact on the planet's ecosystems.",
      additionalStories: [
        {
          headline: "Wildfires Rage Across Australia: Thousands Evacuated",
          summary: "Severe bushfires have caused unprecedented damage in Australia, forcing thousands of people to evacuate their homes."
        },
        {
          headline: "Carbon Emissions Continue to Rise Despite International Agreements",
          summary: "Despite global efforts to reduce carbon emissions, reports show an alarming increase in global carbon output."
        },
        {
          headline: "Sustainable Energy: A Step Towards Solving Climate Crisis",
          summary: "Exploring how solar, wind, and other renewable energies are becoming crucial in mitigating climate change."
        }
      ]
    },
    dailyHeadlines: {
      headline: "Global Economic Forecast for 2025",
      articles: [
       
        { title: "How Unemployment Rates Are Shaping Recovery", summary: "A deep dive into the current state of global unemployment and its influence on the economic recovery process." },
        { title: "The Role of Government Policy in Economic Growth", summary: "Analyzing how government interventions are either helping or hindering economic growth across various nations." },
        { title: "Digital Currency: The Future of Finance?", summary: "Exploring the rise of digital currencies and their potential to revolutionize the global economy." },
        { title: "Supply Chain Disruptions: What Lies Ahead", summary: "Global supply chain disruptions continue to affect industries, causing delays and increased costs for businesses and consumers." },
       
      ]
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubscription = () => {
    navigate('/subscription');
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className=" mx-auto ">
        <Banner />
        <RecentArticles />
        <AllPublishers />
        <Statistics />
        <Plans />
        
        {newsData && <LatestNews newsData={newsData} />}
        <NewsLetter />
      </div>

      {/* Subscription Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl max-w-md w-full transform transition-all duration-300 scale-95 hover:scale-100">
            <button 
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-teal-500 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full mb-4">
                <span className="text-3xl text-white">🎁</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Premium Access Await!
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Unlock exclusive content, ad-free experience, and premium features with our subscription plan.
              </p>
              <button
                onClick={handleSubscription}
                className="w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold 
                         hover:from-teal-500 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Premium Now
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Limited time offer • 30-day free trial
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
