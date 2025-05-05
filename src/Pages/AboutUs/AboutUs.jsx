import React from 'react';

const AboutUs = () => {
  return (
    <div className="relative py-16 bg-gradient-to-b from-zinc-900 to-zinc-800 text-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-300">
              About NewsSphere
            </span>
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto">
            Your window to the world's stories, powered by integrity and innovation
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-20 text-center">
          <div className="space-y-8 max-w-4xl mx-auto">
            <p className="text-lg leading-8 text-gray-300">
              At <span className="font-semibold text-amber-400">NewsSphere</span>, we're redefining digital journalism through cutting-edge technology and uncompromising editorial standards.
            </p>
            <div className="mt-10 bg-zinc-700 p-8 rounded-2xl border border-zinc-600">
              <h3 className="text-2xl font-bold text-white mb-4">Our 360° Coverage</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Politics', 'Technology', 'Culture', 'Business'].map((category) => (
                  <div key={category} className="p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors border border-zinc-600">
                    <span className="text-amber-400 font-medium">{category}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="py-16">
          <h3 className="text-3xl font-bold text-center mb-12 text-white">Core Principles</h3>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: '🔍',
                title: 'Relentless Accuracy',
                description: 'Every fact triple-checked, every source rigorously verified',
                color: 'bg-zinc-700'
              },
              {
                icon: '⚡',
                title: 'Real-Time Updates',
                description: '24/7 news monitoring with AI-powered alerts',
                color: 'bg-zinc-700'
              },
              {
                icon: '🌐',
                title: 'Borderless Reporting',
                description: '200+ countries covered in 15 languages',
                color: 'bg-zinc-700'
              }
            ].map((value, idx) => (
              <div key={idx} className={`p-8 rounded-xl ${value.color} hover:transform hover:scale-105 transition-all border border-zinc-600`}>
                <div className="text-4xl mb-4">{value.icon}</div>
                <h4 className="text-xl font-bold mb-2 text-white">{value.title}</h4>
                <p className="text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-12 text-white">Global Voices</h3>
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
              <div key={idx} className="group relative bg-zinc-800 rounded-xl hover:shadow-lg transition-all border border-zinc-700">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-50 rounded-xl transition-opacity"></div>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover rounded-t-xl"
                />
                <div className="p-6">
                  <h4 className="text-xl font-bold text-white">{member.name}</h4>
                  <p className="text-amber-400 text-sm font-medium">{member.role}</p>
                  <p className="mt-2 text-gray-300 text-sm">{member.expertise}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <p className="text-xl text-gray-300">
            Join 2M+ informed readers worldwide
          </p>
          <button className="mt-6 bg-amber-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors">
            Explore Our Coverage
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;