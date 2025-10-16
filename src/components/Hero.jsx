import React, { useEffect } from 'react';
import { VideoSlider } from './VideoSlider';

const Hero = () => {
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: '50+', label: 'Active Members' },
              { value: '30K', label: 'Feet Altitude' },
              { value: '1L', label: 'Thrust Force' },
              { value: '100+', label: 'Test Flights' }
            ].map((stat, i) => (
              <div 
                key={i} 
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 hover:border-blue-600/50 transition-all group"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2 group-hover:text-blue-500 transition-colors" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;