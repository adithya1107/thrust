import React, { useState, useEffect } from 'react';

const Gallery = ({ onNavigateToGallery }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  
  // Replace these filenames with your actual image filenames from the public folder
  const images = [
    { id: 0, src: "https://pub-5e90a2f5e8c44905a47c1b15177024fe.r2.dev/public/gallery/i1.jpg", title: "", description: "" },
    { id: 1, src: "https://pub-5e90a2f5e8c44905a47c1b15177024fe.r2.dev/public/gallery/i2.webp", title: "", description: "" },
    { id: 2, src: "https://pub-5e90a2f5e8c44905a47c1b15177024fe.r2.dev/public/gallery/i3.webp", title: "", description: "" },
    { id: 3, src: "https://pub-5e90a2f5e8c44905a47c1b15177024fe.r2.dev/public/gallery/i4.webp", title: "", description: "" },
    { id: 4, src: "https://pub-5e90a2f5e8c44905a47c1b15177024fe.r2.dev/public/gallery/i5.webp", title: "", description: "" },
    { id: 5, src: "https://pub-5e90a2f5e8c44905a47c1b15177024fe.r2.dev/public/gallery/i6.webp", title: "", description: "" },
    { id: 6, src: "https://pub-5e90a2f5e8c44905a47c1b15177024fe.r2.dev/public/gallery/i7.webp", title: "", description: "" },
    { id: 7, src: "https://pub-5e90a2f5e8c44905a47c1b15177024fe.r2.dev/public/gallery/i8.webp", title: "", description: "" }
  ];

  // Font loading
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  // Auto-advance slideshow every 5 seconds - only when timer is active
  useEffect(() => {
    if (!isTimerActive) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length, isTimerActive]);

  // Function to handle image selection
  const handleImageClick = (index) => {
    setCurrentImage(index);
    setIsTimerActive(true);
  };

  return (
    <section id="gallery" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          Photo & Video <span className="text-blue-600">Gallery</span>
        </h2>
        <p className="text-center text-gray-400 mb-16 text-lg" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em' }}>
          Explore our journey through launches, tests, and team moments
        </p>

        <div className="max-w-6xl mx-auto">
          {/* Main Image Display - Larger with proper aspect ratio */}
          <div className="bg-black rounded-xl overflow-hidden mb-6 border border-white/10 relative" style={{ minHeight: '500px', maxHeight: '70vh' }}>
            <div className="w-full h-full flex items-center justify-center p-4">
              <img 
                src={images[currentImage].src}
                alt={images[currentImage].title} 
                className="max-w-full max-h-[65vh] object-contain" 
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 pointer-events-none">
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

          {/* View Full Gallery Button */}
          <div className="flex justify-center mt-10">
            <button 
              onClick={() => {
                if (onNavigateToGallery) {
                  onNavigateToGallery();
                } else {
                  window.location.href = '/gallery';
                }
              }}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-600/50"
              style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, letterSpacing: '0.05em' }}
            >
              View Full Gallery →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Gallery;