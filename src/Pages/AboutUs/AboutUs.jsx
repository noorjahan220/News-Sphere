import React from 'react';
import { FiCheck, FiGlobe, FiClock, FiSearch } from 'react-icons/fi';

const AboutUs = () => {
  return (
    <div className="relative bg-gradient-to-b from-zinc-900 to-zinc-800 text-gray-200 min-h-screen">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMjEyMTIxIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwSDQuOUwwIDQuOVoiIGZpbGw9IiMyYTJhMmEiPjwvcGF0aD4KPC9zdmc+')] opacity-10"></div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-block p-1 px-3 mb-6 rounded-full bg-gradient-to-r from-amber-700 to-amber-500 text-xs font-semibold uppercase tracking-wider text-white">
            Our Story
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-300">
              About NewsSphere
            </span>
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-amber-300 mx-auto mb-8 rounded-full"></div>
          <p className="mt-6 max-w-2xl text-xl text-gray-300 mx-auto leading-relaxed">
            Your window to the world's stories, powered by integrity and innovation
          </p>
        </div>

        {/* Mission Section with Card */}
        <div className="mb-24">
          <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-2xl shadow-xl border border-zinc-700 p-10 max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500 rounded-full mb-6">
              <span className="text-xl">📰</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-lg leading-relaxed text-gray-300 mb-8">
              At <span className="font-semibold text-amber-400">NewsSphere</span>, we're redefining digital journalism through cutting-edge technology and uncompromising editorial standards. We believe in delivering news that matters, when it matters, with context that empowers.
            </p>
            
            <div className="mt-10 bg-zinc-800 p-8 rounded-xl border border-zinc-700">
              <h3 className="text-2xl font-bold text-white mb-6">Our 360° Coverage</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Politics', icon: '🏛️' },
                  { name: 'Technology', icon: '💻' },
                  { name: 'Culture', icon: '🎭' },
                  { name: 'Business', icon: '📈' },
                  { name: 'Science', icon: '🔬' },
                  { name: 'Health', icon: '🏥' },
                  { name: 'Sports', icon: '🏆' },
                  { name: 'Environment', icon: '🌍' }
                ].map((category) => (
                  <div key={category.name} className="p-4 bg-zinc-900 rounded-lg hover:bg-zinc-700 transition-all duration-300 border border-zinc-700 hover:border-amber-500 group cursor-pointer">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <span className="text-2xl">{category.icon}</span>
                      <span className="text-sm font-medium text-gray-300 group-hover:text-amber-400 transition-colors">
                        {category.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Our Core Principles</h2>
            <div className="h-1 w-20 bg-amber-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              The foundations that guide our journalism and shape our organization
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiSearch className="w-8 h-8" />,
                title: 'Relentless Accuracy',
                description: 'Every fact triple-checked, every source rigorously verified. We never sacrifice truth for speed.',
                color: 'from-amber-600 to-amber-700'
              },
              {
                icon: <FiClock className="w-8 h-8" />,
                title: 'Real-Time Updates',
                description: "24/7 news monitoring with AI-powered alerts ensuring you're always informed with the latest developments",
                color: 'from-amber-500 to-amber-600'
              },
              {
                icon: <FiGlobe className="w-8 h-8" />,
                title: 'Borderless Reporting',
                description: 'Our network spans 200+ countries with coverage in 15 languages, bringing you truly global perspectives.',
                color: 'from-amber-400 to-amber-500'
              }
            ].map((value, idx) => (
              <div key={idx} className="bg-zinc-800 rounded-xl p-8 border border-zinc-700 hover:border-amber-500 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl group">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r ${value.color} text-white mb-6`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-amber-400 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-24 mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Meet Our Global Voices</h2>
            <div className="h-1 w-20 bg-amber-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Expert journalists and editors bringing diverse perspectives from around the world
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Aisha Patel',
                role: 'International Correspondent',
                image: '/api/placeholder/400/400',
                expertise: 'Middle East Affairs',
                quote: 'Understanding cultural context is critical to accurate global reporting.'
              },
              {
                name: 'Carlos Mendez',
                role: 'Tech Editor',
                image: '/api/placeholder/400/400',
                expertise: 'Emerging Technologies',
                quote: 'Technology shapes our future - we must report on it thoughtfully.'
              },
              {
                name: 'Linh Nguyen',
                role: 'Data Journalist',
                image: '/api/placeholder/400/400',
                expertise: 'Statistical Analysis',
                quote: 'Behind every number is a human story waiting to be told.'
              }
            ].map((member, idx) => (
              <div key={idx} className="bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-xl overflow-hidden border border-zinc-700 hover:border-amber-500 transition-all duration-300 group">
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-60"></div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-amber-500 text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-gray-400 text-sm mb-4">
                    <span className="font-semibold">Expertise:</span> {member.expertise}
                  </p>
                  <div className="mt-4 pt-4 border-t border-zinc-700">
                    <p className="text-gray-300 italic text-sm">"{member.quote}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-zinc-900 rounded-2xl border border-zinc-700 p-10 mb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '2M+', label: 'Daily Readers' },
              { value: '150+', label: 'Countries Reached' },
              { value: '24/7', label: 'Coverage' },
              { value: '15', label: 'Languages' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-amber-500 mb-2">{stat.value}</p>
                <p className="text-gray-300 text-sm uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-16 bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-2xl border border-zinc-700 px-6">
          <h3 className="text-3xl font-bold text-white mb-6">Join Our Global Community</h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Stay informed with journalism that matters. Join over 2 million readers worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl">
              Subscribe Now
            </button>
            <button className="bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-600 px-8 py-3 rounded-lg font-medium transition-all duration-300">
              Explore Our Coverage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;