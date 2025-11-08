import React, { useEffect } from 'react';
import { VideoSlider } from './VideoSlider';

const Hero = ({ onNavigateToRocketWiki, onNavigateToJoinTeam }) => {
  // Font loading
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <>
      {/* Video Slider Hero Section */}
      <VideoSlider />
      
      {/* Stats Section - positioned below the slider */}
      <section className="relative z-20 -mt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
  <button 
    onClick={onNavigateToJoinTeam}
    className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-5 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-600/60 group" 
    style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, letterSpacing: '0.05em' }}>
    <span className="relative z-10">Join Our Team</span>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
  </button>
  
  <button 
    onClick={onNavigateToRocketWiki}
    className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-black border-2 border-blue-600/40 hover:border-blue-600 text-white px-8 py-5 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-600/40 group" 
    style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, letterSpacing: '0.05em' }}>
    <span className="relative z-10">Explore Rocket Wiki</span>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-600/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
  </button>
</div>
        </div>
      </section>
    </>
  );
};

export default Hero;