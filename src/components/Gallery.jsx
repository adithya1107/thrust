import React, { useState, useEffect } from 'react';

const Gallery = () => {
  const [currentImage, setCurrentImage] = useState(0);
  
  // Replace these filenames with your actual image filenames from the public folder
  const images = [
    { id: 0, src: "gallery/i1.png", title: "Launch Day Success", description: "Our team's first successful rocket launch at the regional competition in 2024" },
    { id: 1, src: "gallery/i2.png", title: "Pre-Flight Preparation", description: "Final checks and calibration before the big launch at nationals" },
    { id: 2, src: "gallery/i3.png", title: "Team Assembly", description: "The entire crew working together on rocket assembly in our lab" },
    { id: 3, src: "gallery/i4.png", title: "Engine Test Fire", description: "Static fire test of our custom-built rocket engine" },
    { id: 4, src: "gallery/i5.png", title: "Recovery System Deploy", description: "Successful parachute deployment during a test flight" },
    { id: 5, src: "gallery/i1.png", title: "Award Ceremony", description: "Receiving first place trophy at the State Rocketry Championship" },
    { id: 6, src: "gallery/i2.png", title: "Wind Tunnel Testing", description: "Aerodynamic testing of our rocket design in the university wind tunnel" },
    { id: 7, src: "gallery/i3.png", title: "Mission Control", description: "Team monitoring telemetry data during a live launch sequence" }
  ];

  // Font loading
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  // Auto-advance slideshow every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section id="gallery" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          Photo & Video <span className="text-blue-600">Gallery</span>
        </h2>
        <p className="text-center text-gray-400 mb-16 text-lg" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em' }}>
          Explore our journey through launches, tests, and team moments
        </p>

        <div className="max-w-4xl mx-auto">
          <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden mb-6 border border-white/10 hover:border-blue-600/50 transition-all group relative">
            <img 
              src={images[currentImage].src}
              alt={images[currentImage].title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4">
                <h4 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  {images[currentImage].title}
                </h4>
                <p className="text-sm text-gray-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  {images[currentImage].description}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {images.map((img, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentImage(i)} 
                className={`aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden border-2 transition-all hover:scale-105 group relative ${
                  currentImage === i 
                    ? 'border-blue-600 shadow-lg shadow-blue-600/50' 
                    : 'border-transparent hover:border-blue-600/30'
                }`}
              >
                <img 
                  src={img.src}
                  alt={img.title} 
                  className="w-full h-full object-cover transition-all" 
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-xs font-bold text-white text-center px-1" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    View
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Gallery;