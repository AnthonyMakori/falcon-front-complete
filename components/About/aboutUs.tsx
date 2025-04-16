import React from 'react';
import { Play, Users, Film, Award } from 'lucide-react';

const AboutUs = () => {
  const stats = [
    { icon: <Users size={24} />, value: '20K+', label: 'Active Users' },
    { icon: <Film size={24} />, value: '10K+', label: 'Movies & Shows' },
    { icon: <Play size={24} />, value: '50+', label: 'New Titles Weekly' },
    { icon: <Award size={24} />, value: '99%', label: 'User Satisfaction' },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white py-16">
      <div className="container mx-auto px-4">
        {/* Main Content */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Your Ultimate Entertainment Destination
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            We&apos;re passionate about bringing you the best in entertainment, from blockbuster hits to indie gems. 
            Our curated collection ensures there&apos;s something for everyone, whether you&apos;re a devoted binge-watcher 
            or casual viewer.
          </p>
          <div className="bg-gray-800/50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-300">
              To provide a seamless streaming experience that connects people with the stories they love. 
              We believe in the power of great storytelling to inspire, entertain, and bring people together.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-gray-800/30 p-6 rounded-lg text-center hover:bg-gray-800/50 transition-all"
            >
              <div className="flex justify-center mb-3 text-purple-500">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800/30 p-6 rounded-lg hover:bg-gray-800/50 transition-all">
            <h3 className="text-xl font-bold mb-3">Curated Content</h3>
            <p className="text-gray-300">
              Carefully selected movies and shows across all genres, ensuring quality entertainment for every taste.
            </p>
          </div>
          <div className="bg-gray-800/30 p-6 rounded-lg hover:bg-gray-800/50 transition-all">
            <h3 className="text-xl font-bold mb-3">Regular Updates</h3>
            <p className="text-gray-300">
              New content added weekly, keeping our library fresh and exciting with the latest releases.
            </p>
          </div>
          <div className="bg-gray-800/30 p-6 rounded-lg hover:bg-gray-800/50 transition-all">
            <h3 className="text-xl font-bold mb-3">Premium Experience</h3>
            <p className="text-gray-300">
              High-quality streaming with personalized recommendations tailored to your preferences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;