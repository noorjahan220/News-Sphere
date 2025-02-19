import React from 'react';

const AboutUs = () => {
  return (
    <div className="relative py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
              About NewsSphere
            </span>
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            Your window to the world's stories, powered by integrity and innovation
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-20 text-center">
          <div className="space-y-8 max-w-4xl mx-auto">
            <p className="text-lg leading-8 text-gray-600">
              At <span className="font-semibold text-blue-600">NewsSphere</span>, we're redefining digital journalism through cutting-edge technology and uncompromising editorial standards. Our global network of journalists and analysts works tirelessly to bring you stories that matter.
            </p>
            <div className="mt-10 bg-blue-50 p-8 rounded-2xl border border-blue-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our 360° Coverage</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Politics', 'Technology', 'Culture', 'Business'].map((category) => (
                  <div key={category} className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-blue-600 font-medium">{category}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="py-16">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">Core Principles</h3>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: '🔍',
                title: 'Relentless Accuracy',
                description: 'Every fact triple-checked, every source rigorously verified',
                color: 'bg-purple-100'
              },
              {
                icon: '⚡',
                title: 'Real-Time Updates',
                description: '24/7 news monitoring with AI-powered alerts',
                color: 'bg-teal-100'
              },
              {
                icon: '🌐',
                title: 'Borderless Reporting',
                description: '200+ countries covered in 15 languages',
                color: 'bg-orange-100'
              }
            ].map((value, idx) => (
              <div key={idx} className={`p-8 rounded-xl ${value.color} hover:transform hover:scale-105 transition-all`}>
                <div className="text-4xl mb-4">{value.icon}</div>
                <h4 className="text-xl font-bold mb-2 text-gray-900">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">Global Voices</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Aisha Patel',
                role: 'International Correspondent',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=60',
                expertise: 'Middle East Affairs'
              },
              {
                name: 'Carlos Mendez',
                role: 'Tech Editor',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=60',
                expertise: 'Emerging Technologies'
              },
              {
                name: 'Linh Nguyen',
                role: 'Data Journalist',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=60',
                expertise: 'Statistical Analysis'
              }
            ].map((member, idx) => (
              <div key={idx} className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-50 rounded-xl transition-opacity"></div>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover rounded-t-xl"
                />
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900">{member.name}</h4>
                  <p className="text-blue-600 text-sm font-medium">{member.role}</p>
                  <p className="mt-2 text-gray-600 text-sm">{member.expertise}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <p className="text-xl text-gray-600">
            Join 2M+ informed readers worldwide
          </p>
          <button className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Explore Our Coverage
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;